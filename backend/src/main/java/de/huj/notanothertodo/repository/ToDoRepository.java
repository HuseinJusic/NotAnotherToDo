package de.huj.notanothertodo.repository;

import de.huj.notanothertodo.model.ToDo;
import de.huj.notanothertodo.model.User;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Optional;

public interface ToDoRepository extends CrudRepository<ToDo, Integer> {
    List<ToDo> findByUser(User user);
    Optional<ToDo> findByUserAndId(User user, long id);
}
