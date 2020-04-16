//
//  HistoryTableViewController.swift
//  ToDo
//
//  Created by 신한섭 on 2020/04/06.
//  Copyright © 2020 신한섭. All rights reserved.
//

import UIKit

class HistoryTableViewController: UITableViewController {
    
    var historys: [History]? {
        didSet {
            DispatchQueue.main.async {
                self.tableView.reloadData()
            }
        }
    }
    
    override func viewDidLoad() {
        NetworkConnection.loadHistroyModel {
            self.historys = $0.sorted {$0.id > $1.id}
        }
        
        super.viewDidLoad()
    }
    
    override func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        guard let cell = tableView.dequeueReusableCell(withIdentifier: "historyCell") as? HistoryCell else {return UITableViewCell()}
        guard let history = historys?[indexPath.row] else {return UITableViewCell()}
        DispatchQueue.main.async {
            switch history.action {
            case "moved":
                cell.contentLabel.attributedText = self.moved(history: history)
                break
            case "added":
                cell.contentLabel.attributedText = self.added(history: history)
                break
            case "removed":
                cell.contentLabel.attributedText = self.deleted(history: history)
            default:
                break
            }
            cell.timeLabel.text = Calendar.calculateDay.getHourMinuteString(date: history.modifiedTime)
        }
        return cell
    }
    
    override func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return historys?.count ?? 0
    }
    
    func moved(history: History) -> NSMutableAttributedString {
        let moved = "@\(history.userId) \(history.action) \(history.cardTitle ?? "제목 없음") from \(history.fromCategory ?? "") to \(history.toCategory)"
        let attributedString = NSMutableAttributedString(string: moved)
        attributedString.setupStyle(fontSize: 20, color: .blue, originText: moved, targetText: "@" + history.userId)
        attributedString.setupStyle(fontSize: 20, color: .systemOrange, originText: moved, targetText: history.cardTitle ?? "제목 없음")
        attributedString.setupStyle(fontSize: 20, color: .systemOrange, originText: moved, targetText: history.fromCategory ?? "")
        attributedString.setupStyle(fontSize: 20, color: .systemOrange, originText: moved, targetText: history.toCategory)
        return attributedString
    }
    
    func added(history: History) -> NSMutableAttributedString {
        let added = "@\(history.userId) \(history.action) \(history.cardTitle ?? "제목 없음") to \(history.toCategory)"
        let attributedString = NSMutableAttributedString(string: added)
        attributedString.setupStyle(fontSize: 20, color: .blue, originText: added, targetText: "@" + history.userId)
        attributedString.setupStyle(fontSize: 20, color: .systemOrange, originText: added, targetText: history.cardTitle ?? "제목 없음")
        attributedString.setupStyle(fontSize: 20, color: .systemOrange, originText: added, targetText: history.toCategory)
        return attributedString
    }
    
    func deleted(history: History) -> NSMutableAttributedString {
        let deleted = "@\(history.userId) \(history.action) \(history.cardTitle ?? "제목 없음") from \(history.toCategory)"
        let attributedString = NSMutableAttributedString(string: deleted)
        attributedString.setupStyle(fontSize: 20, color: .blue, originText: deleted, targetText: "@" + history.userId)
        attributedString.setupStyle(fontSize: 20, color: .systemOrange, originText: deleted, targetText: history.cardTitle ?? "제목 없음")
        attributedString.setupStyle(fontSize: 20, color: .systemOrange, originText: deleted, targetText: history.toCategory)
        return attributedString
    }
}

extension NSMutableAttributedString {
    func setupStyle(fontSize: CGFloat, color: UIColor, originText: String, targetText: String) {
        let font = UIFont.boldSystemFont(ofSize: fontSize)
        self.addAttributes([NSAttributedString.Key(rawValue: kCTFontAttributeName as String) : font, .foregroundColor : color], range: (originText as NSString).range(of: targetText))
    }
}
