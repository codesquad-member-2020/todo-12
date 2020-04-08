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
    
    private let contentsTextViewDelegate = ContentsTextViewDelegate()
    
    override func viewDidLoad() {
        super.viewDidLoad()
        setPlaceHolder()
        contentsTextView.delegate = contentsTextViewDelegate
    }
    
    func setPlaceHolder() {
        contentsTextView.text = "Contents"
        contentsTextView.textColor = .gray
    }
}
