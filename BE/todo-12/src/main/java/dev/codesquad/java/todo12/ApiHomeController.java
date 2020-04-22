package dev.codesquad.java.todo12;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ApiHomeController {
    private Logger logger = LoggerFactory.getLogger(ApiHomeController.class);

    @Autowired
    private CategoryService categoryService;

    @Autowired
    private HistoryRepository historyRepository;

    @GetMapping("/")
    public ResponseEntity home() {
        return new ResponseEntity(categoryService.viewAllCategories(), HttpStatus.OK);
    }

    @GetMapping("/history")
    public ResponseEntity history() {
        return new ResponseEntity(historyRepository.findAll(), HttpStatus.OK);
    }
}
