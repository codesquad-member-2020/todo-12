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
        Card card = getCard(id);
        return new ResponseEntity(card, HttpStatus.OK);
    }

    @PostMapping("/create/{categoryId}")
    public ResponseEntity create(@PathVariable Long categoryId, @RequestBody String title, @RequestBody String content) {
        Category category = getCategory(categoryId);
        Card card = new Card(title, content);
        category.addCard(card);
        categoryRepository.save(category);
        return new ResponseEntity(card, HttpStatus.OK);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity update(@PathVariable Long id, @RequestBody String content) {
        Card card = getCard(id);
        card.update(content);
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
