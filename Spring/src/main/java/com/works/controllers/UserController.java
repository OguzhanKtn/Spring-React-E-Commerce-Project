package com.works.controllers;

import com.works.entities.User;
import com.works.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequiredArgsConstructor
@RequestMapping("/user")
@CrossOrigin
public class UserController {

    final UserService userService;

    @PostMapping("/register")
    public ResponseEntity save(@Valid @RequestBody User user){
        return userService.save(user);
    }


}
