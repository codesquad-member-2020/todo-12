//
//  LoginViewController.swift
//  ToDo
//
//  Created by 신한섭 on 2020/04/17.
//  Copyright © 2020 신한섭. All rights reserved.
//

import UIKit

class LoginViewController: UIViewController {
    
    @IBOutlet weak var loginBtn: UIButton!
    @IBOutlet weak var cancelBtn: UIButton!
    @IBOutlet weak var idLabel: UITextField!
    @IBOutlet weak var passwordLabel: UITextField!
    @IBOutlet weak var wrongIDLabel: UILabel!
    @IBOutlet weak var wrongPasswordLabel: UILabel!
    @IBAction func login(_ sender: UIButton) {
        guard let id = idLabel.text else {return}
        guard let password = passwordLabel.text else {return}
        let loginInfo = ["userId" : id, "password" : password]
        let encoder = JSONEncoder()
        do {
            let body = try encoder.encode(loginInfo)
            NetworkConnection.requestToken(body: body, failureHandler: {
                if $0.statusCode == 404 {
                    DispatchQueue.main.async {
                        self.wrongIDLabel.alpha = 1
                        self.wrongIDLabel.textColor = .red
                        self.wrongIDLabel.text = "잘못된 ID 입니다."
                        self.wrongPasswordLabel.alpha = 0
                        self.idLabel.layer.borderColor = UIColor.red.cgColor
                        self.idLabel.layer.borderWidth = 1
                        self.passwordLabel.layer.borderWidth = 0
                    }
                } else if $0.statusCode == 401 {
                    DispatchQueue.main.async {
                        self.wrongPasswordLabel.alpha = 1
                        self.wrongPasswordLabel.textColor = .red
                        self.wrongPasswordLabel.text = "잘못된 패스워드 입니다."
                        self.wrongIDLabel.alpha = 0
                        self.passwordLabel.layer.borderColor = UIColor.red.cgColor
                        self.passwordLabel.layer.borderWidth = 1
                        self.idLabel.layer.borderWidth = 0
                    }
                }
            }) {
                NotificationCenter.default.post(name: .postLoginSuccess,
                                                object: nil)
                DispatchQueue.main.async {
                    self.dismiss(animated: true)
                }
            }
        } catch {
            
        }
    }
    
    @IBAction func cancel(_ sender: UIButton) {
        NotificationCenter.default.post(name: .postLoginCanceled,
                                        object: nil)
        dismiss(animated: true)
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
        setupLabelRadius()
    }
    
    private func setupLabelRadius() {
        loginBtn.clipsToBounds = true
        cancelBtn.clipsToBounds = true
        loginBtn.layer.cornerRadius = 10
        cancelBtn.layer.cornerRadius = 10
    }
    
}

extension Notification.Name {
    static let postLoginSuccess = Notification.Name("postLoginSuccess")
    static let postLoginCanceled = Notification.Name("postLoginCanceled")
}
