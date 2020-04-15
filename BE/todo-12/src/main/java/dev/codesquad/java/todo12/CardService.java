package dev.codesquad.java.todo12;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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

    private Card getCard(Long id) {
        return cardRepository.findById(id).orElseThrow(() -> new DataNotFoundException(NO_CARD));
    }
}
