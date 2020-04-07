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

    @GetMapping("/mockup")
    public Kanban create() {
        Category category = categoryRepository.findById(1L).get();
        category.addCard(new Card("제목1", "상세페이지 API 정리", "web"));
        category.addCard(new Card(null,"github 공부하기", "web"));
        categoryRepository.save(category);
        logger.info(">>> {}", category.toString());

        Category category1 = categoryRepository.findById(2L).get();
        category1.addCard(new Card("제목3", "데모환경 구성", "iOS"));
        category1.addCard(new Card("제목4","개발하기", "iOS"));
        category1.addCard(new Card(null,"리뷰하기", "iOS"));
        categoryRepository.save(category1);
        logger.info(">>> {}", category1.toString());

        Category category2 = categoryRepository.findById(3L).get();
        category2.addCard(new Card("제목6", "데일리 스크럼", "Henry"));
        categoryRepository.save(category2);
        logger.info(">>> {}", category2.toString());

        Kanban kanban = new Kanban();
        kanban.addCategory(category);
        kanban.addCategory(category1);
        kanban.addCategory(category2);

        return kanban;
    }
}
