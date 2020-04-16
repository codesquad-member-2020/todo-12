package dev.codesquad.java.todo12.Controller;

import dev.codesquad.java.todo12.*;
import dev.codesquad.java.todo12.JWT.JwtUtil;
import dev.codesquad.java.todo12.Repository.CardRepository;
import dev.codesquad.java.todo12.Repository.CategoryRepository;
import dev.codesquad.java.todo12.Repository.KanbanRepository;
import dev.codesquad.java.todo12.Repository.LogRepository;
import dev.codesquad.java.todo12.service.CardService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping("/card")
public class ApiCardController {

    private Logger logger = LoggerFactory.getLogger(ApiCardController.class);

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private CardRepository cardRepository;
    @Autowired
    private KanbanRepository kanbanRepository;
    @Autowired
    private JwtUtil jwtUtil;
    @Autowired
    private LogRepository logRepository;
    @Autowired
    private CardService cardService;

    @GetMapping("/{id}")
    public ResponseEntity view(@PathVariable Long id) {
        Card card = cardService.getCard(id);
        return new ResponseEntity(card, HttpStatus.OK);
    }

    @PostMapping("/{categoryId}")
    public ResponseEntity create(@PathVariable Long categoryId, @RequestBody HashMap<String, String> cardInfo, HttpServletRequest request) {
        return cardService.createCard(categoryId,cardInfo, request);
    }

    @PutMapping("/{id}")
    public ResponseEntity update(@PathVariable Long id, @RequestBody HashMap<String, String> cardInfo,HttpServletRequest request) {
        return cardService.updateCard(id, cardInfo, request);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity delete(@PathVariable Long id, HttpServletRequest request) {
        return cardService.deleteCard(id, request);
    }

    @PutMapping("/{id}/move/{categoryId}/{categoryKey}")
    public ResponseEntity move(@PathVariable Long id, @PathVariable Long categoryId, @PathVariable Integer categoryKey,HttpServletRequest request) {
       return cardService.moveCard(id,categoryId,categoryKey,request);
    }

    @ExceptionHandler
    @ResponseStatus(HttpStatus.NOT_FOUND)
    private String catchDataNotFoundException(DataNotFoundException e) {
        return e.getMessage();
    }

}
