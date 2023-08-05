package com.works.entities;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import javax.validation.constraints.PositiveOrZero;

@Entity
@Data
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long pid;


    @NotEmpty
    @NotNull
    private String title;

    @NotEmpty
    @NotNull
    private String brand;

    @Positive
    @NotNull
    private Double price;

    @PositiveOrZero
    @NotNull
    private Integer stock;

    private Integer cid;



}
