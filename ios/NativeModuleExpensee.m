//
//  NativeModuleExpensee.m
//  Expensee
//
//  Created by Giulio Gola on 07/11/2019.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>

// The native module
@interface RCT_EXTERN_MODULE(ImagePickerInstantiator, NSObject)

// The methods exposed to Javascript
RCT_EXTERN_METHOD(instantiateImagePicker:(NSString *)mode callback:(RCTResponseSenderBlock)callback);

@end
