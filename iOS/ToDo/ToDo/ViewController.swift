//
//  ViewController.swift
//  ToDo
//
//  Created by 신한섭 on 2020/04/06.
//  Copyright © 2020 신한섭. All rights reserved.
//

import UIKit

class ViewController: UIViewController {
    
    private var todoViewController: TaskTableViewController?
    private var inProgressViewController: TaskTableViewController?
    private var doneViewController: TaskTableViewController?
    
    override func viewDidLoad() {
        super.viewDidLoad()
    }
    
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        if segue.identifier == "todo" {
            todoViewController = segue.destination as? TaskTableViewController
            todoViewController?.tableView.backgroundColor = .blue
        }
        
        if segue.identifier == "inProgress" {
            inProgressViewController = segue.destination as? TaskTableViewController
            inProgressViewController?.tableView.backgroundColor = .white
        }
        
        if segue.identifier == "done" {
            doneViewController = segue.destination as? TaskTableViewController
            doneViewController?.tableView.backgroundColor = .red
        }
    }
}

