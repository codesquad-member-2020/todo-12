//
//  CardManager.swift
//  ToDo
//
//  Created by 신한섭 on 2020/04/15.
//  Copyright © 2020 신한섭. All rights reserved.
//

import Foundation

class CardManager {
    var cards: [Card] {
        didSet {
            NotificationCenter.default.post(name: .cardChanged,
                                            object: self)
        }
    }
    var count: Int {
        return cards.count
    }
    
    init(cards: [Card]) {
        self.cards = cards
    }
    
    func title(of index: Int) -> String {
        return cards[index].title ?? "제목 없음"
    }
    
    func content(of index: Int) -> String {
        return cards[index].content
    }
    
    func author(of index: Int) -> String {
        return "author by " + (cards[index].author ?? "")
    }
    
    func card(at index: Int) -> Card {
        return cards[index]
    }
    
    func append(card: Card) {
        cards.append(card)
    }
    
    func insert(_ newElement: Card, at index: Int) {
        cards.insert(newElement, at: index)
    }
    
    func remove(at index: Int) {
        cards.remove(at: index)
    }
}

extension Notification.Name {
    static let cardChanged = Notification.Name("cardChanged")
}
