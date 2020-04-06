package dev.codesquad.java.todo12;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;

import java.util.HashSet;
import java.util.Set;

@Getter @Setter
public class Category {
    @Id
    private Long id;
    private String name;

    private Set<Card> cards = new HashSet<>();

    public void addCard(Card card) {
        cards.add(card);
    }

    @Override
    public String toString() {
        return "Category{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", cards=" + cards +
                '}';
    }
}
