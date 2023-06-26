package ru.kata.spring.boot_security.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.service.UserService;

import java.security.Principal;
import java.util.List;

@Controller
@RequestMapping("/admin")
public class AdminController {

    private final UserService userService;

    @Autowired
    public AdminController(UserService userService) {
        this.userService = userService;
    }


    @GetMapping({"/", ""})
    public String showAllUsers(Model model, @ModelAttribute("flashMessage") String flashAttribute, Principal principal) {
        List<User> users = userService.getAllUsers();
        model.addAttribute("users", users);
        User user = userService.findByUsername(principal.getName());
        model.addAttribute("authUser", user);

        model.addAttribute("newUser", new User());
        return "admin";
    }


    @PutMapping()
    public String saveUser(@ModelAttribute("newUser") User user) {
        userService.save(user);
        return "redirect:/admin";
    }

//    @PatchMapping()
//    public String updateUser(@ModelAttribute("user") User user) {
//        userService.update(user);
//        return "redirect:/admin";
//    }
//
//    @DeleteMapping()
//    public String delete(@ModelAttribute("user") User user,Principal principal) {
//         if (!(principal.getName().equals(user.getUsername()))){
//            userService.deleteUser(user.getId());
//         }
//        return "redirect:/admin";
//    }
}
