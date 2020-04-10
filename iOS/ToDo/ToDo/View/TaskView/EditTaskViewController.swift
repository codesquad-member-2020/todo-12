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
    
    @IBAction func editButtonPushed(_ sender: UIButton) {
        dismiss(animated: true) {
            self.model?.content = self.contentsTextView.text
            self.model?.title = self.titleTextField.text
            guard let index = self.editedModelIndex, let card = self.model else {return}
            self.handler(index, card)
        }
    }
    
    var handler: (Int, Card) -> () = {_,_  in}
    
    @IBOutlet weak var titleTextField: UITextField!
    @IBOutlet weak var contentsTextView: UITextView!
    @IBOutlet weak var limitLabel: UILabel!
    
    var model: Card?
    var editedModelIndex: Int?
    
    private let contentsTextViewDelegate = ContentsTextViewDelegate()
    
    override func viewDidLoad() {
        super.viewDidLoad()
        setPlaceHolder()
        contentsTextView.delegate = contentsTextViewDelegate
        setupView()
        contentsTextViewDelegate.handler = {
            self.updateLimitLabel(factor: $0)
        }
    }
    
    func setupView() {
        guard let received = model else {return}
        titleTextField.text = received.title ?? "제목 없음"
        contentsTextView.text = received.content
        limitLabel.text = "\(received.content.count) / \(contentsTextViewDelegate.limit)"
    }
    
    func setPlaceHolder() {
        guard model != nil else {
            contentsTextView.text = "Contents"
            contentsTextView.textColor = .gray
            return
        }
        contentsTextView.textColor = .label
    }
    
    func updateLimitLabel(factor: Bool) {
        let count = "\(contentsTextView.text.count)"
        let limit = "\(contentsTextView.text.count) / \(contentsTextViewDelegate.limit)"
        let attributedString = NSMutableAttributedString(string: limit)
        attributedString.addAttribute(.foregroundColor, value: factor ? UIColor.label : UIColor.red, range: (limit as NSString).range(of: count))
        
        limitLabel.attributedText = attributedString
    }
}
