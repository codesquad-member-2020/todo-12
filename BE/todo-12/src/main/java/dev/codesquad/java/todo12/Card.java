package dev.codesquad.java.todo12;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;

import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;

@Getter @Setter
public class Card {
    @Id
    private Long id;
    @JsonIgnore
    private Long category;
    private Integer categoryKey;
    private String title;
    private String content;
    private String author;
    private String modifiedTime;

    public Card(String title, String content) {
        this.title = title;
        this.content = content;
        this.author = null;
        this.modifiedTime = seoulTime();
    }

    private static String seoulTime() {
        return ZonedDateTime.now(ZoneId.of("Asia/Seoul")).format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
    }

    public void moveCard(Long category, Integer categoryKey) {
        this.category = category;
        this.categoryKey = categoryKey;
        this.modifiedTime = seoulTime();
    }

    public int getCategoryKey() {
        return categoryKey;
    }

    @JsonIgnore
    public Long getCategoryId() {
        return category;
    }

    public String getTitle() {
        return title;
    }

    public String getContent() {
        return content;
    }

    public boolean IsIncreasedCategoryKey(Integer categoryKey) {
        return this.categoryKey < categoryKey;
    }

    public boolean IsDecreasedCategoryKey(Integer categoryKey) {
        return this.categoryKey > categoryKey;
    }

    public void update(String title, String content) {
        this.title = title;
        this.content = content;
        this.modifiedTime = seoulTime();
    }

    @Override
    public String toString() {
        return "Card{" +
                "id=" + id +
                ", category=" + category +
                ", categoryKey=" + categoryKey +
                ", title='" + title + '\'' +
                ", content='" + content + '\'' +
                ", author='" + author + '\'' +
                ", modifiedTime='" + modifiedTime + '\'' +
                '}';
    }
}
