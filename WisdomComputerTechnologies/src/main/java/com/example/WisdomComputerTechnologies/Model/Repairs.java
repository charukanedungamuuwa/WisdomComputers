package com.example.WisdomComputerTechnologies.Model;


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
    private List<GetRepairs> getRepairs;


    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(
            name = "provide_repairs",
            joinColumns = @JoinColumn(name = "service_id"),
            inverseJoinColumns = @JoinColumn(name = "employee_id")

    )
    private List<Employees> employees;

}
