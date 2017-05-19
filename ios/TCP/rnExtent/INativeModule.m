//
//  TLog.m
//  TCP
//
//  Created by thomas on 2017/3/12.
//  Copyright © 2017年 Facebook. All rights reserved.
//
#import <React/RCTBridgeModule.h>
#import <React/RCTLog.h>
#import "INativeModule.h"
#import <TCP-Swift.h>
#import "Flurry.h"
#import <React/RCTConvert.h>
@implementation INativeModule : NSObject
RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(logClass:(NSString *)name message:(NSString *)msg)
{
   // [MyLog LogMsg:name :msg];
  #ifdef DEBUG
    [MyLog LogMsg:name :msg];
  #else

  #endif
}

RCT_EXPORT_METHOD(analysisWithObj:(NSString *)name data:(NSDictionary *)paras)
{
  NSDictionary *articleParams =   [RCTConvert NSDictionary:paras];
  [Flurry logEvent:name withParameters:articleParams];
}

RCT_EXPORT_METHOD(analysis:(NSString *)name)
{
  
  [Flurry logEvent:name];
}

@end


