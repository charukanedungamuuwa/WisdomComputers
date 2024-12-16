package com.example.WisdomComputerTechnologies.Model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
//JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "customer_ServiceId")
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "customer_ServiceId")

public class GetRepairs {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int customer_ServiceId;
    private LocalDate date;
    private LocalTime time;

    @ManyToOne
    @JoinColumn(name = "customer_id")
   //@JsonBackReference // Prevent recursion by ignoring this field during serialization
    private Customer customer;

    @ManyToOne
    @JoinColumn(name = "service_id")
    //@JsonBackReference
    private Repairs repairs;


}
