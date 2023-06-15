package ru.kata.spring.boot_security.demo.init;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import ru.kata.spring.boot_security.demo.dao.RoleDao;
import ru.kata.spring.boot_security.demo.model.Role;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.service.UserService;

import javax.annotation.PostConstruct;
import java.util.Collections;
@Component
public class Init {

    @Autowired
    private UserService userService;

    @Autowired
    private RoleDao roleRepository;

    @PostConstruct
    public void init() {
        Role role = new Role("ROLE_USER");
        roleRepository.save(role);

        Role role1 = new Role("ROLE_ADMIN");
        roleRepository.save(role1);

        User user = new User();
        user.setFirstName("Test");
        user.setLastName("User");
        user.setUsername("user@gmail.com");
        user.setPassword("100");
        user.setRoles(Collections.singletonList(role));
        userService.save(user);

        User user1 = new User();
        user1.setFirstName("ad");
        user1.setLastName("User");
        user1.setUsername("admin@gmail.com");
        user1.setPassword("100");
        user1.setRoles(Collections.singletonList(role1));
        userService.save(user1);
    }
}
