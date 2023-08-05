package com.works.controllers;

import com.works.entities.Order;
import com.works.services.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.method.P;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/order")
public class OrderController {

    final OrderService orderService;

    @GetMapping("/save")
    public ResponseEntity save(@RequestBody Order order){
        return orderService.save(order);
    }

    @GetMapping("/listAll")
    public ResponseEntity listAll(){
        return orderService.orderList();
    }

    @GetMapping("/listByUser/{uid}")
    public ResponseEntity listByUser(@PathVariable Long uid){
        return orderService.userOrders(uid);
    }

    @GetMapping("/delete/{oid}")
    public ResponseEntity delete(@PathVariable Long oid){
        return orderService.delete(oid);
    }
}
