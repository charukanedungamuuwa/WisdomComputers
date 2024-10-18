package com.example.WisdomComputerTechnologies.Services;

import com.example.WisdomComputerTechnologies.DAO.RepairDAO;
import com.example.WisdomComputerTechnologies.Model.Employees;
import com.example.WisdomComputerTechnologies.Model.Repairs;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RepairService {


    @Autowired
    private RepairDAO repairDAO;

    public List<Repairs> getAllRepairs() {
        return repairDAO.findAll();
    }

    public Optional<Repairs> getRepairById(int id) {
        return repairDAO.findById(id);
    }

    public Repairs createRepair(Repairs repair) {
        return repairDAO.save(repair);
    }

    public Repairs updateRepair(int id, Repairs repairDetails) {
        Repairs repair = repairDAO.findById(id)
                .orElseThrow(() -> new RuntimeException("Repair not found"));
        repair.setName(repairDetails.getName());
        repair.setDescription(repairDetails.getDescription());
        repair.setPrice(repairDetails.getPrice());
        repair.setImage(repairDetails.getImage());
        return repairDAO.save(repair);
    }

    public void deleteRepair(int id) {
        repairDAO.deleteById(id);
    }

    public List<Repairs> findByEmployeeId(int empId) {
        return repairDAO.findByEmployees_EmpId(empId);
    }





    public void addEmployeeToRepair(int serviceId, Employees employee) {
        Repairs repair = repairDAO.findById(serviceId).orElseThrow();
        repair.getEmployees().add(employee);
        repairDAO.save(repair);
    }

    public void removeEmployeeFromRepair(int serviceId, Employees employee) {
        Repairs repair = repairDAO.findById(serviceId).orElseThrow();
        repair.getEmployees().remove(employee);
        repairDAO.save(repair);
    }
}
