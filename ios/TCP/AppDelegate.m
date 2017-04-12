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

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application
    didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {

#ifdef DEBUG

#endif

  NSURL *jsCodeLocation;

#ifdef DEBUG
  jsCodeLocation = [[RCTBundleURLProvider sharedSettings]
      jsBundleURLForBundleRoot:@"index.ios"
              fallbackResource:nil];
  LoggerSetViewerHost(nil, (CFStringRef) @"192.168.0.108", (UInt32)40000);
  LogMarker(@"thomas---debug");

#else
  jsCodeLocation = [CodePush bundleURL];
  Logger *log = LoggerGetDefaultLogger();
  LoggerStart(log);
  LogMarker(@"thomas--release");
#endif

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

@end
