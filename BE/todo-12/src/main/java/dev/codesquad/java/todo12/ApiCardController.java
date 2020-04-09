package dev.codesquad.java.todo12;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/card")
public class ApiCardController {
    Logger logger = LoggerFactory.getLogger(ApiCardController.class);

    @Autowired
    CategoryRepository categoryRepository;

    @Autowired
    CardRepository cardRepository;

    @GetMapping("/{id}")
    public ResponseEntity view(@PathVariable Long id) {
        Card card = cardRepository.findById(id).orElseThrow(null);
        return new ResponseEntity(card, HttpStatus.OK);
    }

    //Post
    @GetMapping("/create/{categoryId}")
    public ResponseEntity create(@PathVariable Long categoryId) {
        Category category = categoryRepository.findById(categoryId).orElseThrow(null);
        Card card = new Card("input_title","input_content");
        category.addCard(card);
        categoryRepository.save(category);
        return new ResponseEntity(card, HttpStatus.OK);
    }

    //Put
    @GetMapping("/update/{id}")
    public ResponseEntity update(@PathVariable Long id) {
        Card card = cardRepository.findById(id).orElseThrow(null);
        card.update("input_content");
        cardRepository.save(card);
        return new ResponseEntity(card, HttpStatus.OK);
    }

    @GetMapping("/delete/{id}")
    public ResponseEntity delete(@PathVariable Long id) {
        Card card = cardRepository.findById(id).orElseThrow(null);
        card.delete();
        cardRepository.save(card);
        return new ResponseEntity(card, HttpStatus.OK);
    }
}
