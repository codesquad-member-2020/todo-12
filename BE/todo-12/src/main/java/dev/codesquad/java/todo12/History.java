package dev.codesquad.java.todo12;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;

import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;

@Getter @Setter
public class History {
    @Id
    private Long id;
    private String userId;
    private String action;
    private String cardTitle;
    private String cardContent;
    private String fromCategory;
    private String toCategory;
    private String modifiedTime;

    public History() {}

    public History(String userId, String action, String cardTitle, String cardContent, String fromCategory, String toCategory) {
        this.userId = userId;
        this.action = action;
        this.cardTitle = cardTitle;
        this.cardContent = cardContent;
        this.fromCategory = fromCategory;
        this.toCategory = toCategory;
        this.modifiedTime = seoulTime();
    }

    private static String seoulTime() {
        return ZonedDateTime.now(ZoneId.of("Asia/Seoul")).format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
    }

    @Override
    public String toString() {
        return "History{" +
                "id=" + id +
                ", userId='" + userId + '\'' +
                ", action='" + action + '\'' +
                ", cardTitle='" + cardTitle + '\'' +
                ", cardContent='" + cardContent + '\'' +
                ", fromCategory='" + fromCategory + '\'' +
                ", toCategory='" + toCategory + '\'' +
                ", modifiedTime='" + modifiedTime + '\'' +
                '}';
    }
}
