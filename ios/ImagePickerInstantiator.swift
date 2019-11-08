//
//  ImagePickerInstantiator.swift
//  Expensee
//
//  Created by Giulio Gola on 08/11/2019.
//  Copyright © 2019 Facebook. All rights reserved.
//

import UIKit

@objc(ImagePickerInstantiator)
class ImagePickerInstantiator: NSObject, ImagePickerProtocol {
  
  var imageData: String?
  var callbackFunction: RCTResponseSenderBlock!
  
  // Swift gets called here by JS Realm passing the mode ("camera", "library") and the callback function
  @objc func instantiateImagePicker(_ mode: NSString, callback: @escaping RCTResponseSenderBlock) {
    
    // Save callback for later
    callbackFunction = callback
    
    // Instantiate image picker controller
    let imagePickerControllerScene = ImagePickerController()
    imagePickerControllerScene.delegate = self
    imagePickerControllerScene.mode = mode
    
    // Show Image picker controller
    DispatchQueue.main.async {
      let appDelegate = UIApplication.shared.delegate
      appDelegate?.window??.rootViewController?.addChild(imagePickerControllerScene)
      
      imagePickerControllerScene.view.frame = (appDelegate?.window??.rootViewController?.view.frame)!
      appDelegate?.window??.rootViewController?.view.addSubview(imagePickerControllerScene.view)
      imagePickerControllerScene.didMove(toParent: appDelegate?.window??.rootViewController)
    }
  }
  
  // Delegate method of ImagePickerProtocol
  func getImageData(imageData: String) {
    // Swift calling back JS realm with image data...
    callbackFunction([imageData])
  }
  
}
