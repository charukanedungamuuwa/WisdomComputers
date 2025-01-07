package com.example.WisdomComputerTechnologies.Controller;

import com.example.WisdomComputerTechnologies.Model.Item;
import com.example.WisdomComputerTechnologies.Services.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin
@RestController
@RequestMapping("/items")

public class ItemController {
    @Autowired
    private ItemService itemService;

    // Create a new item
    @PostMapping
    public ResponseEntity<Item> createItem(@RequestBody Item item) {
        Item savedItem = itemService.saveItem(item);
        return new ResponseEntity<>(savedItem, HttpStatus.CREATED);
    }

    // Get all items
    @GetMapping
    public ResponseEntity<List<Item>> getAllItems() {
        List<Item> items = itemService.getAllItems();
        return new ResponseEntity<>(items, HttpStatus.OK);
    }

    // Get an item by ID
    @GetMapping("/{id}")
    public ResponseEntity<Item> getItemById(@PathVariable int id) {
        Item item = itemService.getItemById(id);
        if (item != null) {
            return new ResponseEntity<>(item, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Update an item
    @PutMapping("/{id}")
    public ResponseEntity<Item> updateItem(@PathVariable int id, @RequestBody Item itemDetails) {
        Item updatedItem = itemService.updateItem(id, itemDetails);
        if (updatedItem != null) {
            return new ResponseEntity<>(updatedItem, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Delete an item
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteItem(@PathVariable int id) {
        if (itemService.deleteItem(id)) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
