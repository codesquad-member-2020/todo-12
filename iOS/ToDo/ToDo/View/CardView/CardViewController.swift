//
//  TaskViewController.swift
//  ToDo
//
//  Created by 신한섭 on 2020/04/06.
//  Copyright © 2020 신한섭. All rights reserved.
//

import UIKit

class CardViewController: UIViewController, UITableViewDelegate {
    
    @IBOutlet weak var numOfCardsLabel: UILabel!
    @IBOutlet weak var cardTabelView: UITableView!
    @IBOutlet weak var titleLabel: UILabel!
    @IBOutlet weak var addCardButton: UIButton!
    @IBAction func addCardButtonPushed(_ sender: UIButton) {
        guard let editView = self.storyboard?.instantiateViewController(identifier: "editViewController") as? EditCardViewController else {return}
        let indexPath = IndexPath(row: cardTabelView.numberOfRows(inSection: 0), section: 0)

        editView.createHandler = {
            self.dataSource.model?.append(card: $0)
            self.cardTabelView.insertRows(at: [indexPath], with: .automatic)
        }
        self.present(editView, animated: true)
    }
    
    let dataSource = TaskDataSource()
    private let delegate = TaskTableViewDelegate()
    
    override func viewDidLoad() {
        super.viewDidLoad()
        setLabelRadius()
        cardTabelView.dataSource = dataSource
        cardTabelView.delegate = delegate
        dataSource.handler = {
            self.numOfCardsLabel.text = String(self.dataSource.model?.count ?? 0)
        }
        delegate.handler = {
            guard let editView = self.storyboard?.instantiateViewController(identifier: "editViewController") as? EditCardViewController else {return}
            editView.model = self.dataSource.model?.cards[$0]
            editView.editedModelIndex = $0
            editView.editHandler = {
                self.dataSource.model?.cards[$0] = $1
                self.cardTabelView.reloadData()
            }
            self.present(editView, animated: true)
        }
    }
    
    private func setLabelRadius() {
        let superViewHeight = numOfCardsLabel.superview?.layer.frame.height ?? 0
        numOfCardsLabel.clipsToBounds = true
        numOfCardsLabel.layer.cornerRadius = superViewHeight * 0.24
    }
}
