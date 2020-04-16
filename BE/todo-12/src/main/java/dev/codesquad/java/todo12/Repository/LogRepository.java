package dev.codesquad.java.todo12.Repository;

import dev.codesquad.java.todo12.Category;
import dev.codesquad.java.todo12.Log;
import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Optional;

public interface LogRepository extends CrudRepository<Log, Long> {

    @Query("SELECT * FROM LOG WHERE AUTHOR = :authorName" )
    List<Log> findAllByAuthorName(String authorName);

}
