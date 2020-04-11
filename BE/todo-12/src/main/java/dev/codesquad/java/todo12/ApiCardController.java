package dev.codesquad.java.todo12;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;

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
        Card card = getCard(id);
        return new ResponseEntity(card, HttpStatus.OK);
    }

    @PostMapping("/create/{categoryId}")
    public ResponseEntity create(@PathVariable Long categoryId, @RequestBody HashMap<String, String> cardInfo) {
        Category category = getCategory(categoryId);
        Card card = new Card(cardInfo.get("title"), cardInfo.get("content"));
        category.addCard(card);
        categoryRepository.save(category);
        return new ResponseEntity(card, HttpStatus.OK);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity update(@PathVariable Long id, @RequestBody HashMap<String, String> cardInfo) {
        Card card = getCard(id);
        card.update(cardInfo.get("title"), cardInfo.get("content"));
        cardRepository.save(card);
        return new ResponseEntity(card, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity delete(@PathVariable Long id) {
        Card card = getCard(id);
        card.delete();
        cardRepository.save(card);
        return new ResponseEntity(card, HttpStatus.OK);
    }

    @GetMapping("/move2/{categoryId}/{id}/{index}")
    public ResponseEntity move2(@PathVariable Long categoryId, @PathVariable Long id, @PathVariable int index) {
        Category toCategory = getCategory(categoryId);
        Card card = getCard(id);
        cardRepository.delete(card);
        toCategory.addCard(index, card);
        categoryRepository.save(toCategory);
        return new ResponseEntity(card, HttpStatus.OK);
    }

    @GetMapping("/move/{categoryId}/{id}/{categoryKey}")
    public ResponseEntity move(@PathVariable Long categoryId, @PathVariable Long id, @PathVariable Long categoryKey) {
        Card card = getCard(id);
        card.moveCard(categoryId, categoryKey);
        cardRepository.save(card);

        Category toCategory = getCategory(categoryId);
        List<Card> cardList = toCategory.getCards();

        logger.info("before: {}", card);

        categoryRepository.save(toCategory);
        Card updatedCard = getCard(id);
        logger.info("after: {}", updatedCard);

        if (card.getCategoryKey() < updatedCard.getCategoryKey()) {
            Collections.swap(cardList, Math.toIntExact(updatedCard.getCategoryKey())-1, Math.toIntExact(updatedCard.getCategoryKey()));
        } else if (card.getCategoryKey() > updatedCard.getCategoryKey()) {
            Collections.swap(cardList, Math.toIntExact(updatedCard.getCategoryKey())+1, Math.toIntExact(updatedCard.getCategoryKey()));
        }
        logger.info("final: {}", cardList);
        categoryRepository.save(toCategory);

        return new ResponseEntity(getCategory(categoryId), HttpStatus.OK);
    }

    @GetMapping("/delete/{id}/{categoryId}")
    public ResponseEntity deletego(@PathVariable Long id, @PathVariable Long categoryId) {
        Card card = getCard(id);
        cardRepository.delete(card);
        Category category = getCategory(categoryId);
        categoryRepository.save(category);
        return new ResponseEntity(category, HttpStatus.OK);
    }

    @GetMapping("/add/{categoryId}")
    public ResponseEntity addgo(@PathVariable Long categoryId){
        Card card = new Card("새거", "택배언제와");
        Category category = getCategory(categoryId);
        category.addCard(card);
        categoryRepository.save(category);
        return new ResponseEntity(category, HttpStatus.OK);
    }

    private Card getCard(Long id) {
        return cardRepository.findById(id).orElseThrow(() -> new DataNotFoundException("해당 카드 없음"));
    }

    private Category getCategory(Long id) {
        return categoryRepository.findById(id).orElseThrow(() -> new DataNotFoundException("해당 카테고리 없음"));
    }

    @ExceptionHandler
    @ResponseStatus(HttpStatus.NOT_FOUND)
    private String catchDataNotFoundException(DataNotFoundException e) {
        return e.getMessage();
    }
}
