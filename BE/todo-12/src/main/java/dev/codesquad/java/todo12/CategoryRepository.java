package dev.codesquad.java.todo12;

import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Optional;

public interface CategoryRepository extends CrudRepository<Category, Long> {
    @Query("Select * from category where category.deleted = false and id = :id")
    Optional<Category> findByIdDeletedFalse(Long id);

    @Query("Select * from category where category.deleted = false")
    Optional<List<Category>> findAllByDeletedFalse();

    @Query("Select name from category where category.deleted = false and id = :id")
    Optional<String> findNameById(Long id);
}
