package dev.codesquad.java.todo12;

import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Optional;

public interface CategoryRepository extends CrudRepository<Category, Long> {
//    @Query("Select * from category left outer join card on category.id = card.category" +
//            " where card.deleted = false and category.id = :id")
//    Optional<List<Card>> findByIdDeletedFalse(Long id);
//
//    @Query("Select * from category left join card on category.id = card.category" +
//            " where card.deleted = false and card.category = 2")
//    Optional<List<Card>> findAllDeletedFalse();
//    // Category 로 반환 어떻게 할까?

    @Query("Select * from category where category.deleted = false and id = :id")
    Optional<Category> findByIdDeletedFalse(Long id);

    @Query("Select * from category where category.deleted = false")
    Optional<List<Category>> findAllByDeletedFalse();

    @Query("Select name from category where category.deleted = false and id = :id")
    Optional<String> findNameById(Long id);
}
