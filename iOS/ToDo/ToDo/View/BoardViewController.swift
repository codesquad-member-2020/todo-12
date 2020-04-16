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
        loadModel()
        NotificationCenter.default.addObserver(self,
                                               selector: #selector(moveToDone(_:)),
                                               name: .postMoveToDoneCard,
                                               object: nil)
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
        NetworkConnection.request(httpMethod: .GET, quertString: "", httpBody: nil, errorHandler: alertErrorJsoneDecode) {
            let decoder = JSONDecoder()
            decoder.dateDecodingStrategy = .formatted(DateFormatter.dateConverter)
            do {
                self.model = try decoder.decode([Category].self, from: $0)
                DispatchQueue.main.async {
                    for (index, child) in self.children.enumerated() {
                        guard let viewController = child as? CardViewController else {return}
                        self.setModel(viewController: viewController, model: self.model[index])
                    }
                    self.activityIndicator.isHidden = true
                    self.menuButton.isEnabled = true
                }
            } catch {
                self.alertErrorJsoneDecode()
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
        let insertInfo = object.willInsert
        
        NotificationCenter.default.post(name: .postWillRemoveIndex,
                                        object: nil,
                                        userInfo: ["index" : removeInfo.indexPath.row, "id" : removeInfo.categoryId])
        
        NotificationCenter.default.post(name: .cardInserted,
                                        object: nil,
                                        userInfo: ["index" : insertInfo.indexPath.row, "id" : insertInfo.categoryId, "card" : insertInfo.card])
    }
    
    @objc func moveToDone(_ notification: Notification) {
        guard let card = notification.userInfo?["card"] as? Card else {return}
        NotificationCenter.default.post(name: .cardInserted,
                                        object: nil,
                                        userInfo: ["card" : card, "id" : model[2].id])
    }
}

extension Notification.Name {
    static let distributeModel = Notification.Name("distributeModel")
    static let cardInserted = Notification.Name("cardInserted")
}
