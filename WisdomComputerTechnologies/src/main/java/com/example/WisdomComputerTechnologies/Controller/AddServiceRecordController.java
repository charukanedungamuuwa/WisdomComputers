package com.example.WisdomComputerTechnologies.Controller;

import com.example.WisdomComputerTechnologies.Model.AddServiceRecord;
import com.example.WisdomComputerTechnologies.Services.AddServiceRecordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/service-records")
public class AddServiceRecordController {

    private final AddServiceRecordService addServiceRecordService;

    @Autowired
    public AddServiceRecordController(AddServiceRecordService addServiceRecordService) {
        this.addServiceRecordService = addServiceRecordService;
    }

    @PostMapping
    public ResponseEntity<AddServiceRecord> addServiceRecord(@RequestBody AddServiceRecord addServiceRecord) {
        AddServiceRecord savedRecord = addServiceRecordService.addServiceRecord(addServiceRecord);
        return ResponseEntity.ok(savedRecord);
    }

    // GET all service records
    @GetMapping
    public ResponseEntity<List<AddServiceRecord>> getAllServiceRecords() {
        List<AddServiceRecord> serviceRecords = addServiceRecordService.getAllServiceRecords();
        return ResponseEntity.ok(serviceRecords);
    }

    // GET a service record by ID
    @GetMapping("/{id}")
    public ResponseEntity<AddServiceRecord> getServiceRecordById(@PathVariable Integer id) {
        AddServiceRecord serviceRecord = addServiceRecordService.getServiceRecordById(id);
        return ResponseEntity.ok(serviceRecord);
    }
}
