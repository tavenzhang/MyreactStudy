#import "INativeModule.h"
#import "Flurry.h"
#import <CodePush/CodePush.h>
#import <React/RCTBridgeModule.h>
#import <React/RCTConvert.h>
#import <React/RCTLog.h>
#import <TCP-Swift.h>
@implementation INativeModule : NSObject
RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(logClass : (NSString *)name message : (NSString *)msg) {
#ifdef DEBUG
  [MyLog LogMsg:name:msg];
#else
#endif
}

RCT_EXPORT_METHOD(analysisWithObj
                  : (NSString *)name data
                  : (NSDictionary *)paras) {
  NSDictionary *articleParams = [RCTConvert NSDictionary:paras];
  [Flurry logEvent:name withParameters:articleParams];
}

RCT_EXPORT_METHOD(analysis : (NSString *)name) { [Flurry logEvent:name]; }

RCT_EXPORT_METHOD(codePushServer
                  : (NSString *)serverName back
                  : (RCTResponseSenderBlock)callback) {
  if (![serverName isEqual:@""]) {
    [[CodePushConfig current] setServerURL:serverName];
  }
  callback(@[ [NSNull null], @"ok" ]);
}

@end
