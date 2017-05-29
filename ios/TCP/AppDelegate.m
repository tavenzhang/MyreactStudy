/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

#import "AppDelegate.h"
#import "Flurry.h"
#import "LoggerClient.h"
#import <CodePush/CodePush.h>
#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>
#import <TCP-Swift.h>
#import <UserNotifications/UserNotifications.h>
@implementation AppDelegate

- (BOOL)application:(UIApplication *)application
didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
  
  NSURL *jsCodeLocation;
  
#ifdef DEBUG
  jsCodeLocation = [[RCTBundleURLProvider sharedSettings]
                    jsBundleURLForBundleRoot:@"index.ios"
                    fallbackResource:nil];
  LoggerSetViewerHost(nil, (CFStringRef) @"192.168.0.110", (UInt32)40000);
  LogMarker(@"thomas---debug");
  
#else
  jsCodeLocation = [CodePush bundleURL];
  Logger *log = LoggerGetDefaultLogger();
  LoggerStart(log);
  LoggerSetViewerHost(nil, (CFStringRef) @"192.168.0.110", (UInt32)40000);
  LogMarker(@"thomas--release");
#endif
  
  [self initFurry:launchOptions];
  [self registAppPush:application];
  RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
                                                      moduleName:@"TCP"
                                               initialProperties:nil
                                                   launchOptions:launchOptions];
  rootView.backgroundColor =
  [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];
  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];
  
  NSDictionary *payload = [launchOptions objectForKey:UIApplicationLaunchOptionsRemoteNotificationKey];
  if (payload) {
    NSLog(@"apns-- payload %@",payload);
  }
  return YES;
}

- (void)initFurry:(NSDictionary *)launchOptions {
  FlurrySessionBuilder *builder =
  [[[[[FlurrySessionBuilder new] withLogLevel:FlurryLogLevelAll]
     withCrashReporting:YES] withSessionContinueSeconds:10]
   withAppVersion:@"0.1.2"];
  [Flurry startSession:@"CN8QMWM9JDX8FKF67FRV" withSessionBuilder:builder];
}

- (void)registAppPush:(UIApplication *)application {
  application.applicationIconBadgeNumber = 0;
  //iOS 10 before
  UIUserNotificationSettings *settings = [UIUserNotificationSettings settingsForTypes:UIUserNotificationTypeAlert | UIUserNotificationTypeBadge | UIUserNotificationTypeSound categories:nil];
  [application registerUserNotificationSettings:settings];
  
  //iOS 10
  UNUserNotificationCenter *center = [UNUserNotificationCenter currentNotificationCenter];
  [center requestAuthorizationWithOptions:(UNAuthorizationOptionBadge | UNAuthorizationOptionSound | UNAuthorizationOptionAlert) completionHandler:^(BOOL granted, NSError * _Nullable error) {
    if (!error) {
      NSLog(@"apns-- request authorization succeeded!");
    }
  }];
  
}

- (void)application:(UIApplication *)application
didRegisterUserNotificationSettings:(UIUserNotificationSettings *)settings {
  NSLog(@"apns-- Registering device for push notifications..."); // iOS 8
  [application registerForRemoteNotifications];
}

- (void)application:(UIApplication *)application
didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)token {
  NSLog(@"apns-- Registration successful, bundle identifier: %@, mode: %@, device "
        @"token: %@",
        [NSBundle.mainBundle bundleIdentifier], [self modeString], token);
}

- (void)application:(UIApplication *)application
didFailToRegisterForRemoteNotificationsWithError:(NSError *)error {
  NSLog(@"apns-- Failed to register: %@", error);
}

- (void)application:(UIApplication *)application
handleActionWithIdentifier:(NSString *)identifier
forRemoteNotification:(NSDictionary *)notification
  completionHandler:(void (^)())completionHandler {
  NSLog(@"apns-- Received push notification: %@, identifier: %@", notification,
        identifier); // iOS 8
  completionHandler();
}

- (NSString *)modeString {
#if DEBUG
  return @"apns-- Development (sandbox)";
#else
  return @"apns--Production";
#endif
}

//在app 正常运行时 收到的推送消息
- (void)application:(UIApplication *)application
didReceiveRemoteNotification:(NSDictionary *)payload {
  NSLog(@"apns-- remote notification: %@", [payload description]);
  NSString *alertStr = nil;
  NSDictionary *apsInfo = [payload objectForKey:@"aps"];
  NSObject *alert = [apsInfo objectForKey:@"alert"];
  if ([alert isKindOfClass:[NSString class]]) {
    alertStr = (NSString *)alert;
  } else if ([alert isKindOfClass:[NSDictionary class]]) {
    NSDictionary *alertDict = (NSDictionary *)alert;
    alertStr = [alertDict objectForKey:@"body"];
  }
  application.applicationIconBadgeNumber =
  [[apsInfo objectForKey:@"badge"] integerValue];
  if ([application applicationState] == UIApplicationStateActive &&
      alertStr != nil) {
    UIAlertView *alertView =
    [[UIAlertView alloc] initWithTitle:@"推送内容"
                               message:alertStr
                              delegate:nil
                     cancelButtonTitle:@"OK"
                     otherButtonTitles:nil];
    [alertView show];
  }
}

@end
