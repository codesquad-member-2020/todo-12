package dev.codesquad.java.todo12;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.util.HashMap;
import java.util.List;

import static dev.codesquad.java.todo12.StaticApiUtils.*;

@Service
public class CardService {
    private Logger logger = LoggerFactory.getLogger(ApiCardController.class);

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private CardRepository cardRepository;

    @Autowired
    private HistoryRepository historyRepository;

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

    private Card getCard(Long id) {
        return cardRepository.findById(id).orElseThrow(() -> new DataNotFoundException(NO_CARD));
    }

    private Category getCategory(Long id) {
        return categoryRepository.findByIdDeletedFalse(id).orElseThrow(() -> new DataNotFoundException(NO_CATEGORY));
    }

    private String getCategoryName(Long id) {
        return categoryRepository.findNameById(id).orElseThrow(() -> new DataNotFoundException(NO_CATEGORY));
    }

    private void logHistory(String action, String cardTitle, String cardContent, String fromCategory, String toCategory) {
        History history = new History(action, cardTitle, cardContent, fromCategory, toCategory);
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

    @ExceptionHandler
    @ResponseStatus(HttpStatus.NOT_FOUND)
    private String catchDataNotFoundException(DataNotFoundException e) {
        return e.getMessage();
    }
}
