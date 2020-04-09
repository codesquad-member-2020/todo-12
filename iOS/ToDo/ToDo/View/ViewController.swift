//
//  ViewController.swift
//  ToDo
//
//  Created by 신한섭 on 2020/04/06.
//  Copyright © 2020 신한섭. All rights reserved.
//

import UIKit

class ViewController: UIViewController {
    
    private var todoViewController: TaskViewController?
    private var inProgressViewController: TaskViewController?
    private var doneViewController: TaskViewController?
    
    private let endPoint = "https://4122ebd9-5e04-4a5b-a913-fe458d2e91d4.mock.pstmn.io"
    
    override func viewDidLoad() {
        super.viewDidLoad()
        loadModel()
    }
    
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        if segue.identifier == "todo" {
            todoViewController = segue.destination as? TaskViewController
        }
        
        if segue.identifier == "inProgress" {
            inProgressViewController = segue.destination as? TaskViewController
        }
        
        if segue.identifier == "done" {
            doneViewController = segue.destination as? TaskViewController
        }
    }
    
    func loadModel() {
        NetworkConnection.request(resource: endPoint + "/mockup", errorHandler: {}) {
            let decoder = JSONDecoder()
            do {
                let model = try decoder.decode(Model.self, from: $0)
                DispatchQueue.main.async {
                    self.todoViewController?.model = model.categories[0]
                    self.todoViewController?.taskTabelView.reloadData()
                    self.inProgressViewController?.model = model.categories[1]
                    self.inProgressViewController?.taskTabelView.reloadData()
                    self.doneViewController?.model = model.categories[2]
                    self.doneViewController?.taskTabelView.reloadData()
                }
            } catch {
                let alert = UIAlertController(title: "서버에 문제가 생겼어요", message: "뭔가 문제가 발생한 것 같습니다ㅠㅠ", preferredStyle: .alert)
                let ok = UIAlertAction(title: "넵...", style: .default)
                alert.addAction(ok)
                self.present(alert, animated: true)
            }
        }
    }
}

