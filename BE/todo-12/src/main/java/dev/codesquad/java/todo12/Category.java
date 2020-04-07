package dev.codesquad.java.todo12;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;

import java.util.ArrayList;
import java.util.List;

@Getter @Setter
public class Category {
    @Id
    private Long id;
    private String name;
    private List<Card> cards = new ArrayList<>();
    private int cardsCount;
    private boolean valid;

    public Category(String name, boolean valid) {
        this.name = name;
        this.cardsCount = 0;
        this.valid = valid;
    }

    public void addCard(Card card) {
        cards.add(card);
    }

    @Override
    public String toString() {
        return "Category{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", cards=" + cards +
                ", cardsCount=" + cardsCount +
                ", valid=" + valid +
                '}';
    }
}
