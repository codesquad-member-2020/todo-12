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
    private Logger logger = LoggerFactory.getLogger(ApiCategoryController.class);

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private KanbanRepository kanbanRepository;

    @GetMapping("")
    public ResponseEntity viewAll() {
        return new ResponseEntity(getCategories(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity view(@PathVariable Long id) {
        Category category = getCategory(id);
        return new ResponseEntity(category, HttpStatus.OK);
    }
// 버그 잡는중
//    @PostMapping("/create")
//    public ResponseEntity create(@RequestBody HashMap<String, String> categoryInfo) {
//        Category category = new Category(categoryInfo.get("name"));
//        Kanban kanban = getKanban(1L);
//        logger.info("4");
//        kanban.addCategory(category);
//        logger.info("3 /// {}", category);
//        kanbanRepository.save(kanban);
//        logger.info("2"); // here
//        category = kanban.getLastCategory();
//        logger.info("1");
//        return new ResponseEntity(category, HttpStatus.OK);
//    }

    @PutMapping("/{id}")
    public ResponseEntity update(@PathVariable Long id, @RequestBody HashMap<String, String> categoryInfo) {
        Category category = getCategory(id);
        category.update(categoryInfo.get("name"));
        categoryRepository.save(category);
        category = getCategory(id);
        return new ResponseEntity(category, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity delete(@PathVariable Long id) {
        Category category = getCategory(id);
        category.delete();
        categoryRepository.save(category);
        return new ResponseEntity("OK", HttpStatus.OK);
    }

    private Category getCategory(Long id) {
        return categoryRepository.findByIdDeletedFalse(id).orElseThrow(() -> new DataNotFoundException("해당 카테고리 없음"));
    }

    private List<Category> getCategories() {
        return categoryRepository.findCategoriesByIdDeletedFalse().orElseThrow(() -> new DataNotFoundException("카테고리 없음"));
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
