//
//  ContentsTextViewDelegate.swift
//  ToDo
//
//  Created by 신한섭 on 2020/04/08.
//  Copyright © 2020 신한섭. All rights reserved.
//

import UIKit

class ContentsTextViewDelegate: NSObject, UITextViewDelegate {
    
    var handler: (Bool) -> () = {_ in}
    private(set) var limit = 500
    
    func textViewDidBeginEditing(_ textView: UITextView) {
        if textView.textColor == UIColor.gray {
            textView.text = ""
        }
        textView.textColor = .black
    }
    
    func textViewDidEndEditing(_ textView: UITextView) {
        if textView.text.isEmpty {
            textView.text = "Contents"
            textView.textColor = .gray
        }
    }
    
    func textViewDidChangeSelection(_ textView: UITextView) {
        let result = textView.text.count < limit
        handler(result)
    }
    
    func textView(_ textView: UITextView, shouldChangeTextIn range: NSRange, replacementText text: String) -> Bool {
        let newLength = textView.text.count + text.count - range.length
        return newLength <= limit
    }
}
