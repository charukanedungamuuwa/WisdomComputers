package com.example.WisdomComputerTechnologies.Model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Suppliers {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int supid;
    private String name;
    private String address;
    private String phone;
    private String email;
    @OneToMany(mappedBy = "suppliers", cascade = CascadeType.ALL)
    private List<Item> item;
}
