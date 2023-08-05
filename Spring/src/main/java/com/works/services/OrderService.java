package com.works.services;

import com.works.config.Rest;
import com.works.entities.Order;
import com.works.repositories.OrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@Service
@RequiredArgsConstructor
public class OrderService {

    final OrderRepository orderRepository;

    public ResponseEntity save(Order order){
        try{
            orderRepository.save(order);
            Rest rest = new Rest(true,order);
            ResponseEntity responseEntity = new ResponseEntity<>(rest,HttpStatus.OK);
            return responseEntity;
        }catch (Exception ex){
            Rest rest = new Rest(false,ex.getMessage());
            ResponseEntity responseEntity = new ResponseEntity<>(rest,HttpStatus.BAD_REQUEST);
            return responseEntity;
        }
    }

    public ResponseEntity delete(Long oid){
        Optional<Order> order = orderRepository.findById(oid);
        try {
            if(order.isPresent()){
                orderRepository.deleteById(oid);
                Rest rest = new Rest(true,order.get());
                ResponseEntity responseEntity = new ResponseEntity<>(rest,HttpStatus.OK);
                return responseEntity;
            }
        }catch (Exception ex){
            Rest rest = new Rest(false,ex.getMessage());
            ResponseEntity responseEntity = new ResponseEntity<>(rest,HttpStatus.BAD_REQUEST);
            return responseEntity;
        }
        return null;
    }

    public ResponseEntity orderList(){
        List<Order> orders = orderRepository.findAll();
        try {
            Rest rest = new Rest(true,orders);
            ResponseEntity responseEntity = new ResponseEntity<>(rest, HttpStatus.OK);
            return responseEntity;
        }catch (Exception ex){
            Rest rest = new Rest(false,ex.getMessage());
            ResponseEntity responseEntity = new ResponseEntity<>(rest, HttpStatus.BAD_REQUEST);
            return responseEntity;
        }
    }

    public ResponseEntity userOrders(Long uid){
        List<Order> orders = orderRepository.findByUidEquals(uid);
        try{
            Rest rest = new Rest(true,orders);
            ResponseEntity responseEntity = new ResponseEntity<>(rest,HttpStatus.OK);
            return responseEntity;
        }catch (Exception ex){
            Rest rest = new Rest(false,ex.getMessage());
            ResponseEntity responseEntity = new ResponseEntity<>(rest,HttpStatus.BAD_REQUEST);
            return responseEntity;
        }
    }


}
