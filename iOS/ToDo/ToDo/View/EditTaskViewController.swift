//
//  EditTaskViewController.swift
//  ToDo
//
//  Created by 신한섭 on 2020/04/08.
//  Copyright © 2020 신한섭. All rights reserved.
//

import UIKit

class EditTaskViewController: UIViewController {
    
    @IBAction func cancelButtonPushed(_ sender: UIButton) {
        dismiss(animated: true)
    }
    @IBOutlet weak var titleTextField: UITextField!
    @IBOutlet weak var contentsTextView: UITextView!
    @IBOutlet weak var limitLabel: UILabel!
    
    private let contentsTextViewDelegate = ContentsTextViewDelegate()
    
    override func viewDidLoad() {
        super.viewDidLoad()
        setPlaceHolder()
        contentsTextView.delegate = contentsTextViewDelegate
        limitLabel.text = "0 / \(contentsTextViewDelegate.limit)"
        contentsTextViewDelegate.handler = {
            self.updateLimitLabel(factor: $0)
        }
    }
    
    func setPlaceHolder() {
        contentsTextView.text = "Contents"
        contentsTextView.textColor = .gray
    }
    
    func updateLimitLabel(factor: Bool) {
        let count = "\(contentsTextView.text.count)"
        let limit = "\(contentsTextView.text.count) / \(contentsTextViewDelegate.limit)"
        let attributedString = NSMutableAttributedString(string: limit)
        attributedString.addAttribute(NSAttributedString.Key.foregroundColor, value: factor ? UIColor.black : UIColor.red, range: (limit as NSString).range(of: count))

        limitLabel.attributedText = attributedString
    }
}
