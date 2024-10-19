package com.example.WisdomComputerTechnologies.Model;


import com.fasterxml.jackson.annotation.JsonManagedReference;
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
public class Repairs {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int serviceId;
    private String name;
    private String description;
    private int price;
    private String image;

    //    @ManyToMany(cascade=CascadeType.ALL)
//    @JoinTable(
//  name="Customer_Service",
//            joinColumns = @JoinColumn(name = "service_id"),
//            inverseJoinColumns = @JoinColumn(name = "customer_id")
//
//    )
//    private Set<Customer> customer = new HashSet<>();
    @OneToMany(mappedBy = "repairs", cascade = CascadeType.ALL)
    @JsonManagedReference // Manage serialization of the list

    private List<GetRepairs> getRepairs;


    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(
            name = "provide_repairs",
            joinColumns = @JoinColumn(name = "service_id"),
            inverseJoinColumns = @JoinColumn(name = "employee_id")

    )
    @JsonManagedReference // Manage serialization of the list

    private List<Employees> employees;

}
