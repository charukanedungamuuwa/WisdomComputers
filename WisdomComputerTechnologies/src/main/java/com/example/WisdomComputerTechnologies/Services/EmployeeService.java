package com.example.WisdomComputerTechnologies.Services;

import com.example.WisdomComputerTechnologies.DAO.EmployeeDAO;
import com.example.WisdomComputerTechnologies.Model.Employees;
import com.example.WisdomComputerTechnologies.Model.Repairs;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Base64;
import java.util.List;
import java.util.Optional;

@Service
public class EmployeeService {


    @Autowired
    private EmployeeDAO employeeDAO;

    public List<Employees> getAllEmployees() {
        return employeeDAO.findAll();
    }

    public Optional<Employees> getEmployeeById(int id) {
        return employeeDAO.findById(id);
    }

    public Employees createEmployee(Employees employee, MultipartFile file)throws IOException {
       employee.setImage(Base64.getEncoder().encodeToString(file.getBytes()));
        return employeeDAO.save(employee);
    }

    public Employees updateEmployee(int id, Employees employeeDetails) {
        Employees employee = employeeDAO.findById(id).orElseThrow(() -> new RuntimeException("Employee not found"));
        employee.setName(employeeDetails.getName());
        employee.setAddress(employeeDetails.getAddress());
        employee.setPhone(employeeDetails.getPhone());
        employee.setEmail(employeeDetails.getEmail());
        return employeeDAO.save(employee);
    }

    public void deleteEmployee(int id) {
        employeeDAO.deleteById(id);
    }

    public List<Employees> findByRepairId(int repairId) {
        return employeeDAO.findByRepairs_ServiceId(repairId);
    }

    public void addRepairToEmployee(int empId, Repairs repair) {
        Employees employee = employeeDAO.findById(empId).orElseThrow();
        employee.getRepairs().add(repair);
        employeeDAO.save(employee);
    }

    public void removeRepairFromEmployee(int empId, Repairs repair) {
        Employees employee = employeeDAO.findById(empId).orElseThrow();
        employee.getRepairs().remove(repair);
        employeeDAO.save(employee);
    }

}
