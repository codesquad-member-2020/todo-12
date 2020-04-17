//
//  HistoryManager.swift
//  ToDo
//
//  Created by 신한섭 on 2020/04/17.
//  Copyright © 2020 신한섭. All rights reserved.
//

import Foundation

class HistoryManager {
    private var historys: [History]
    var count: Int {
        return historys.count
    }
    
    init(historys: [History]) {
        self.historys = historys
    }
    
    func history(at index: Int) -> History {
        return historys[index]
    }
    
    func action(history: History) -> NSMutableAttributedString {
        switch history.action {
        case "moved":
            return moved(history: history)
        case "added":
            return added(history: history)
        case "removed":
            return deleted(history: history)
        case "updated":
            return updated(history: history)
        default:
            return moved(history: history)
        }
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
    
    func updated(history: History) -> NSMutableAttributedString {
        let updated = "@\(history.userId) \(history.action) \(history.cardTitle ?? "제목 없음") in \(history.toCategory)"
        let attributedString = NSMutableAttributedString(string: updated)
        attributedString.setupStyle(fontSize: 20, color: .blue, originText: updated, targetText: "@" + history.userId)
        attributedString.setupStyle(fontSize: 20, color: .systemOrange, originText: updated, targetText: history.cardTitle ?? "제목 없음")
        attributedString.setupStyle(fontSize: 20, color: .systemOrange, originText: updated, targetText: history.toCategory)
        return attributedString
    }
    
}
