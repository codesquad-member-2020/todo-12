package dev.codesquad.java.todo12;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping("/category")
public class ApiCategoryController {
    Logger logger = LoggerFactory.getLogger(ApiCategoryController.class);

    @Autowired
    CardRepository cardRepository;

    @Autowired
    CategoryRepository categoryRepository;

    @Autowired
    KanbanRepository kanbanRepository;

    @GetMapping("")
    public ResponseEntity viewAll() {
        return new ResponseEntity(getKanban(1L), HttpStatus.OK);
        //return new ResponseEntity(categoryRepository.findAll(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity view(@PathVariable Long id) {
        Category category = getCategory(id);
        return new ResponseEntity(category, HttpStatus.OK);
    }

//    @PostMapping("/create")
//    public ResponseEntity create(@RequestBody HashMap<String, String> categoryInfo) {
//        Category category = new Category(categoryInfo.get("name"));
//        Kanban kanban = getKanban(1L);
//        logger.info("4");
//        kanban.addCategory(category);
//        logger.info("3");
//        kanbanRepository.save(kanban);
//        logger.info("2"); // here
//        category = kanban.getLastCategory();
//        logger.info("1");
//        return new ResponseEntity(category, HttpStatus.OK);
//    }

    @PutMapping("/update/{id}")
    public ResponseEntity update(@PathVariable Long id, @RequestBody HashMap<String, String> categoryInfo) {
        Category category = getCategory(id);
        category.update(categoryInfo.get("name"));
        categoryRepository.save(category);
        category = getCategory(id);
        return new ResponseEntity(category, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity delete(@PathVariable Long id) {
        Category category = getCategory(id);
        category.delete();
        categoryRepository.save(category);
        return new ResponseEntity(category, HttpStatus.OK);
    }

    private Category getCategory(Long id) {
        return categoryRepository.findById(id).orElseThrow(() -> new DataNotFoundException("해당 카테고리 없음"));
    }

    private List<Card> getCardList(Long id) {
        return cardRepository.findCardsByIdDeletedFalse(id).orElseThrow(() -> new DataNotFoundException("해당 카드 리스트 없음"));
    }

    private Kanban getKanban(Long id) {
        return kanbanRepository.findById(id).orElseThrow(() -> new DataNotFoundException("해당 칸반 없음"));
    }

    @ExceptionHandler
    @ResponseStatus(HttpStatus.NOT_FOUND)
    private String catchDataNotFoundException(DataNotFoundException e) {
        return e.getMessage();
    }
}
