package dev.codesquad.java.todo12;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CardController {
    @Autowired
    private CardRepository cardRepository;

    @GetMapping("/")
    public Card create() {
        Card card = new Card("밥먹기");
        cardRepository.save(card);

        return cardRepository.findById(2L).orElseThrow(null);
    }
}
