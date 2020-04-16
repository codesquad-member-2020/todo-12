package dev.codesquad.java.todo12.Repository;

import dev.codesquad.java.todo12.User;
import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface UserRepository extends CrudRepository<User, Long> {
    @Query("Select * from user where user_id = :userId")
    Optional<User> findUserByUserID(String userId);

}
