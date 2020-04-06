package dev.codesquad.java.todo12;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CardController {
    Logger logger = LoggerFactory.getLogger(CardController.class);

    @Autowired
    private CardRepository cardRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @GetMapping("/")
    public Card create() {
        Category category = categoryRepository.findById(1L).get();
        category.addCard(new Card("밥먹기"));
        categoryRepository.save(category);

        logger.info(">>> {}", category.toString());

        return cardRepository.findById(2L).orElseThrow(null);
    }
}
