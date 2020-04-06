package dev.codesquad.java.todo12;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;

@Getter @Setter
public class Card {
    @Id
    private Long id;
    private String content;

    public Card(String content) {
        this.content = content;
    }
}
