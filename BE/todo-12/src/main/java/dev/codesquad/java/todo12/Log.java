package dev.codesquad.java.todo12;

import org.springframework.data.annotation.Id;

import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;

public class Log {
    @Id
    private Long Id;

    private String time;
    private String author;
    private String title;
    private String fromCategory;
    private String toCategory;
    private String action;

    @Override
    public String toString() {
        return "Log{" +
                "Id=" + Id +
                ", createTime='" + time + '\'' +
                ", author='" + author + '\'' +
                ", title='" + title + '\'' +
                ", fromCategory='" + fromCategory + '\'' +
                ", toCategory='" + toCategory + '\'' +
                ", action='" + action + '\'' +
                '}';
    }

    private static String seoulTime() {
        return ZonedDateTime.now(ZoneId.of("Asia/Seoul")).format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
    }

    public Log(String author, String title, String fromCategory, String toCategory, String action) {
        this.author = author;
        this.title = title;
        this.fromCategory = fromCategory;
        this.toCategory = toCategory;
        this.action = action;
        this.time = seoulTime();
    }

    public Long getId() {
        return Id;
    }

    public String getTime() {
        return time;
    }

    public String getAuthor() {
        return author;
    }

    public String getTitle() {
        return title;
    }

    public String getFromCategory() {
        return fromCategory;
    }

    public String getToCategory() {
        return toCategory;
    }

    public String getAction() {
        return action;
    }
}
