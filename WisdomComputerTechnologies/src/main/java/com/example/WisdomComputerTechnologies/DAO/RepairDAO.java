package com.example.WisdomComputerTechnologies.DAO;

import com.example.WisdomComputerTechnologies.Model.Repairs;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RepairDAO extends JpaRepository<Repairs,Integer> {
    List<Repairs> findByEmployees_EmpId(int empId);


}
