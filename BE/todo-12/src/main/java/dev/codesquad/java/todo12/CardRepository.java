package dev.codesquad.java.todo12;

import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Optional;

public interface CardRepository extends CrudRepository<Card, Long> {
//    @Query("Select * from card where card.deleted = false and card.category = :id")
//    Optional<List<Card>> findCardsByIdDeletedFalse(Long id);
//
//    @Query("Select * from card where card.deleted = false and id = :id")
//    Optional<Card> findByIdDeletedFalse(Long id);

    @Query("Select * from card where card.category = :id")
    Optional<List<Card>> findAllById(Long id);
}
