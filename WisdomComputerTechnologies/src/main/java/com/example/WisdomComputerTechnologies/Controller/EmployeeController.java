package com.example.WisdomComputerTechnologies.Controller;

import com.example.WisdomComputerTechnologies.Model.Employees;
import com.example.WisdomComputerTechnologies.Model.Repairs;
import com.example.WisdomComputerTechnologies.Services.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/employees")
public class EmployeeController {

    @Autowired
    private EmployeeService employeeService;

    @GetMapping
    public List<Employees> getAllEmployees() {
        return employeeService.getAllEmployees();
    }

    @GetMapping("/{id}")
    public Employees getEmployeeById(@PathVariable int id) {
        return employeeService.getEmployeeById(id)
                .orElse(null);  // Returns null if not found
    }

    @PostMapping
    public Employees createEmployee(@RequestBody Employees employee) {
        return employeeService.createEmployee(employee);
    }

    @PutMapping("/{id}")
    public Employees updateEmployee(@PathVariable int id, @RequestBody Employees employeeDetails) {
        return employeeService.updateEmployee(id, employeeDetails);
    }

    @DeleteMapping("/{id}")
    public void deleteEmployee(@PathVariable int id) {
        employeeService.deleteEmployee(id);
        // No return value; a successful delete will return a 204 No Content by default
    }

    @GetMapping("/{empId}/repairs")
    public List<Employees> getRepairsByEmployeeId(@PathVariable int repairId) {
        return employeeService.findByRepairId(repairId);
    }

    @PostMapping("/{empId}/repairs")
    public ResponseEntity<Void> addRepairToEmployee(@PathVariable int empId, @RequestBody Repairs repair) {
        employeeService.addRepairToEmployee(empId, repair);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{empId}/repairs")
    public ResponseEntity<Void> removeRepairFromEmployee(@PathVariable int empId, @RequestBody Repairs repair) {
        employeeService.removeRepairFromEmployee(empId, repair);
        return ResponseEntity.ok().build();
    }

}
