package dev.codesquad.java.todo12;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;

import static dev.codesquad.java.todo12.StaticApiUtils.*;

@Service
public class CategoryService {
    private Logger logger = LoggerFactory.getLogger(CategoryService.class);

    @Autowired
    private CategoryRepository categoryRepository;

    @Transactional
    public List<Category> viewAllCategories() {
        return getAllCategories();
    }

    @Transactional
    public Category viewCategory(Long id) {
        Category category = getCategory(id);
        return category;
    }

    @Transactional
    public Category createCategory(HashMap<String, String> categoryInfo) {
        Category category = new Category(categoryInfo.get("name"));
        categoryRepository.save(category);
        return category;
    }

    @Transactional
    public Category updateCategory(Long id, HashMap<String, String> categoryInfo) {
        Category category = getCategory(id);
        category.update(categoryInfo.get("name"));
        categoryRepository.save(category);
        category = getCategory(id);
        return category;
    }

    @Transactional
    public void deleteCategory(Long id) {
        Category category = getCategory(id);
        category.delete();
        categoryRepository.save(category);
    }

    private Category getCategory(Long id) {
        return categoryRepository.findByIdDeletedFalse(id).orElseThrow(() -> new DataNotFoundException(NO_CATEGORY));
    }

    private List<Category> getAllCategories() {
        return categoryRepository.findAllByDeletedFalse().orElseThrow(() -> new DataNotFoundException(EMPTY_CATEGORY));
    }
}
