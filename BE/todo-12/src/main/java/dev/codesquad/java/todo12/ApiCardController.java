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

    @GetMapping("/create/{name}/card")
    public Category create(@PathVariable String name) {
        logger.info("result: {}", name);
        Category category = cardRepository.findCategoryByName(name).orElseThrow(null);
        Card card = new Card("test","test","test");
        category.addCard(card);
        categoryRepository.save(category);
        return category;
    }

    @GetMapping("/update/{name}/card/{id}/{content}")
    public Category update(@PathVariable String name, @PathVariable Long id, @PathVariable String content) {
        Card card = cardRepository.findById(id).orElseThrow(null);
        card.update(content);
        cardRepository.save(card);
        Category category = cardRepository.findCategoryByName(name).orElseThrow(null);
        return category;
    }

    @GetMapping("/delete/{name}/card/{id}")
    public Category delete(@PathVariable String name, @PathVariable Long id) {
        Card card = cardRepository.findById(id).orElseThrow(null);
        cardRepository.delete(card);
        Category category = cardRepository.findCategoryByName(name).orElseThrow(null);
        return category;
    }
}
