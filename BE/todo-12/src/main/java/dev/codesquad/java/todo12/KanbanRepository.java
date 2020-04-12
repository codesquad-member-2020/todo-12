package dev.codesquad.java.todo12;

import org.springframework.data.repository.CrudRepository;

public interface KanbanRepository extends CrudRepository<Kanban, Long> {
}
