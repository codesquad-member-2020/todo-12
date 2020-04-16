package dev.codesquad.java.todo12;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;

import static dev.codesquad.java.todo12.StaticApiUtils.*;

@RestController
@RequestMapping("/card")
public class ApiCardController {
    private Logger logger = LoggerFactory.getLogger(ApiCardController.class);

    @Autowired
    private CardService cardService;

    @Autowired
    private CategoryRepository categoryRepository;

    @GetMapping("/{id}")
    public ResponseEntity view(@PathVariable Long id) {
        Card card = cardService.viewCard(id);
        return new ResponseEntity(card, HttpStatus.OK);
    }

    @PostMapping("/{categoryId}")
    public ResponseEntity create(@PathVariable Long categoryId, @RequestBody HashMap<String, String> cardInfo) {
        Card card = cardService.createCard(categoryId, cardInfo);
        return new ResponseEntity(card, HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity update(@PathVariable Long id, @RequestBody HashMap<String, String> cardInfo) {
        Card card = cardService.updateCard(id, cardInfo);
        return new ResponseEntity(card, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity delete(@PathVariable Long id) {
        cardService.deleteCard(id);
        return new ResponseEntity(OK, HttpStatus.OK);
    }

    @PutMapping("/{id}/move/{categoryId}/{categoryKey}")
    public ResponseEntity move(@PathVariable Long id, @PathVariable Long categoryId, @PathVariable Integer categoryKey) {
        Card card = cardService.moveCard(id, categoryId, categoryKey);
        return new ResponseEntity(card, HttpStatus.OK);
    }

    @PutMapping("/{id}/move/{categoryId}")
    public ResponseEntity moveToCategory(@PathVariable Long id, @PathVariable Long categoryId) {
        Category category = categoryRepository.findById(categoryId).get();
        Integer cardSize =  category.getCards().size();
        Card card = cardService.moveCard(id, categoryId, cardSize);
        return new ResponseEntity(card, HttpStatus.OK);
    }

    @ExceptionHandler
    @ResponseStatus(HttpStatus.NOT_FOUND)
    private String catchDataNotFoundException(DataNotFoundException e) {
        return e.getMessage();
    }
}
