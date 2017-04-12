//
//  TLog.m
//  TCP
//
//  Created by thomas on 2017/3/12.
//  Copyright © 2017年 Facebook. All rights reserved.
//
#import <React/RCTBridgeModule.h>
#import <React/RCTLog.h>
#import "IOSLog.h"
#import <TCP-Swift.h>
@implementation IOSLog : NSObject
RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(logClass:(NSString *)name message:(NSString *)msg)
{
  [MyLog LogMsg:name :msg];
}

@end


