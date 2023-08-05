package com.works.controllers;

import com.works.entities.User;
import com.works.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@CrossOrigin
public class LoginController {

    final UserService userService;

    @PostMapping("/login")
    public ResponseEntity login(@RequestBody User user){
        return userService.login(user);
    }
}
