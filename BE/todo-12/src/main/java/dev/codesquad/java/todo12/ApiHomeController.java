package dev.codesquad.java.todo12;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class ApiHomeController {
    private Logger logger = LoggerFactory.getLogger(ApiHomeController.class);

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private KanbanRepository kanbanRepository;

    @Autowired
    private HistoryRepository historyRepository;

    @GetMapping("/")
    public ResponseEntity home() {
        return new ResponseEntity(getCategories(), HttpStatus.OK);
        //return new ResponseEntity(getKanban(1L), HttpStatus.OK);
    }

    @GetMapping("/history")
    public ResponseEntity history() {
        return new ResponseEntity(historyRepository.findAll(), HttpStatus.OK);
    }

    private List<Category> getCategories() {
        return categoryRepository.findCategoriesByIdDeletedFalse().orElseThrow(() -> new DataNotFoundException("카테고리 없음"));
    }

    private Kanban getKanban() {
        return kanbanRepository.findById(1L).orElseThrow(() -> new DataNotFoundException("해당 칸반 없음"));
    }
}
