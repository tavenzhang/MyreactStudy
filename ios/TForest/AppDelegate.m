
#import "AppDelegate.h"
#import "Flurry.h"
#import "JPUSHService.h"
#import "LoggerClient.h"
#import "RCTJPushActionQueue.h"
#import "RCTSplashScreen.h"
#import <CodePush/CodePush.h>
#import <RCTJPushModule.h>
#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>
#import <TForest-Swift.h>
#import <UserNotifications/UserNotifications.h>
@implementation AppDelegate

static NSString *appKey = @"3a51d532f31e7d7fbf4cb069"; //填写appkey
static NSString *channel = @""; //填写channel  一般为nil
//填写isProdurion  平时测试时为false ，  生产时填写true
static BOOL isProduction = true;

- (BOOL)application:(UIApplication *)application
    didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
  NSURL *jsCodeLocation;

#ifdef DEBUG
  jsCodeLocation = [[RCTBundleURLProvider sharedSettings]
      jsBundleURLForBundleRoot:@"index.ios"
              fallbackResource:nil];
  LoggerSetViewerHost(nil, (CFStringRef) @"192.168.0.110", (UInt32)40000);
  LogMarker(@"thomas---debug");
  isProduction = false;
#else
  jsCodeLocation = [CodePush bundleURL];
  isProduction = true;
#endif
  [self initFurry:launchOptions];
  // [self registAppPush:application
  // didFinishLaunchingWithOptions:launchOptions];
  RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
                                                      moduleName:@"TForest"
                                               initialProperties:nil
                                                   launchOptions:launchOptions];
  rootView.backgroundColor =
      [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];

  [RCTSplashScreen open:rootView withImageNamed:@"splashDemo"];
  //[RCTSplashScreen show:rootView]; // here
  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];
  return YES;
}
- (void)initFurry:(NSDictionary *)launchOptions {
  FlurrySessionBuilder *builder =
      [[[[[FlurrySessionBuilder new] withLogLevel:FlurryLogLevelAll]
          withCrashReporting:YES] withSessionContinueSeconds:10]
          withAppVersion:@"0.1.2"];
  [Flurry startSession:@"CN8QMWM9JDX8FKF67FRV" withSessionBuilder:builder];
}
- (void)registAppPush:(UIApplication *)application
    didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
  application.applicationIconBadgeNumber = 0;
  if ([[UIDevice currentDevice].systemVersion floatValue] >= 10.0) {
    JPUSHRegisterEntity *entity = [[JPUSHRegisterEntity alloc] init];
    entity.types = UNAuthorizationOptionAlert | UNAuthorizationOptionBadge |
                   UNAuthorizationOptionSound;
    [JPUSHService registerForRemoteNotificationConfig:entity delegate:self];
  } else if ([[UIDevice currentDevice].systemVersion floatValue] >= 8.0) {
    //可以添加自定义categories
    [JPUSHService
        registerForRemoteNotificationTypes:(UIUserNotificationTypeBadge |
                                            UIUserNotificationTypeSound |
                                            UIUserNotificationTypeAlert)
                                categories:nil];
  } else {
    // iOS 8以前 categories 必须为nil
    [JPUSHService
        registerForRemoteNotificationTypes:(UIRemoteNotificationTypeBadge |
                                            UIRemoteNotificationTypeSound |
                                            UIRemoteNotificationTypeAlert)
                                categories:nil];
  }
  [JPUSHService setupWithOption:launchOptions
                         appKey:appKey
                        channel:channel
               apsForProduction:isProduction];
}

- (void)application:(UIApplication *)application
    didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken {
  [JPUSHService registerDeviceToken:deviceToken];
}

//在app 正常运行时 收到的推送消息
- (void)application:(UIApplication *)application
    didReceiveRemoteNotification:(NSDictionary *)userInfo {
  // 取得 APNs 标准信息内容
  [[NSNotificationCenter defaultCenter]
      postNotificationName:kJPFNetworkDidReceiveMessageNotification
                    object:userInfo];
}
// iOS 7 Remote Notification
- (void)application:(UIApplication *)application
    didReceiveRemoteNotification:(NSDictionary *)userInfo
          fetchCompletionHandler:
              (void (^)(UIBackgroundFetchResult))completionHandler {
  [[NSNotificationCenter defaultCenter]
      postNotificationName:kJPFNetworkDidReceiveMessageNotification
                    object:userInfo];
}

// iOS 10 Support
- (void)jpushNotificationCenter:(UNUserNotificationCenter *)center
        willPresentNotification:(UNNotification *)notification
          withCompletionHandler:(void (^)(NSInteger))completionHandler {
  // Required
  NSDictionary *userInfo = notification.request.content.userInfo;
  if ([notification.request.trigger
          isKindOfClass:[UNPushNotificationTrigger class]]) {
    [JPUSHService handleRemoteNotification:userInfo];
    [[NSNotificationCenter defaultCenter]
        postNotificationName:kJPFNetworkDidReceiveMessageNotification
                      object:userInfo];
  }
  completionHandler(UNNotificationPresentationOptionAlert);
  // 需要执行这个方法，选择是否提醒用户，有Badge、Sound、Alert三种类型可以选择设置
}
// iOS 10 Support
- (void)jpushNotificationCenter:(UNUserNotificationCenter *)center
    didReceiveNotificationResponse:(UNNotificationResponse *)response
             withCompletionHandler:(void (^)())completionHandler {
  NSDictionary *userInfo = response.notification.request.content.userInfo;
  if ([response.notification.request.trigger
          isKindOfClass:[UNPushNotificationTrigger class]]) {
    [JPUSHService handleRemoteNotification:userInfo];
    [[NSNotificationCenter defaultCenter]
        postNotificationName:kJPFNetworkDidReceiveMessageNotification
                      object:userInfo];
  }
  completionHandler(); // 系统要求执行这个方法
}
- (void)application:(UIApplication *)application
    didFailToRegisterForRemoteNotificationsWithError:(NSError *)error {
  // Optional
  NSLog(@"did Fail To Register For Remote Notifications With Error: %@", error);
}
@end
