package de.huj.notanothertodo.controller;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class NotAnotherToDoController {

    // Forwards all routes to FrontEnd except: '/', '/index.html', '/api', '/api/**'
    @RequestMapping(value = { "/", "/{x:[\\w\\-]+}", "/{x:^(?!api$).*$}/**/{y:[\\w\\-]+}" })
    public String redirectApi() {
        return "/index.html";
    }
}
