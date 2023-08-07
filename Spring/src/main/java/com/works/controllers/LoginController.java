package com.works.controllers;

import com.works.entities.User;
import com.works.services.LoginService;
import com.works.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequiredArgsConstructor
@CrossOrigin
public class LoginController {

    final LoginService loginService;

    @PostMapping("/login")
    public ResponseEntity login(@RequestBody User user){
        return loginService.login(user);
    }
}
