package com.example.WisdomComputerTechnologies.Controller;

import com.example.WisdomComputerTechnologies.Model.Employees;
import com.example.WisdomComputerTechnologies.Model.Repairs;
import com.example.WisdomComputerTechnologies.Services.EmployeeService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Base64;
import java.util.List;
@Slf4j
@RestController
@CrossOrigin
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

    @PostMapping(consumes = {"multipart/form-data"})
    public Employees createEmployee(
           @RequestParam("name") String name,
           @RequestParam("address") String address,
           @RequestParam("phone") String phone,
           @RequestParam("email") String email,


           @RequestPart("imageFile") MultipartFile imageFile)  {
        try {
           Employees employeeDetails = new Employees();
           employeeDetails.setName(name);
           employeeDetails.setEmail(email);
           employeeDetails.setPhone(phone);
           employeeDetails.setAddress(address);

           return employeeService.createEmployee(employeeDetails, imageFile);



    } catch (IOException e) {
            throw new RuntimeException(e);
        }
}

//        @PutMapping(value="/{id}", consumes = {"multipart/form-data"})
//    public Employees updateEmployee(
//            @PathVariable int id,
//            @RequestParam("name") String name,
//            @RequestParam("email") int email,
//            @RequestParam("phone") String phone,
//            @RequestParam("address") String address,
//            @RequestPart(value = "imageFile", required = false) MultipartFile imageFile)  {
//        return employeeService.updateEmployee(id, employeeDetails);
//    }
@PutMapping(value = "/{id}", consumes = {"multipart/form-data"})
public Employees updateEmployee(
        @PathVariable int id,
        @RequestParam("name") String name,
        @RequestParam("email") String email,  // Changed to String, since email is typically a String
        @RequestParam("phone") String phone,
        @RequestParam("address") String address,
        @RequestPart(value = "imageFile", required = false) MultipartFile imageFile) {
    try {
        // Retrieve the employee from the service by ID
        Employees existingEmployee = employeeService.getEmployeeById(id)
                .orElseThrow(() -> new RuntimeException("Employee not found"));

        // Update the employee's basic details
        existingEmployee.setName(name);
        existingEmployee.setEmail(email);
        existingEmployee.setPhone(phone);
        existingEmployee.setAddress(address);

        // Update the image if provided
        if (imageFile != null && !imageFile.isEmpty()) {
            existingEmployee.setImage(Base64.getEncoder().encodeToString(imageFile.getBytes()));
        }

        // Update employee in the service
        return employeeService.updateEmployee(id, existingEmployee);
    } catch (RuntimeException | IOException e) {
        log.error("Error updating employee", e);
        throw new RuntimeException("Error updating employee: " + e.getMessage());
    }
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
