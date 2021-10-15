package de.huj.notanothertodo.repository;

import de.huj.notanothertodo.model.User;
import org.springframework.data.repository.CrudRepository;


public interface UserRepository extends CrudRepository<User, Integer> {
    User findByUsername(String username);
}
