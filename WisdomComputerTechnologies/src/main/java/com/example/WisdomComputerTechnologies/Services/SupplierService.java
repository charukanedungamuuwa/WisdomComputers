package com.example.WisdomComputerTechnologies.Services;

import com.example.WisdomComputerTechnologies.DAO.SupplierDAO;
import com.example.WisdomComputerTechnologies.Model.Suppliers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
@Service
public class SupplierService {

    @Autowired
    private SupplierDAO supplierDAO;

    public List<Suppliers> getAllSuppliers() {
        return supplierDAO.findAll();
    }

    public Optional<Suppliers> getSupplierById(int id) {
        return supplierDAO.findById(id);
    }

    public Suppliers createSupplier(Suppliers supplier) {
        return supplierDAO.save(supplier);
    }

    public Suppliers updateSupplier(int id, Suppliers supplierDetails) {
        Suppliers supplier = supplierDAO.findById(id)
                .orElseThrow(() -> new RuntimeException("Supplier not found"));
        supplier.setName(supplierDetails.getName());
        supplier.setAddress(supplierDetails.getAddress());
        supplier.setPhone(supplierDetails.getPhone());
        supplier.setEmail(supplierDetails.getEmail());
        return supplierDAO.save(supplier);
    }

    public void deleteSupplier(int id) {
        supplierDAO.deleteById(id);
    }
}
