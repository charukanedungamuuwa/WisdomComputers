package com.example.WisdomComputerTechnologies.Controller;

import com.example.WisdomComputerTechnologies.Model.Employees;
import com.example.WisdomComputerTechnologies.Model.Repairs;
import com.example.WisdomComputerTechnologies.Services.RepairService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/repairs")
@CrossOrigin
public class RepairController {


    @Autowired
    private RepairService repairService;

    @GetMapping
    public List<Repairs> getAllRepairs() {
        return repairService.getAllRepairs();
    }

    @GetMapping("/{id}")
    public Repairs getRepairById(@PathVariable int id) {
        return repairService.getRepairById(id)
                .orElse(null);  // Returns null if not found
    }

    @PostMapping
    public Repairs createRepair(@RequestBody Repairs repair) {
        return repairService.createRepair(repair);
    }

    @PutMapping("/{id}")
    public Repairs updateRepair(@PathVariable int id, @RequestBody Repairs repairDetails) {
        return repairService.updateRepair(id, repairDetails);
    }

    @DeleteMapping("/{id}")
    public void deleteRepair(@PathVariable int id) {
        repairService.deleteRepair(id);
        // No return value; a successful delete will return a 204 No Content by default
    }
    @GetMapping("/{serviceId}/employees")
    public List<Repairs> getEmployeesByRepairId(@PathVariable int empId) {
        return repairService.findByEmployeeId(empId);
    }

    @PostMapping("/{serviceId}/employees")
    public ResponseEntity<Void> addEmployeeToRepair(@PathVariable int serviceId, @RequestBody Employees employee) {
        repairService.addEmployeeToRepair(serviceId, employee);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{serviceId}/employees")
    public ResponseEntity<Void> removeEmployeeFromRepair(@PathVariable int serviceId, @RequestBody Employees employee) {
        repairService.removeEmployeeFromRepair(serviceId, employee);
        return ResponseEntity.ok().build();
    }
}
