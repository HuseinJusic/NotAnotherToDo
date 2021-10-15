package de.huj.notanothertodo.exceptions;

import org.springframework.security.core.AuthenticationException;

public class UserNotFoundException extends AuthenticationException {
    public UserNotFoundException(String message) {
        super(message);
    }

    public UserNotFoundException() {
        super("User Not found");
    }
}
