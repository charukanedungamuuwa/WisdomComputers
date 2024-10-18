package com.example.WisdomComputerTechnologies.Services;

import com.example.WisdomComputerTechnologies.DAO.ItemDAO;
import com.example.WisdomComputerTechnologies.Model.Item;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service

public class ItemService {

    @Autowired
    private ItemDAO itemDAO;

    // Save a new item
    public Item saveItem(Item item) {
        return itemDAO.save(item);
    }

    // Get all items
    public List<Item> getAllItems() {
        return itemDAO.findAll();
    }

    // Get an item by ID
    public Item getItemById(int id) {
        Optional<Item> item = itemDAO.findById(id);
        return item.orElse(null);
    }

    // Update an item
    public Item updateItem(int id, Item itemDetails) {
        if (itemDAO.existsById(id)) {
            itemDetails.setItemId(id); // Set the ID for the entity to update
            return itemDAO.save(itemDetails);
        }
        return null;
    }

    // Delete an item
    public boolean deleteItem(int id) {
        if (itemDAO.existsById(id)) {
            itemDAO.deleteById(id);
            return true;
        }
        return false;
    }
}
