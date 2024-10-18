package com.example.WisdomComputerTechnologies.DAO;


import com.example.WisdomComputerTechnologies.Model.Employees;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EmployeeDAO extends JpaRepository<Employees, Integer> {
    List<Employees> findByRepairs_ServiceId(int serviceId);

}
