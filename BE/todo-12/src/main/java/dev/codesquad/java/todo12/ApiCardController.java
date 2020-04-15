package dev.codesquad.java.todo12;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping("/card")
public class ApiCardController {
    private Logger logger = LoggerFactory.getLogger(ApiCardController.class);

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private CardRepository cardRepository;

    @GetMapping("/{id}")
    public ResponseEntity view(@PathVariable Long id) {
        Card card = getCard(id);
        return new ResponseEntity(card, HttpStatus.OK);
    }

    @PostMapping("/{categoryId}")
    public ResponseEntity create(@PathVariable Long categoryId, @RequestBody HashMap<String, String> cardInfo) {
        Category category = getCategory(categoryId);
        Card card = new Card(cardInfo.get("title"), cardInfo.get("content"));
        category.addCard(card);
        categoryRepository.save(category);
        category = getCategory(categoryId);
        card = category.getLastCard();
        return new ResponseEntity(card, HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity update(@PathVariable Long id, @RequestBody HashMap<String, String> cardInfo) {
        Card card = getCard(id);
        card.update(cardInfo.get("title"), cardInfo.get("content"));
        cardRepository.save(card);
        card = getCard(id);
        return new ResponseEntity(card, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity delete(@PathVariable Long id) {
        Card card = getCard(id);
        cardRepository.delete(card);
        return new ResponseEntity("OK", HttpStatus.OK);
    }

    @PutMapping("/{id}/move/{categoryId}/{categoryKey}")
    public ResponseEntity move(@PathVariable Long id, @PathVariable Long categoryId, @PathVariable Integer categoryKey) {
        Card card = getCard(id);
        Long fromCategoryId = card.getCategoryId();
        card.moveCard(categoryId, categoryKey);
        cardRepository.save(card);

        // 카드가 이동 된 카테고리의 카드 리스트 재정렬
        // categoryKey 동일한 경우 id 순서에 따라 정렬된다.
        Category toCategory = getCategory(categoryId);
        categoryRepository.save(toCategory);

        // 이동 되기 전 카테고리의 카드 리스트도 업데이트 한다.
        Category fromCategory = getCategory(fromCategoryId);
        categoryRepository.save(fromCategory);

        // 변경된 categoryKey 정보 가져오기
        // 카드리스트가 categoryRepository.save() 후 정렬되어 categoryKey 값이 id에 따라 변경된다.
        Card movedCard = getCard(id);

        checkCategoryKeyValidation(toCategory, categoryKey);
        swapCardIfCategoryKeyChanged(card, toCategory, movedCard.getCategoryKey());
        categoryRepository.save(toCategory);
        card = getCard(id);

        return new ResponseEntity(card, HttpStatus.OK);
    }

    private Card getCard(Long id) {
        return cardRepository.findById(id).orElseThrow(() -> new DataNotFoundException("해당 카드 없음"));
    }

    private Category getCategory(Long id) {
        return categoryRepository.findByIdDeletedFalse(id).orElseThrow(() -> new DataNotFoundException("해당 카테고리 없음"));
    }

    private void swapCardIfCategoryKeyChanged(Card card, Category category, Integer movedCategoryKey) {
        if (card.IsIncreasedCategoryKey(movedCategoryKey)) {
            category.swapWithBeforeCard(movedCategoryKey);
        }
        if (card.IsDecreasedCategoryKey(movedCategoryKey)) {
            category.swapWithAfterCard(movedCategoryKey);
        }
    }

    private void checkCategoryKeyValidation(Category category, Integer categoryKey) {
        List<Card> cards = category.getCards();
        if (categoryKey > cards.size() - 1) {
            throw new DataNotFoundException("존재하지 않는 카테고리 키");
        }
    }

    @ExceptionHandler
    @ResponseStatus(HttpStatus.NOT_FOUND)
    private String catchDataNotFoundException(DataNotFoundException e) {
        return e.getMessage();
    }
}
