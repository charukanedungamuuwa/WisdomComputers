package com.example.WisdomComputerTechnologies.Model;


import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
//@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class Customer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String name;
    private String address;
    private String phone;
    private String email;


@OneToMany(mappedBy = "customer", cascade = CascadeType.ALL)
//@JsonManagedReference // Manage serialization of the list

private List<Item> item;
//
//@ManyToMany(mappedBy = "customer",cascade = CascadeType.ALL)
//    private Set<ServicesEntity> servicesEntities = new HashSet<>();
 @OneToMany(mappedBy = "customer",cascade = CascadeType.ALL)
 //@JsonManagedReference // Manage serialization of the list
 private List<GetRepairs> getRepairs;
}
