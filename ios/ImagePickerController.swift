//
//  ImagePicker.swift
//  Expensee
//
//  Created by Giulio Gola on 07/11/2019.
//  Copyright © 2019 Facebook. All rights reserved.
//

import UIKit

protocol ImagePickerProtocol {
  func getImageData(imageData: String)
}

@objc(ImagePickerController)
class ImagePickerController: UIViewController {
  
  var imagePicker: UIImagePickerController!
  var delegate: ImagePickerProtocol?
  var mode: NSString?
  var imageDataEncoded: String?
  
  override func viewDidLoad() {
    super.viewDidLoad()
    // Image picker setup based on mode
    imagePicker = UIImagePickerController()
    imagePicker.sourceType = mode == "library" ? .photoLibrary : .camera
    if (mode == "camera") {
      imagePicker.cameraCaptureMode = .photo
    }
    imagePicker.allowsEditing = false
    imagePicker.delegate = self
    self.present(imagePicker, animated: true, completion: nil)
  }
  
}

//Image Picker Controller Delegate
extension ImagePickerController: UIImagePickerControllerDelegate, UINavigationControllerDelegate {
  
  func imagePickerControllerDidCancel(_ picker: UIImagePickerController) {
    imagePicker.dismiss(animated: true, completion: nil)
    DispatchQueue.main.async {
      self.view.removeFromSuperview()
    }
  }

  func imagePickerController(_ picker: UIImagePickerController, didFinishPickingMediaWithInfo info: [UIImagePickerController.InfoKey : Any]) {
    if let image = info[.originalImage] as? UIImage {
      let imageOrientatedUp = UIImage(cgImage: image.cgImage!, scale: image.scale, orientation: .up)
      let imageData = imageOrientatedUp.jpegData(compressionQuality: 0.2)! as NSData
      imageDataEncoded = imageData.base64EncodedString(options: .lineLength64Characters)
      if let imageData = imageDataEncoded {
        delegate?.getImageData(imageData: imageData)
      }
    } else {
      print("Could not cast image as UIImage")
    }
    self.imagePicker.dismiss(animated: true, completion: nil)
    DispatchQueue.main.async {
      self.view.removeFromSuperview()
    }
    
  }
}




