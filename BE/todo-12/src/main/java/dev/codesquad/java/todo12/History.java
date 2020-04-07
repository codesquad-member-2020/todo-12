package dev.codesquad.java.todo12;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;

@Getter @Setter
public class History {
    @Id
    private Long id;
    private String userId;
    private String action;
    private String title;
    private String fromCategory;
    private String toCategory;

    public History(String userId, String action, String title, String fromCategory, String toCategory) {
        this.userId = userId;
        this.action = action;
        this.title = title;
        this.fromCategory = fromCategory;
        this.toCategory = toCategory;
    }
}
