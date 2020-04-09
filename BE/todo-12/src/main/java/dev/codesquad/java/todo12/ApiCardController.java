package dev.codesquad.java.todo12;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class ApiCardController {
    Logger logger = LoggerFactory.getLogger(ApiCardController.class);

    @Autowired
    CategoryRepository categoryRepository;

    @Autowired
    CardRepository cardRepository;

    @GetMapping("/view/{categoryId}")
    public Category view(@PathVariable Long categoryId) {
        Category category = categoryRepository.findById(categoryId).orElseThrow(null);
        return category;
    }

    //Post
    @GetMapping("/create/{categoryId}/card")
    public Category create(@PathVariable Long categoryId) {
        Category category = categoryRepository.findById(categoryId).orElseThrow(null);
        Card card = new Card("input_title","input_content");
        category.addCard(card);
        categoryRepository.save(category);
        return category;
    }

    //Put
    @GetMapping("/update/{categoryId}/card/{id}")
    public Category update(@PathVariable Long categoryId,@PathVariable Long id) {
        Card card = cardRepository.findById(id).orElseThrow(null);
        card.update("input_content");
        cardRepository.save(card);
        Category category = categoryRepository.findById(categoryId).orElseThrow(null);
        return category;
    }

    @GetMapping("/delete/{name}/card/{id}")
    public Category delete(@PathVariable String name, @PathVariable Long id) {
        Card card = cardRepository.findById(id).orElseThrow(null);
        cardRepository.delete(card);
        Category category = categoryRepository.findCategoryByName(name).orElseThrow(null);
        return category;
    }
}
