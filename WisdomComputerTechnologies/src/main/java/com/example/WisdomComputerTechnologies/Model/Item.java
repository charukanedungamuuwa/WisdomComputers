package com.example.WisdomComputerTechnologies.Model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
import java.util.function.Supplier;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "itemId")

public class Item {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int itemId;
    private String name;
    private String description;
    private int price;
    private int quantity;
    private String category;
    private String image;
    private int brand;
    private int model;



//   @ManyToOne
//    @JoinColumn(name = "supplier_id")
//    private Suppliers suppliers;
//    private Date supplyDate;
//    private Date supplyTime;
//
//   @ManyToOne
//    @JoinColumn(name = "customer_id")
//   //@JsonBackReference // Prevent circular reference
//
//   private Customer customer;
//    private Date purchaseDate;
//    private Date purchaseTime;
//


}
