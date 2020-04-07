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

    public Category(String name) {
        this.name = name;
        this.cardsCount = 3;
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
                '}';
    }
}
