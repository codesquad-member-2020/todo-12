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
@RequestMapping("/category")
public class ApiCategoryController {
    private Logger logger = LoggerFactory.getLogger(ApiCategoryController.class);

    @Autowired
    private CategoryService categoryService;

    @GetMapping("")
    public ResponseEntity viewAll() {
        return new ResponseEntity(categoryService.viewAllCategories(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity view(@PathVariable Long id) {
        Category category = categoryService.viewCategory(id);
        return new ResponseEntity(category, HttpStatus.OK);
    }

    @PostMapping("/create")
    public ResponseEntity create(@RequestBody HashMap<String, String> categoryInfo) {
        Category category = categoryService.createCategory(categoryInfo);
        return new ResponseEntity(category, HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity update(@PathVariable Long id, @RequestBody HashMap<String, String> categoryInfo) {
        Category category = categoryService.updateCategory(id, categoryInfo);
        return new ResponseEntity(category, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity delete(@PathVariable Long id) {
        categoryService.deleteCategory(id);
        return new ResponseEntity(OK, HttpStatus.OK);
    }
}
