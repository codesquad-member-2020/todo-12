//
//  CardManager.swift
//  ToDo
//
//  Created by 신한섭 on 2020/04/09.
//  Copyright © 2020 신한섭. All rights reserved.
//

import Foundation

class CardManager {
    private var cards: [Card]
    public var count: Int {
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
        return cards[index].author
    }
    
    func remove(at index: Int) {
        cards.remove(at: index)
    }
}
