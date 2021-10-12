package de.huj.notanothertodo.repository;

import de.huj.notanothertodo.model.UserDao;
import org.springframework.data.repository.CrudRepository;


public interface UserRepository extends CrudRepository<UserDao, Integer> {
    UserDao findByUsername(String username);
}
