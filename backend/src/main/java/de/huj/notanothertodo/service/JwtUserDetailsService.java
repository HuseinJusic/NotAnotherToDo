package de.huj.notanothertodo.service;

import de.huj.notanothertodo.config.JwtTokenUtil;
import de.huj.notanothertodo.exceptions.UserNotFoundException;
import de.huj.notanothertodo.model.User;
import de.huj.notanothertodo.payload.in.UserRequest;
import de.huj.notanothertodo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class JwtUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder bcryptEncoder;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username);
        if (user == null) {
            throw new UsernameNotFoundException("User not found with username: " + username);
        }
        return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(),
                new ArrayList<>());
    }

    public User getUserByToken(String token) throws UserNotFoundException{
        User user = userRepository.findByUsername(jwtTokenUtil.getUsernameFromToken(token));
        if (user == null) {
            throw new UserNotFoundException();
        }
        return user;
    }

    public User getUserByName(String name) throws UserNotFoundException{
        User user = userRepository.findByUsername(name);
        if (user == null) {
            throw new UsernameNotFoundException("Can't find user with name: " + name);
        }
        return user;
    }

    public User save(UserRequest user) {
        User newUser = new User();
        newUser.setUsername(user.getUsername());
        newUser.setPassword(bcryptEncoder.encode(user.getPassword()));
        return userRepository.save(newUser);
    }
}
