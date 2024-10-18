package com.example.WisdomComputerTechnologies.Controller;

import com.example.WisdomComputerTechnologies.Model.Suppliers;
import com.example.WisdomComputerTechnologies.Services.SupplierService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/suppliers")
public class SupplierController {

    @Autowired
    private SupplierService supplierService;

    @GetMapping
    public List<Suppliers> getAllSuppliers() {
        return supplierService.getAllSuppliers();
    }

    @GetMapping("/{id}")
    public Suppliers getSupplierById(@PathVariable int id) {
        return supplierService.getSupplierById(id)
                .orElse(null);  // Returns null if not found
    }

    @PostMapping
    public Suppliers createSupplier(@RequestBody Suppliers supplier) {
        return supplierService.createSupplier(supplier);
    }

    @PutMapping("/{id}")
    public Suppliers updateSupplier(@PathVariable int id, @RequestBody Suppliers supplierDetails) {
        return supplierService.updateSupplier(id, supplierDetails);
    }

    @DeleteMapping("/{id}")
    public void deleteSupplier(@PathVariable int id) {
        supplierService.deleteSupplier(id);
        // No return value; a successful delete will return a 204 No Content by default
    }
}
