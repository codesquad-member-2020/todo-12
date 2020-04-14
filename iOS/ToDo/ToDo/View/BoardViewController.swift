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
    private var todoViewController: CardViewController?
    private var inProgressViewController: CardViewController?
    private var doneViewController: CardViewController?
    
    private let endPoint = "https://4122ebd9-5e04-4a5b-a913-fe458d2e91d4.mock.pstmn.io"
    
    override func viewDidLoad() {
        super.viewDidLoad()
        loadModel()
        NotificationCenter.default.addObserver(self,
                                               selector: #selector(moveToDone(_:)),
                                               name: .moveToDone,
                                               object: nil)
    }
    
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        if segue.identifier == "todo" {
            todoViewController = segue.destination as? CardViewController
        }
        
        if segue.identifier == "inProgress" {
            inProgressViewController = segue.destination as? CardViewController
        }
        
        if segue.identifier == "done" {
            doneViewController = segue.destination as? CardViewController
        }
    }
    
    private func loadModel() {
        NetworkConnection.request(resource: endPoint + "/mockup", errorHandler: {}) {
            let decoder = JSONDecoder()
            do {
                let model = try decoder.decode(Model.self, from: $0)
                DispatchQueue.main.async {
                    self.setModel(viewController: self.todoViewController, model: model, index: 0)
                    self.setModel(viewController: self.inProgressViewController, model: model, index: 1)
                    self.setModel(viewController: self.doneViewController, model: model, index: 2)
                    self.activityIndicator.isHidden = true
                    self.menuButton.isEnabled = true
                }
            } catch {
                let alert = UIAlertController(title: "서버에 문제가 생겼어요", message: "뭔가 문제가 발생한 것 같습니다ㅠㅠ", preferredStyle: .alert)
                let ok = UIAlertAction(title: "넵...", style: .default)
                alert.addAction(ok)
                self.present(alert, animated: true)
            }
        }
    }
    
    private func setModel(viewController: CardViewController?, model: Model, index: Int) {
        NotificationCenter.default.post(name: .distributeModel, object: viewController,
                                        userInfo: ["category" : model.categories[index]])
        viewController?.cardTabelView.reloadData()
        viewController?.titleLabel.text = model.categories[index].name
        viewController?.addCardButton.isEnabled = true
        
    }
    
    @objc func moveToDone(_ notification: Notification) {
        guard let card = notification.userInfo?["card"] as? Card else {return}
        guard let dataSource = doneViewController?.cardTabelView.dataSource as? CardDataSource else {return}
        guard let row = dataSource.category?.count else {return}
        dataSource.category?.append(card: card)
        
        let indexPath = IndexPath(row: row, section: 0)
        
        doneViewController?.cardTabelView.insertRows(at: [indexPath], with: .automatic)
    }
}

extension Notification.Name {
    static let distributeModel = Notification.Name("distributeModel")
}
