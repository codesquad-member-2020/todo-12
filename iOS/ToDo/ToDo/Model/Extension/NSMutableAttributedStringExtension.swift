//
//  NSMutableAttributedStringExtension.swift
//  ToDo
//
//  Created by 신한섭 on 2020/04/17.
//  Copyright © 2020 신한섭. All rights reserved.
//

import UIKit

extension NSMutableAttributedString {
    func setupStyle(fontSize: CGFloat, color: UIColor, originText: String, targetText: String) {
        let font = UIFont.boldSystemFont(ofSize: fontSize)
        self.addAttributes([NSAttributedString.Key(rawValue: kCTFontAttributeName as String) : font, .foregroundColor : color], range: (originText as NSString).range(of: targetText))
    }
}

