//
//  DateExtension.swift
//  ToDo
//
//  Created by 신한섭 on 2020/04/16.
//  Copyright © 2020 신한섭. All rights reserved.
//

import Foundation

extension DateFormatter {
    static let dateConverter: DateFormatter = {
        let formatter = DateFormatter()
        formatter.dateFormat = "yyyy-MM-dd HH:mm:ss.SSS"
        formatter.calendar = Calendar.current
        return formatter
    }()
}

extension Calendar {
    func leftTime(date: Date) -> String{
        let offsetComps = Calendar.current.dateComponents([.hour,.minute,.second], from: date, to: Date())
        if case let (h?, m?, s?) = (offsetComps.hour, offsetComps.minute, offsetComps.second) {
            if h > 0 {
                return "\(h)시간 전"
            } else if m > 0 && m < 60 {
                return "\(m)분 전"
            } else if s > 5 && s < 60 {
                return "\(s)초 전"
            } else {
                return "방금 전"
            }
        }
        return ""
    }
}

