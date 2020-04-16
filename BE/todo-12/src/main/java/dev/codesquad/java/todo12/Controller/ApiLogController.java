package dev.codesquad.java.todo12.Controller;


import dev.codesquad.java.todo12.Kanban;
import dev.codesquad.java.todo12.Repository.KanbanRepository;
import dev.codesquad.java.todo12.Log;
import dev.codesquad.java.todo12.Repository.LogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@RestController
public class ApiLogController {
    @Autowired
    private LogRepository logRepository;

    @GetMapping("/activity")
    public ResponseEntity seeAllActivities() {
        for (Log log : logRepository.findAll()) {
            System.out.println(log);
        }
        return new ResponseEntity(logRepository.findAllByAuthorName("todo12"),HttpStatus.OK);
    }

    @GetMapping("/activity2")
    public List<Log> seeAllActivities2() {
        for (Log log : logRepository.findAll()) {
            System.out.println(log);
        }
        List<Log> logs = (List<Log>) logRepository.findAll();
        return logs;
    }

    @GetMapping("/activity3")
    public Log seeAllActivities3() {

        List<Log> logs = logRepository.findAllByAuthorName("todo12");
        return logRepository.findById(1L).get();
    }


}
