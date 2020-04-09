package dev.codesquad.java.todo12;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/category")
public class ApiCategoryController {
    Logger logger = LoggerFactory.getLogger(ApiCategoryController.class);

    @Autowired
    CategoryRepository categoryRepository;

    @GetMapping("")
    public ResponseEntity viewAll() {
        return new ResponseEntity(categoryRepository.findAll(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity view(@PathVariable Long id) {
        Category category = getCategory(id);
        return new ResponseEntity(category, HttpStatus.OK);
    }

    @GetMapping("/update/{id}")
    public ResponseEntity update(@PathVariable Long id) {
        Category category = getCategory(id);
        category.update("input_category_name");
        categoryRepository.save(category);
        return new ResponseEntity(category, HttpStatus.OK);
    }

    // Post
    @GetMapping("/create")
    public ResponseEntity create() {
        Category category = new Category("input_category_name");
        categoryRepository.save(category);
        return new ResponseEntity(category, HttpStatus.OK);
    }

    // Delete
    @GetMapping("/delete/{id}")
    public ResponseEntity delete(@PathVariable Long id) {
        Category category = getCategory(id);
        category.delete();
        categoryRepository.save(category);
        return new ResponseEntity(category, HttpStatus.OK);
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
