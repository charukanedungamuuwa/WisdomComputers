package com.example.WisdomComputerTechnologies.Controller;

import com.example.WisdomComputerTechnologies.Model.Employees;
import com.example.WisdomComputerTechnologies.Model.Repairs;
import com.example.WisdomComputerTechnologies.Services.RepairService;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.DataInput;
import java.io.IOException;
import java.util.Base64;
import java.util.List;
import java.util.Optional;

@Slf4j
@RestController
@CrossOrigin
@RequestMapping("/repairs")
// @CrossOrigin(origins = "*") // Uncomment if CORS is required.
public class RepairController {

    @Autowired
    private RepairService repairService;

    // Fetch all repairs
    @GetMapping
    public ResponseEntity<List<Repairs>> getAllRepairs() {
        List<Repairs> repairs = repairService.getAllRepairs();
        if (repairs.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(repairs);
    }

    // Fetch a repair by ID
    @GetMapping("/{id}")
    public ResponseEntity<Repairs> getRepairById(@PathVariable int id) {
        Optional<Repairs> repair = repairService.getRepairById(id);
        return repair.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Create a repair with an image
    @PostMapping(consumes = {"multipart/form-data"})
    public ResponseEntity<Repairs> createRepair(
            @RequestParam("name") String name,
            @RequestParam("price") int price,
            @RequestParam("description") String description,
            @RequestPart("imageFile") MultipartFile imageFile) {
        try {
            Repairs repairDetails = new Repairs();
            repairDetails.setName(name);
            repairDetails.setPrice(price);
            repairDetails.setDescription(description);



            Repairs createdRepair = repairService.createRepair(repairDetails, imageFile);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdRepair);
        } catch (IOException e) {
            log.error("Error creating repair", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(null);
        }
    }

    // Update a repair by ID
//    @PutMapping("/{id}")
//    public ResponseEntity<Repairs> updateRepair(
//            @PathVariable int id,
//            @RequestBody Repairs repairDetails) {
//        log.info("Updating repair with ID {}: {}", id, repairDetails);
//        try {
//            Repairs updatedRepair = repairService.updateRepair(id, repairDetails);
//            return ResponseEntity.ok(updatedRepair);
//        } catch (RuntimeException e) {
//            log.error("Error updating repair", e);
//            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
//        }
//    }

    @PutMapping(value = "/{id}", consumes = {"multipart/form-data"})
    public ResponseEntity<?> updateRepair(
            @PathVariable int id,
            @RequestParam("name") String name,
            @RequestParam("price") int price,
            @RequestParam("description") String description,
            @RequestPart(value = "imageFile", required = false) MultipartFile imageFile) {
        log.info("Updating repair with ID {}: name={}, price={}, description={}", id, name, price, description);
        try {
            Repairs existingRepair = repairService.getRepairById(id)
                    .orElseThrow(() -> new RuntimeException("Repair not found"));

            // Update basic fields
            existingRepair.setName(name);
            existingRepair.setPrice(price);
            existingRepair.setDescription(description);

            // Update image if provided
            if (imageFile != null && !imageFile.isEmpty()) {
                existingRepair.setImage(Base64.getEncoder().encodeToString(imageFile.getBytes()));
            }

            Repairs updatedRepair = repairService.updateRepair(id, existingRepair);
            return ResponseEntity.ok(updatedRepair);
        } catch (RuntimeException | IOException e) {
            log.error("Error updating repair", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error: " + e.getMessage());
        }
    }


    // Delete a repair by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRepair(@PathVariable int id) {
        log.info("Deleting repair with ID {}", id);
        try {
            repairService.deleteRepair(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            log.error("Error deleting repair", e);
            return ResponseEntity.notFound().build();
        }
    }

    // Get repairs by employee ID
    @GetMapping("/{empId}/employees")
    public ResponseEntity<List<Repairs>> getEmployeesByRepairId(@PathVariable int empId) {
        List<Repairs> repairs = repairService.findByEmployeeId(empId);
        if (repairs.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(repairs);
    }

    // Add an employee to a repair
    @PostMapping("/{serviceId}/employees")
    public ResponseEntity<Void> addEmployeeToRepair(
            @PathVariable int serviceId,
            @RequestBody Employees employee) {
        log.info("Adding employee {} to repair with service ID {}", employee, serviceId);
        try {
            repairService.addEmployeeToRepair(serviceId, employee);
            return ResponseEntity.ok().build();
        } catch (RuntimeException e) {
            log.error("Error adding employee to repair", e);
            return ResponseEntity.notFound().build();
        }
    }

    // Remove an employee from a repair
    @DeleteMapping("/{serviceId}/employees")
    public ResponseEntity<Void> removeEmployeeFromRepair(
            @PathVariable int serviceId,
            @RequestBody Employees employee) {
        log.info("Removing employee {} from repair with service ID {}", employee, serviceId);
        try {
            repairService.removeEmployeeFromRepair(serviceId, employee);
            return ResponseEntity.ok().build();
        } catch (RuntimeException e) {
            log.error("Error removing employee from repair", e);
            return ResponseEntity.notFound().build();
        }
    }

    // Upload an image for repair
    @PostMapping(value = "/upload", consumes = "multipart/form-data")
    public ResponseEntity<String> uploadRepairImage(@RequestParam("imageFile") MultipartFile imageFile) {
        log.info("Received file: {}", imageFile.getOriginalFilename());
        // Simulate processing or saving
        String fileName = imageFile.getOriginalFilename();
        return ResponseEntity.status(HttpStatus.CREATED).body("File uploaded successfully: " + fileName);
    }
}
