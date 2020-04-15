package dev.codesquad.java.todo12;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Getter @Setter
public class Category {
    @Id
    private Long id;
    private String name;
    private List<Card> cards = new ArrayList<>();
    @JsonIgnore
    private boolean deleted;

    public Category(String name) {
        this.name = name;
        this.deleted = false;
    }

    public List<Card> getCards() {
        return cards;
    }

    @JsonIgnore
    public Card getLastCard() {
        return cards.get(cards.size() - 1);
    }

    public void swapWithBeforeCard(Integer categoryKey) {
        Collections.swap(cards, categoryKey - 1, categoryKey);
    }

    public void swapWithAfterCard(Integer categoryKey) {
        Collections.swap(cards, categoryKey + 1, categoryKey);
    }

    public void addCard(int index, Card card) {
        cards.add(index, card);
    }

    public void addCard(Card card) {
        cards.add(card);
    }

    public void delete() {
        this.deleted = true;
    }

    public void update(String name) {
        this.name = name;
    }

    @Override
    public String toString() {
        return "Category{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", cards=" + cards +
                ", deleted=" + deleted +
                '}';
    }
}
