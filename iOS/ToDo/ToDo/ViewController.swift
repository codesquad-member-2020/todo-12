//
//  ViewController.swift
//  ToDo
//
//  Created by 신한섭 on 2020/04/06.
//  Copyright © 2020 신한섭. All rights reserved.
//

import UIKit

class ViewController: UIViewController {
    
    private var todoViewController: TableViewController?
    private var inProgressViewController: TableViewController?
    private var doneViewController: TableViewController?
    
    override func viewDidLoad() {
        super.viewDidLoad()
    }
    
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        if segue.identifier == "todo" {
            todoViewController = segue.destination as? TableViewController
            todoViewController?.tableView.backgroundColor = .blue
        }
        
        if segue.identifier == "inProgress" {
            inProgressViewController = segue.destination as? TableViewController
            inProgressViewController?.tableView.backgroundColor = .white
        }
        
        if segue.identifier == "done" {
            doneViewController = segue.destination as? TableViewController
            doneViewController?.tableView.backgroundColor = .red
        }
    }
}

