package dev.codesquad.java.todo12.Controller;

import dev.codesquad.java.todo12.*;
import dev.codesquad.java.todo12.Repository.CardRepository;
import dev.codesquad.java.todo12.Repository.CategoryRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ApiHomeController {
    private Logger logger = LoggerFactory.getLogger(ApiHomeController.class);

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private CardRepository cardRepository;

    @GetMapping("/")
    public ResponseEntity home() {
        return new ResponseEntity(categoryRepository.findCategoriesByIdDeletedFalse(), HttpStatus.OK);
        //return new ResponseEntity(categoryRepository.findAll(), HttpStatus.OK);
    }

    // for test
//    @GetMapping("/add/{categoryId}")
//    public ResponseEntity addTest(@PathVariable Long categoryId){
//        Card card = new Card("새거", "택배언제와");
//        Category category = getCategory(categoryId);
//        category.addCard(card);
//        categoryRepository.save(category);
//
//        category = getCategory(categoryId);
//        card = category.getLastCard();
//
//        return new ResponseEntity(card, HttpStatus.OK);
//    }
//
//    @GetMapping("/delete/{id}")
//    public ResponseEntity deleteTest(@PathVariable Long id) {
//        Card card = getCard(id);
//        cardRepository.delete(card);
//        return new ResponseEntity(card, HttpStatus.OK);
//    }

    private Card getCard(Long id) {
        return cardRepository.findById(id).orElseThrow(() -> new DataNotFoundException("해당 카드 없음"));
    }

    private Category getCategory(Long id) {
        return categoryRepository.findById(id).orElseThrow(() -> new DataNotFoundException("해당 카테고리 없음"));
    }
}
