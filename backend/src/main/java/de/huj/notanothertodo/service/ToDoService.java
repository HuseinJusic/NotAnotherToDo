package de.huj.notanothertodo.service;

import de.huj.notanothertodo.model.ToDo;
import de.huj.notanothertodo.model.User;
import de.huj.notanothertodo.payload.in.ToDoRequest;
import de.huj.notanothertodo.repository.ToDoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.StreamSupport;

@Service
public class ToDoService {

    @Autowired
    private ToDoRepository toDoRepository;

    public List<ToDo> getToDo(){
        return StreamSupport.stream(toDoRepository.findAll().spliterator(), false).toList() ;
    }

    public List<ToDo> getToDo(User u){
        return toDoRepository.findByUser(u);
    }

    public ToDo getToDo(User u, long id){
        return toDoRepository.findByUserAndId(u,id).orElse(null);
    }

    public ToDo saveToDo(User user, ToDoRequest toDoRequest){
        ToDo toDo = new ToDo(toDoRequest.getTitle(), toDoRequest.getBody(), user);;
        return toDoRepository.save(toDo);
    }

    public ToDo updateToDo(User user, ToDoRequest toDoRequest) throws Exception {
        ToDo toDo = toDoRepository.findByUserAndId(user, toDoRequest.getId()).orElse(null);

        if(toDo == null){
            throw new Exception("ToDo not Found");
        }

        toDo.setTitle(toDoRequest.getTitle());
        toDo.setBody(toDoRequest.getBody());

        return toDoRepository.save(toDo);
    }

    public void removeToDo(User u,long id) throws Exception {
        toDoRepository.delete(toDoRepository.findByUserAndId(u,id).orElseThrow(Exception::new));
    }
}
