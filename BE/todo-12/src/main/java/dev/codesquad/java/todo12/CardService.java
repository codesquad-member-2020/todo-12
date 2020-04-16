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
public class CardService {
    private Logger logger = LoggerFactory.getLogger(CardService.class);

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private CardRepository cardRepository;

    @Autowired
    private HistoryRepository historyRepository;

    @Autowired
    private TokenService tokenService;

    @Transactional
    public Card viewCard(Long id) {
        return getCard(id);
    }

    @Transactional
    public Card createCard(Long categoryId, HashMap<String, String> cardInfo) {
        Category category = getCategory(categoryId);
        Card card = new Card(cardInfo.get("title"), cardInfo.get("content"));
        category.addCard(card);
        categoryRepository.save(category);
        category = getCategory(categoryId);
        card = category.getLastCard();
        logHistory(ADD, card.getTitle(), card.getContent(), null, category.getName());
        return card;
    }

    @Transactional
    public Card updateCard(Long id, HashMap<String, String> cardInfo) {
        Card card = getCard(id);
        card.update(cardInfo.get("title"), cardInfo.get("content"));
        cardRepository.save(card);
        card = getCard(id);
        logHistory(UPDATE, card.getTitle(), card.getContent(), null, getCategoryName(card.getCategoryId()));
        return card;
    }

    @Transactional
    public void deleteCard(Long id) {
        Card card = getCard(id);
        cardRepository.delete(card);
        logHistory(REMOVE, card.getTitle(), card.getContent(), null, getCategoryName(card.getCategoryId()));
    }

    @Transactional
    public Card moveCard(Long id, Long categoryId, Integer categoryKey) {
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
        logHistory(MOVE, card.getTitle(), card.getContent(), fromCategory.getName(), toCategory.getName());
        return card;
    }

    private Card getCard(Long id) {
        return cardRepository.findById(id).orElseThrow(() -> new DataNotFoundException(NO_CARD));
    }

    private Category getCategory(Long id) {
        return categoryRepository.findByIdDeletedFalse(id).orElseThrow(() -> new DataNotFoundException(NO_CATEGORY));
    }

    private String getCategoryName(Long id) {
        return categoryRepository.findNameById(id).orElseThrow(() -> new DataNotFoundException(NO_CATEGORY));
    }

    private String getUserId() {
        return tokenService.getUserId();
    }

    private void logHistory(String action, String cardTitle, String cardContent, String fromCategory, String toCategory) {
        History history = new History(getUserId(), action, cardTitle, cardContent, fromCategory, toCategory);
        historyRepository.save(history);
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
            throw new DataNotFoundException(WRONG_CATEGORY_KEY);
        }
    }
}
