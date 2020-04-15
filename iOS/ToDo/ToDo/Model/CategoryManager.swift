//
//  CategoryManager.swift
//  ToDo
//
//  Created by 신한섭 on 2020/04/15.
//  Copyright © 2020 신한섭. All rights reserved.
//

import Foundation

class CategoryManager {
    private(set) var id: Int
    private(set) var name: String
    private(set) var cardManager: CardManager
    var count: Int {
        return cardManager.count
    }
    
    init(category: Category) {
        self.id = category.id
        self.name = category.name
        self.cardManager = CardManager(cards: category.cards)
    }
    
    func removeCard(at index: Int) {
        cardManager.remove(at: index)
        NotificationCenter.default.post(name: .postRemovedIndex,
                                        object: nil,
                                        userInfo: ["index" : index, "id" : id])
    }
    
    func insertCard(card: Card, at index: Int = -1) {
        guard index == -1 else {return}
        cardManager.append(card: card)
        NotificationCenter.default.post(name: .postInsertedIndex,
                                        object: nil,
                                        userInfo: ["index" : count - 1, "id" : id])
    }
    
    func card(at index: Int) -> Card{
        return cardManager.card(at: index)
    }
}

extension Notification.Name {
    static let postRemovedIndex = Notification.Name("postRemovedIndex")
    static let postInsertedIndex = Notification.Name("postInsertedIndex")
}
