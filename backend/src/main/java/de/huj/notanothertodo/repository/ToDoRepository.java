package de.huj.notanothertodo.repository;

import de.huj.notanothertodo.model.ToDo;
import de.huj.notanothertodo.model.User;
import org.springframework.data.repository.CrudRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface ToDoRepository extends CrudRepository<ToDo, Integer> {
    List<ToDo> findByUser(User user);
    List<ToDo> findByUserAndPlaned(User user, LocalDate planed);
    List<ToDo> findByUserAndPlanedIsGreaterThanEqualAndPlanedIsLessThanEqual(User user, LocalDate from, LocalDate to);
    Optional<ToDo> findByUserAndId(User user, long id);
}
