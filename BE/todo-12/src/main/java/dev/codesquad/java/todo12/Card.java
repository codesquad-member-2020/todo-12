package dev.codesquad.java.todo12;

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
    private String title;
    private String content;
    private String author;
    private String createTime;
    private String modifiedTime;

    public Card(String title, String content) {
        this.title = title;
        this.content = content;
        this.author = null;
        this.createTime = seoulTime();
        this.modifiedTime = seoulTime();
    }

    private static String seoulTime() {
        return ZonedDateTime.now(ZoneId.of("Asia/Seoul")).format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
    }

    public void update(String content) {
        this.content = content;
    }

    @Override
    public String toString() {
        return "Card{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", content='" + content + '\'' +
                ", author='" + author + '\'' +
                ", createTime=" + createTime +
                ", modifiedTime=" + modifiedTime +
                '}';
    }
}
