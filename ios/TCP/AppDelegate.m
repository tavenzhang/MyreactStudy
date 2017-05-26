/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

#import "AppDelegate.h"
#import "LoggerClient.h"
#import <CodePush/CodePush.h>
#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>
#import <TCP-Swift.h>
#import "Flurry.h"

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
  //  Logger *log = LoggerGetDefaultLogger();
  //  LoggerStart(log);
  //  LoggerSetViewerHost(nil, (CFStringRef) @"192.168.0.110", (UInt32)40000);
  //  LogMarker(@"thomas--release");
#endif
  
  [self initFurry:launchOptions];
  
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
  return YES;
}

-(void)initFurry:(NSDictionary *)launchOptions {
  FlurrySessionBuilder* builder = [[[[[FlurrySessionBuilder new]
                                      withLogLevel:FlurryLogLevelAll]
                                     withCrashReporting:YES]
                                    withSessionContinueSeconds:10]
                                   withAppVersion:@"0.1.2"];
  [Flurry startSession:@"CN8QMWM9JDX8FKF67FRV" withSessionBuilder:builder];
}


@end
