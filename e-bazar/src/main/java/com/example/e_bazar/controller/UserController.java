package com.example.e_bazar.controller;

import com.example.e_bazar.model.User;
import com.example.e_bazar.service.UserService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

class LoginRequest {

    private String email;
    private String password;

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "http://localhost:3000", exposedHeaders = {"Access-Control-Allow-Origin"})
public class UserController {
    private final UserService userService;
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/create")
    public User createUser(@RequestBody User user) {
        return userService.createUser(user);
    }

    @PostMapping("/login")
    public User loginUser(@RequestBody LoginRequest loginRequest) {
        User user = userService.findByEmail(loginRequest.getEmail());
        if (user != null && passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
            return user;
        }
        return null;
    }

    @PutMapping("/update/{id}")
    public User updateUser(@PathVariable Long id, @RequestBody User userDetails) {
        User user = userService.findById(id);
        user.setFirstName(userDetails.getFirstName());
        user.setLastName(userDetails.getLastName());
        user.setEmail(userDetails.getEmail());
        user.setPhoneNumber(userDetails.getPhoneNumber());
        return userService.updateUser(user);
    }

    @PutMapping("/password/{id}")
    public User changePassword(@PathVariable Long id, @RequestBody User newPassword) {
        User user = userService.findById(id);
        if (passwordEncoder.matches(newPassword.getPassword(), user.getPassword())) {
            return null;
        }
        user.setPassword(passwordEncoder.encode(newPassword.getPassword()));
        return userService.updateUser(user);
    }
}
