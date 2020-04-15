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
    
    private let endPoint = "http://15.165.163.174/api"
    private var model: [Category] = [Category]()
    
    override func viewDidLoad() {
        super.viewDidLoad()
        loadModel()
        NotificationCenter.default.addObserver(self,
                                               selector: #selector(moveToDone(_:)),
                                               name: .postMoveToDoneCard,
                                               object: nil)
    }
    
    private func loadModel() {
        NetworkConnection.request(resource: endPoint, errorHandler: alertErrorNoResponse) {
            let decoder = JSONDecoder()
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
    
    private func setModel(viewController: CardViewController?, model: Category) {
        NotificationCenter.default.post(name: .distributeModel, object: viewController,
                                        userInfo: ["category" : model])
        viewController?.cardTabelView.reloadData()
        viewController?.titleLabel.text = model.name
        viewController?.addCardButton.isEnabled = true
        
    }
    
    @objc func moveToDone(_ notification: Notification) {
        guard let card = notification.userInfo?["card"] as? Card else {return}
//        guard let doneViewController = self.children.last as? CardViewController else {return}
        NotificationCenter.default.post(name: .cardInserted,
                                        object: nil,
                                        userInfo: ["card" : card, "id" : model[2].id])
    }
}

extension Notification.Name {
    static let distributeModel = Notification.Name("distributeModel")
    static let cardInserted = Notification.Name("cardInserted")
}
