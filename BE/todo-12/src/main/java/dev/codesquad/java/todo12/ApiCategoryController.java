package dev.codesquad.java.todo12;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/category")
public class ApiCategoryController {
    Logger logger = LoggerFactory.getLogger(ApiCategoryController.class);

    @Autowired
    CategoryRepository categoryRepository;

    @GetMapping("/{id}")
    public Category view(@PathVariable Long id) {
        Category category = categoryRepository.findById(id).orElseThrow(null);
        return category;
    }

    @GetMapping("/update/{id}")
    public Category update(@PathVariable Long id) {
        Category category = categoryRepository.findById(id).orElseThrow(null);
        category.update("input_category_name");
        categoryRepository.save(category);
        return category;
    }
}
