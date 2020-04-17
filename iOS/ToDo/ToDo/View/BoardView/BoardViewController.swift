//
//  ViewController.swift
//  ToDo
//
//  Created by 신한섭 on 2020/04/06.
//  Copyright © 2020 신한섭. All rights reserved.
//

import UIKit

class BoardViewController: UIViewController {
    
    @IBOutlet weak var activityIndicator: UIActivityIndicatorView!
    @IBOutlet weak var menuButton: UIBarButtonItem!
    
    private var model: [Category] = [Category]()
    
    override func viewDidLoad() {
        super.viewDidLoad()
        NotificationCenter.default.addObserver(self,
                                               selector: #selector(loginSuccess),
                                               name: .postLoginSuccess,
                                               object: nil)
        guard let editView = self.storyboard?.instantiateViewController(identifier: "login") as? LoginViewController else {return}
        self.present(editView, animated: true)
        
    }
    
    func loginSuccessAlert() {
        let alert = UIAlertController(title: "로그인 성공", message: "환영합니다!", preferredStyle: .alert)
        let ok = UIAlertAction(title: "넵ㅎ", style: .default)
        alert.addAction(ok)
        DispatchQueue.main.async {
            self.present(alert, animated: true)
        }
    }
    
    @objc func loginSuccess() {
        loginSuccessAlert()
        loadModel()
        NotificationCenter.default.addObserver(self,
                                               selector: #selector(exchangeCellOnDifferentTable(_:)),
                                               name: .postWillExchangeIndexOnDifferentCategory,
                                               object: nil)
    }
    
    private func alertErrorJsoneDecode() {
        let alert = UIAlertController(title: "문제가 생겼어요", message: "데이터를 해석하다가 문제가 생겼어요ㅠㅠ", preferredStyle: .alert)
        let ok = UIAlertAction(title: "넵...", style: .default)
        alert.addAction(ok)
        DispatchQueue.main.async {
            self.present(alert, animated: true)
        }
    }
    
    private func alertErrorNoResponse() {
        let alert = UIAlertController(title: "서버에 문제가 생겼어요", message: "서버가 응답하지 않아요ㅠㅠ", preferredStyle: .alert)
        let ok = UIAlertAction(title: "넵...", style: .default)
        alert.addAction(ok)
        DispatchQueue.main.async {
            self.present(alert, animated: true)
        }
    }
    
    private func loadModel() {
        NetworkConnection.loadCategoryModel{
            self.model = $0
            DispatchQueue.main.async {
                for (index, child) in self.children.enumerated() {
                    guard let viewController = child as? CardViewController else {return}
                    self.setModel(viewController: viewController, model: self.model[index])
                }
                self.activityIndicator.isHidden = true
                self.menuButton.isEnabled = true
            }
        }
    }
    
    private func setModel(viewController: CardViewController?, model: Category) {
        viewController?.setCategory(category: model)
        viewController?.cardTabelView.reloadData()
        viewController?.titleLabel.text = model.name
        viewController?.addCardButton.isEnabled = true
        
    }
    
    @objc func exchangeCellOnDifferentTable(_ notification: Notification) {
        guard let object = notification.userInfo?["object"] as? DragAndDropObject else {return}
        let removeInfo = object.willRemove
        let cardId = removeInfo.card.id
        guard let insertInfo = object.willInsert else {
            NetworkConnection.move(cardId: cardId, categoryId: 3, destinationIndex: nil, successHandler: {
                DispatchQueue.main.async {
                    NotificationCenter.default.post(name: .postWillRemoveIndex,
                                                    object: nil,
                                                    userInfo: ["index" : removeInfo.indexPath.row, "id" : removeInfo.categoryId])
                    NotificationCenter.default.post(name: .cardInserted,
                                                    object: nil,
                                                    userInfo: ["card" : removeInfo.card, "id" : self.model[2].id])
                }
            })
            return
        }
        
        let categoryId = insertInfo.categoryId
        let destinationIndex = insertInfo.indexPath.row
        NetworkConnection.move(cardId: cardId, categoryId: categoryId, destinationIndex: destinationIndex, successHandler: {
            DispatchQueue.main.async {
                NotificationCenter.default.post(name: .postWillRemoveIndex,
                                                object: nil,
                                                userInfo: ["index" : removeInfo.indexPath.row, "id" : removeInfo.categoryId])
                
                NotificationCenter.default.post(name: .cardInserted,
                                                object: nil,
                                                userInfo: ["index" : insertInfo.indexPath.row, "id" : insertInfo.categoryId, "card" : insertInfo.card])
            }
        })
    }
}

extension Notification.Name {
    static let distributeModel = Notification.Name("distributeModel")
    static let cardInserted = Notification.Name("cardInserted")
}
