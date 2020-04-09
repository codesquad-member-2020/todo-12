package dev.codesquad.java.todo12;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/card")
public class ApiCardController {
    Logger logger = LoggerFactory.getLogger(ApiCardController.class);

    @Autowired
    CategoryRepository categoryRepository;

    @Autowired
    CardRepository cardRepository;

    @GetMapping("/{id}")
    public Card view(@PathVariable Long id) {
        Card card = cardRepository.findById(id).orElseThrow(null);
        return card;
    }

    //Post
    @GetMapping("/create/{categoryId}")
    public Card create(@PathVariable Long categoryId) {
        Category category = categoryRepository.findById(categoryId).orElseThrow(null);
        Card card = new Card("input_title","input_content");
        category.addCard(card);
        categoryRepository.save(category);
        return card;
    }

    //Put
    @GetMapping("/update/{id}")
    public Card update(@PathVariable Long id) {
        Card card = cardRepository.findById(id).orElseThrow(null);
        card.update("input_content");
        cardRepository.save(card);
        return card;
    }

    @GetMapping("/delete/{name}/card/{id}")
    public Category delete(@PathVariable String name, @PathVariable Long id) {
        Card card = cardRepository.findById(id).orElseThrow(null);
        cardRepository.delete(card);
        Category category = categoryRepository.findCategoryByName(name).orElseThrow(null);
        return category;
    }
}
