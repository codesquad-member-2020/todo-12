//
//  NetworkConnection.swift
//  ToDo
//
//  Created by 신한섭 on 2020/04/09.
//  Copyright © 2020 신한섭. All rights reserved.
//

import Foundation

class NetworkConnection {
    
    static let endPoint: String = "http://15.165.163.174/api/"
    
    enum HTTPHeaderField {
        static let TYPE = "Content-Type"
    }
    
    enum HTTPHeaderValue {
        static let JSON = "application/json"
    }
    
    enum HTTPMethod: String {
        case GET
        case POST
        case PUT
        case DELETE
    }
    
    class func request(httpMethod: HTTPMethod, queryString: String, httpBody: Data?, errorHandler: @escaping () -> (), handlder: @escaping (Data) -> Void){
        let encodedString = (endPoint + queryString).addingPercentEncoding(withAllowedCharacters: .urlQueryAllowed)!
        guard let url = URL(string: encodedString) else {return}
        var request = URLRequest(url: url)
        
        request.httpMethod = httpMethod.rawValue
        request.addValue(HTTPHeaderValue.JSON, forHTTPHeaderField: HTTPHeaderField.TYPE)
        if let body = httpBody {
            request.httpBody = body
        }
        
        let dataTask = URLSession.shared.dataTask(with: request) { (data: Data?, response: URLResponse?, error: Error?) in
            guard error == nil else {
                errorHandler()
                return
            }
            
            guard let data = data, let response = response as? HTTPURLResponse, response.statusCode == 200 else {return}
            
            handlder(data)
        }
        
        dataTask.resume()
    }
    
    class func delete(cardId: Int, failureHandler: @escaping () -> () = {}, successHandler: @escaping () -> ()) {
        request(httpMethod: .DELETE, queryString: "card/\(cardId)", httpBody: nil, errorHandler: {}) {
            guard let result = String(data: $0, encoding: .utf8) else {return}
            if result == "OK" {
                successHandler()
            } else {
                failureHandler()
            }
        }
    }
    
    class func edit(card: Card, data: Data, failureHandler: @escaping () -> () = {}, successHandler: @escaping (Card) -> ()){
        request(httpMethod: .PUT, queryString: "card/\(card.id)", httpBody: data, errorHandler: {}) {
            let decoder = JSONDecoder()
            decoder.dateDecodingStrategy = .formatted(DateFormatter.dateConverter)
            do {
                let card = try decoder.decode(Card.self, from: $0)
                successHandler(card)
            } catch {
                failureHandler()
            }
        }
    }
    
    class func move(cardId: Int, categoryId: Int, destinationIndex: Int?, failureHandler: @escaping () -> () = {}, successHandler: @escaping () -> () = {}) {
        var queryString = "card/\(cardId)/move/\(categoryId)/"
        if let index = destinationIndex {
            queryString += "\(index)"
        }
        request(httpMethod: .PUT, queryString: queryString, httpBody: nil, errorHandler: {}) {
            let decoder = JSONDecoder()
            decoder.dateDecodingStrategy = .formatted(DateFormatter.dateConverter)
            do {
                let card = try decoder.decode(Card.self, from: $0)
                if destinationIndex != nil {
                    guard destinationIndex == card.categoryKey else {
                        failureHandler()
                        return
                    }
                }
                successHandler()
            } catch {
                failureHandler()
            }
        }
    }
    
    class func create(cardId: Int, body: Data, failureHandler: @escaping () -> () = {}, successHandler: @escaping (Card) -> ()) {
        request(httpMethod: .POST, queryString: "card/\(cardId)", httpBody: body, errorHandler: {}) {
            let decoder = JSONDecoder()
            decoder.dateDecodingStrategy = .formatted(DateFormatter.dateConverter)
            do {
                let card = try decoder.decode(Card.self, from: $0)
                successHandler(card)
            } catch{
                failureHandler()
            }
        }
    }
    
    class func loadModel(failureHandler: @escaping () -> () = {}, successHandler: @escaping ([Category]) -> ()) {
        request(httpMethod: .GET, queryString: "", httpBody: nil, errorHandler: {}) {
            let decoder = JSONDecoder()
            decoder.dateDecodingStrategy = .formatted(DateFormatter.dateConverter)
            do {
                let model = try decoder.decode([Category].self, from: $0)
                successHandler(model)
            } catch {
                failureHandler()
            }
        }
    }
}
