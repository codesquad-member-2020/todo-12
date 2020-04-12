package dev.codesquad.java.todo12;

import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Optional;

public interface CategoryRepository extends CrudRepository<Category, Long> {
    @Query("Select * from category where name = :name")
    Optional<Category> findCategoryByName(String name);

    @Query("Select * from category left join card on category.id = card.category" +
            " where card.deleted = false and category.id = :id")
    Optional<List<Card>> findByIdOnlyDeletedFalse(Long id);

    @Query("Select * from category left outer join card on category.id = card.category" +
            " where card.deleted = false and category.id = 2")
    Optional<List<Card>> findAllDeletedFalse();
}
