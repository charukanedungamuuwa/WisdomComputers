package com.example.WisdomComputerTechnologies.Services;

import com.example.WisdomComputerTechnologies.DAO.CustomerDAO;
import com.example.WisdomComputerTechnologies.Model.Customer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CustomerService {
    @Autowired
    private CustomerDAO customerDAO;

    public Customer saveCustomer(Customer customer) {
        return customerDAO.save(customer);
    }

    // Get all customers
    public List<Customer> getAllCustomers() {
        return customerDAO.findAll();
    }

    // Get a customer by ID
    public Customer getCustomerById(int id) {
        Optional<Customer> customer = customerDAO.findById(id);
        return customer.orElse(null);
    }

    // Update a customer
    public Customer updateCustomer(int id, Customer customerDetails) {
        if (customerDAO.existsById(id)) {
            customerDetails.setId(id); // Set the ID for the entity to update
            return customerDAO.save(customerDetails);
        }
        return null;
    }

    // Delete a customer
    public boolean deleteCustomer(int id) {
        if (customerDAO.existsById(id)) {
            customerDAO.deleteById(id);
            return true;
        }
        return false;
    }

}
