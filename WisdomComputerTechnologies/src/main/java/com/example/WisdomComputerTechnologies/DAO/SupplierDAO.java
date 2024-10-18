package com.example.WisdomComputerTechnologies.DAO;

import com.example.WisdomComputerTechnologies.Model.Suppliers;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SupplierDAO extends JpaRepository<Suppliers, Integer> {
}
