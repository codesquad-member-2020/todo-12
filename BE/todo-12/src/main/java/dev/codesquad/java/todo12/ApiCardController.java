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
    Logger logger = LoggerFactory.getLogger(ApiCardController.class);

    @Autowired
    CategoryRepository categoryRepository;

    @Autowired
    CardRepository cardRepository;

    @GetMapping("/{id}")
    public ResponseEntity view(@PathVariable Long id) {
        Card card = getCard(id);
        return new ResponseEntity(card, HttpStatus.OK);
    }

    @PostMapping("/create/{categoryId}")
    public ResponseEntity create(@PathVariable Long categoryId, @RequestBody HashMap<String, String> cardInfo) {
        Category category = getCategory(categoryId);
        Card card = new Card(cardInfo.get("title"), cardInfo.get("content"));
        category.addCard(card);
        categoryRepository.save(category);
        return new ResponseEntity(card, HttpStatus.OK);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity update(@PathVariable Long id, @RequestBody HashMap<String, String> cardInfo) {
        Card card = getCard(id);
        card.update(cardInfo.get("title"), cardInfo.get("content"));
        cardRepository.save(card);
        return new ResponseEntity(card, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity delete(@PathVariable Long id) {
        Card card = getCard(id);
        card.delete();
        cardRepository.save(card);
        return new ResponseEntity(card, HttpStatus.OK);
    }

    @PutMapping("/move/{categoryId}/{id}")
    public ResponseEntity move(@PathVariable Long categoryId, @PathVariable Long id, @RequestBody HashMap<String, Integer> cardsIndex) {
        Card card = getCard(id);
        card.moveCard(categoryId, cardsIndex.get("categoryKey"));
        cardRepository.save(card);

        // 카드가 이동 된 카테고리의 카드 리스트 재정렬
        // categoryKey 동일한 경우 id 순서에 따라 정렬된다.
        Category toCategory = getCategory(categoryId);
        categoryRepository.save(toCategory);

        // 변경된 categoryKey 정보 가져오기
        // 카드리스트가 categoryRepository.save() 후 정렬되어 categoryKey 값이 id에 따라 변경된다.
        Card movedCard = getCard(id);

        checkCategoryKeyValidation(toCategory, cardsIndex.get("categoryKey"));
        swapCardIfCategoryKeyChanged(card, toCategory, movedCard.getCategoryKey());
        categoryRepository.save(toCategory);
        return new ResponseEntity(getCard(id), HttpStatus.OK);
    }

    @GetMapping("/move2/{categoryId}/{id}/{index}")
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
        return new ResponseEntity(category, HttpStatus.OK);
    }

    @GetMapping("/delete/{id}")
    public ResponseEntity deleteTest(@PathVariable Long id) {
        Card card = getCard(id);
        card.delete();
        cardRepository.save(card);
        return new ResponseEntity(card, HttpStatus.OK);
    }

    private Card getCard(Long id) {
        return cardRepository.findByIdOnlyDeletedFalse(id).orElseThrow(() -> new DataNotFoundException("해당 카드 없음"));
    }

    private Category getCategory(Long id) {
        return categoryRepository.findById(id).orElseThrow(() -> new DataNotFoundException("해당 카테고리 없음"));
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
