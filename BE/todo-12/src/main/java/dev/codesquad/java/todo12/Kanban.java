package dev.codesquad.java.todo12;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;

import java.util.ArrayList;
import java.util.List;

@Getter @Setter
public class Kanban {
    @Id
    private Long id;
    private List<Category> categories = new ArrayList<>();

//    private List<Log> History = new ArrayList<>();

    public Kanban() {}

    public void addCategory(Category category) {
        categories.add(category);
    }

//    public void addLog(Log log) { History.add(log); }

    @JsonIgnore
    public Category getLastCategory() {
        return categories.get(categories.size() - 1);
    }

    @Override
    public String toString() {
        return "Kanban{" +
                "id=" + id +
                ", categories=" + categories +
                '}';
    }

//    public List<Log> getHistory() { return History; }

//    public void setHistory(List<Log> history) { History = history; }


}
