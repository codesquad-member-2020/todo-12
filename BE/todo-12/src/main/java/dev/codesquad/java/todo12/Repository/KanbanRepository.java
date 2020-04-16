package dev.codesquad.java.todo12.Repository;

import dev.codesquad.java.todo12.Kanban;
import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.repository.CrudRepository;
import java.util.Optional;

public interface KanbanRepository extends CrudRepository<Kanban, Long> {
    @Query("Select * from kanban where kanban.id = :id")
    Optional<Kanban> findById(Long id);

    @Query("Update kanban where kanban.id = :id")
    Optional<Kanban> updateById(Long id);
}
