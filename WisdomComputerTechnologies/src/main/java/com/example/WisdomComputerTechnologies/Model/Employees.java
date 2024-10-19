package com.example.WisdomComputerTechnologies.Model;

import com.fasterxml.jackson.annotation.JsonBackReference;
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
public class Employees {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int empId;
    private String name;
    private String address;
    private String phone;
    private String email;


    @ManyToMany(mappedBy = "employees",cascade = CascadeType.ALL)
    @JsonBackReference // Prevent infinite recursion

    private List<Repairs> repairs ;


}


