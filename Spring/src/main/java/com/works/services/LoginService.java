package com.works.services;

import com.works.config.Rest;
import com.works.entities.User;
import com.works.entities.projections.IUser;
import com.works.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
@RequiredArgsConstructor
public class LoginService {

    final UserRepository userRepository;
    final PasswordEncoder passwordEncoder;
    public ResponseEntity login(User user){
        List<User> users = userRepository.findAll();
        try {
            for (User us : users) {
                if(user.getEmail().equals(us.getEmail()) && passwordEncoder.matches(user.getPassword(),us.getPassword())){
                    IUser iUser = userRepository.user(us.getEmail(),us.getPassword());
                    Rest rest = new Rest(true,iUser);
                    ResponseEntity responseEntity  = new ResponseEntity<>(rest,HttpStatus.OK);
                    return responseEntity;
                }
            }
        }catch (Exception ex){
            Rest rest = new Rest(false,ex.getMessage());
            ResponseEntity responseEntity = new ResponseEntity(rest,HttpStatus.BAD_REQUEST);
            return responseEntity;
        }
        return null ;
    }
}
