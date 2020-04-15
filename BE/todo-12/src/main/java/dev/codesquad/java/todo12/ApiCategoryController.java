package dev.codesquad.java.todo12;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;

import static dev.codesquad.java.todo12.StaticApiUtils.*;

@RestController
@RequestMapping("/category")
public class ApiCategoryController {
    private Logger logger = LoggerFactory.getLogger(ApiCategoryController.class);

    @Autowired
    private CategoryRepository categoryRepository;

    @GetMapping("")
    public ResponseEntity viewAll() {
        return new ResponseEntity(getAllCategories(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity view(@PathVariable Long id) {
        Category category = getCategory(id);
        return new ResponseEntity(category, HttpStatus.OK);
    }

    @PostMapping("/create")
    public ResponseEntity create(@RequestBody HashMap<String, String> categoryInfo) {
        Category category = new Category(categoryInfo.get("name"));
        categoryRepository.save(category);
        return new ResponseEntity(category, HttpStatus.OK);
    }

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
        return new ResponseEntity(OK, HttpStatus.OK);
    }

    private Category getCategory(Long id) {
        return categoryRepository.findByIdDeletedFalse(id).orElseThrow(() -> new DataNotFoundException(NO_CATEGORY));
    }

    private List<Category> getAllCategories() {
        return categoryRepository.findAllByDeletedFalse().orElseThrow(() -> new DataNotFoundException(EMPTY_CATEGORY));
    }

    @ExceptionHandler
    @ResponseStatus(HttpStatus.NOT_FOUND)
    private String catchDataNotFoundException(DataNotFoundException e) {
        return e.getMessage();
    }
}
