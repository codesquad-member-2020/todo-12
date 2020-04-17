//
//  LoginViewController.swift
//  ToDo
//
//  Created by 신한섭 on 2020/04/17.
//  Copyright © 2020 신한섭. All rights reserved.
//

import UIKit

class LoginViewController: UIViewController {
    
    @IBOutlet weak var idLabel: UITextField!
    @IBOutlet weak var passwordLabel: UITextField!
    @IBAction func login(_ sender: UIButton) {
        guard let id = idLabel.text else {return}
        guard let password = passwordLabel.text else {return}
        let loginInfo = ["userId" : id, "password" : password]
        let encoder = JSONEncoder()
        do {
            let body = try encoder.encode(loginInfo)
            NetworkConnection.requestToken(body: body, failureHandler: {
                print($0.statusCode)
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
        
    }
}

extension Notification.Name {
    static let postLoginSuccess = Notification.Name("postLoginSuccess")
    static let postLoginCanceled = Notification.Name("postLoginCanceled")
}
