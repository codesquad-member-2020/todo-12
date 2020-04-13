package dev.codesquad.java.todo12;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MockUpController {
    Logger logger = LoggerFactory.getLogger(MockUpController.class);

    @Autowired
    private CardRepository cardRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @GetMapping("/mock")
    public Kanban create() {
        Category category = categoryRepository.findById(1L).get();
        category.addCard(new Card("제목1", "상세페이지 API 정리"));
        category.addCard(new Card(null,"github 공부하기"));
        categoryRepository.save(category);
        logger.info(">>> {}", category.toString());

        Category category1 = categoryRepository.findById(2L).get();
        category1.addCard(new Card("제목3", "데모환경 구성"));
        category1.addCard(new Card("제목4","개발하기"));
        category1.addCard(new Card(null,"리뷰하기"));
        categoryRepository.save(category1);
        logger.info(">>> {}", category1.toString());

        Category category2 = categoryRepository.findById(3L).get();
        category2.addCard(new Card("제목6", "데일리 스크럼"));
        categoryRepository.save(category2);
        logger.info(">>> {}", category2.toString());

        Kanban kanban = new Kanban();
        kanban.addCategory(category);
        kanban.addCategory(category1);
        kanban.addCategory(category2);

        return kanban;
    }

    @GetMapping("/move/{categoryId}/{id}/{index}")
    public ResponseEntity move2(@PathVariable Long categoryId, @PathVariable Long id, @PathVariable int index) {
        Category toCategory = getCategory(categoryId);
        Card card = getCard(id);
        cardRepository.delete(card);
        toCategory.addCard(index, card);
        categoryRepository.save(toCategory);
        return new ResponseEntity(card, HttpStatus.OK);
    }

    @GetMapping("/add/{categoryId}")
    public ResponseEntity addTest(@PathVariable Long categoryId){
        Card card = new Card("새거", "택배언제와");
        Category category = getCategory(categoryId);
        category.addCard(card);
        categoryRepository.save(category);

        category = getCategory(categoryId);
        card = category.getLastCard();

        return new ResponseEntity(card, HttpStatus.OK);
    }

    @GetMapping("/delete/{id}")
    public ResponseEntity deleteTest(@PathVariable Long id) {
        Card card = getCard(id);
        card.delete();
        cardRepository.save(card);
        return new ResponseEntity(card, HttpStatus.OK);
    }

    @GetMapping("/")
    public ResponseEntity test() {
        return new ResponseEntity(categoryRepository.findAllDeletedFalse(), HttpStatus.OK);
    }

    private Card getCard(Long id) {
        return cardRepository.findByIdOnlyDeletedFalse(id).orElseThrow(() -> new DataNotFoundException("해당 카드 없음"));
    }

    private Category getCategory(Long id) {
        return categoryRepository.findById(id).orElseThrow(() -> new DataNotFoundException("해당 카테고리 없음"));
    }
}
