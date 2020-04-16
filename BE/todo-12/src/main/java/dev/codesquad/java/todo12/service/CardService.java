package dev.codesquad.java.todo12.service;

import dev.codesquad.java.todo12.*;
import dev.codesquad.java.todo12.JWT.JwtUtil;
import dev.codesquad.java.todo12.Repository.CardRepository;
import dev.codesquad.java.todo12.Repository.CategoryRepository;
import dev.codesquad.java.todo12.Repository.LogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.List;

@Service
public class CardService {

    @Autowired
    CategoryRepository categoryRepository;
    @Autowired
    CardRepository cardRepository;
    @Autowired
    JwtUtil jwtUtil;
    @Autowired
    LogRepository logRepository;

    public ResponseEntity createCard(Long categoryId, @RequestBody HashMap<String, String> cardInfo, HttpServletRequest request) {

        Category category = getCategory(categoryId);
        Card card = new Card(cardInfo.get("title"), cardInfo.get("content"));
        category.addCard(card);
        categoryRepository.save(category);
        category = getCategory(categoryId);
        card = category.getLastCard();

        String authorName = getAuthorName(request);
        String toCategoryName = categoryRepository.findById(categoryId).get().getName();
        Log log = new Log(authorName, cardInfo.get("title"), toCategoryName, toCategoryName, "added");
//        kanban.addLog(log);
//        System.out.println(kanban.getHistory().toString());
//        kanbanRepository.save(kanban);
        logRepository.save(log);
        return new ResponseEntity(card, HttpStatus.OK);
    }

    public ResponseEntity updateCard(@PathVariable Long cardId, @RequestBody HashMap<String, String> cardInfo, HttpServletRequest request) {
        Card card = getCard(cardId);
        card.update(cardInfo.get("title"), cardInfo.get("content"));
        Long categoryId = card.getCategory();
        String fromCategoryName = findCategoryNameByCategoryId(categoryId);
        cardRepository.save(card);
        card = getCard(cardId);

        String authorName = getAuthorName(request);
        Log log = new Log(authorName, cardInfo.get("title"), fromCategoryName, fromCategoryName, "updated");
        logRepository.save(log);

        return new ResponseEntity(card, HttpStatus.OK);
    }

    public ResponseEntity deleteCard(@PathVariable Long id, HttpServletRequest request) {
        Card card = getCard(id);
        cardRepository.delete(card);

        String authorName = getAuthorName(request);
        String cardTitle = card.getTitle();
        String fromCategory = findCategoryNameByCategoryId(card.getCategory());
        Log log = new Log(authorName, cardTitle, fromCategory,fromCategory,"deleted");
        logRepository.save(log);
        return new ResponseEntity("OK", HttpStatus.OK);
    }

    public ResponseEntity moveCard(@PathVariable Long id, @PathVariable Long categoryId, @PathVariable Integer categoryKey, HttpServletRequest request) {
        Card card = getCard(id);
        card.moveCard(categoryId, categoryKey);
        cardRepository.save(card);
        Category toCategory = getCategory(categoryId);
        categoryRepository.save(toCategory);
        Card movedCard = getCard(id);

        checkCategoryKeyValidation(toCategory, categoryKey);
        swapCardIfCategoryKeyChanged(card, toCategory, movedCard.getCategoryKey());
        categoryRepository.save(toCategory);
        card = getCard(id);

        String authorName = getAuthorName(request);
        String cardTitle = card.getTitle();
        String fromCategory = findCategoryNameByCategoryId(card.getCategory());

        Log log = new Log(authorName, cardTitle, fromCategory, fromCategory, "moved" );
        logRepository.save(log);
        return new ResponseEntity(card, HttpStatus.OK);
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


    public Card getCard(Long id) {
        return cardRepository.findById(id).orElseThrow(() -> new DataNotFoundException("해당 카드 없음"));
    }

    public Category getCategory(Long id) {
        return categoryRepository.findByIdDeletedFalse(id).orElseThrow(() -> new DataNotFoundException("해당 카테고리 없음"));
    }

    public String findCategoryNameByCategoryId(Long id) {
        if (id == 1) {
            return "Todo";
        } else if (id == 2) {
            return "InProgress";
        } else if (id == 3) {
            return "Done";
        } return "";
    }

    public String getAuthorName(HttpServletRequest request) {
            String token = request.getHeader("Authorization");
            String authorName = jwtUtil.extractUsername(token);
            return authorName;
        }
}
