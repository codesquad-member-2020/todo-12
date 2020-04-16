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
        formatter.calendar = Calendar(identifier: .iso8601)
        formatter.timeZone = TimeZone(secondsFromGMT: 0)
        return formatter
    }()
}

extension Calendar {
    static let calculateDay: Calendar = {
        var calendar = Calendar(identifier: .iso8601)
        calendar.timeZone = TimeZone(secondsFromGMT: 0)!
        return calendar
    }()
    
    func getHourMinuteString(date: Date) -> String {
        let components = self.dateComponents([.hour, .minute, .second], from: date)
        if self.isDateInYesterday(date) {
            return "어제"
        }
        
        if components.hour! > 1 {
            return "\(components.hour!)시간 전"
        } else if components.minute! > 1 && components.minute! < 60 {
            return "\(components.minute!)분 전"
        } else if components.second! > 1 && components.second! < 60 {
            return "\(components.second!)초 전"
        }
        
        return ""
    }
}

