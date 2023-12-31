package com.works.services;

import com.works.config.Rest;
import com.works.entities.Order;
import com.works.entities.projections.IAllOrders;
import com.works.entities.projections.IOrder;
import com.works.repositories.OrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.HashMap;
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
        List<IAllOrders> orders = orderRepository.allOrders();
        HashMap map = new HashMap<>();
        map.put("products",orders);
        try {
            ResponseEntity responseEntity = new ResponseEntity<>(map, HttpStatus.OK);
            return responseEntity;
        }catch (Exception ex){
            Rest rest = new Rest(false,ex.getMessage());
            ResponseEntity responseEntity = new ResponseEntity<>(rest, HttpStatus.BAD_REQUEST);
            return responseEntity;
        }
    }

    public ResponseEntity userOrders(Long uid){
        List<IOrder> orders = orderRepository.orders(uid);
        HashMap map = new HashMap<>();
        map.put("products",orders);
        try{

            ResponseEntity responseEntity = new ResponseEntity<>(map,HttpStatus.OK);
            return responseEntity;
        }catch (Exception ex){
            Rest rest = new Rest(false,ex.getMessage());
            ResponseEntity responseEntity = new ResponseEntity<>(rest,HttpStatus.BAD_REQUEST);
            return responseEntity;
        }
    }


}
