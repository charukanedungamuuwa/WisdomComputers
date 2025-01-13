package com.example.WisdomComputerTechnologies.Services;

import com.example.WisdomComputerTechnologies.DAO.AddServiceRecordDAO;
import com.example.WisdomComputerTechnologies.Model.AddServiceRecord;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AddServiceRecordService {

    private final AddServiceRecordDAO addServiceRecordDAO;
    private final KafkaProducer kafkaProducer;

    @Autowired
    public AddServiceRecordService(AddServiceRecordDAO addServiceRecordDAO, KafkaProducer kafkaProducer) {
        this.addServiceRecordDAO = addServiceRecordDAO;
        this.kafkaProducer = kafkaProducer;
    }

    public AddServiceRecord addServiceRecord(AddServiceRecord addServiceRecord) {
        AddServiceRecord savedRecord = addServiceRecordDAO.save(addServiceRecord);

        // Convert to Kafka-compatible ServiceRecord
        AddServiceRecord kafkaRecord = new AddServiceRecord(
                savedRecord.getId(),
                savedRecord.getServiceName(),
                savedRecord.getDescription(),
                savedRecord.getCustomerName()
        );

        kafkaProducer.sendMessage(kafkaRecord);
        return savedRecord;
    }
    public List<AddServiceRecord> getAllServiceRecords() {
        return addServiceRecordDAO.findAll();
    }

    public AddServiceRecord getServiceRecordById(Integer id) {
        return addServiceRecordDAO.findById(id)
                .orElseThrow(() -> new RuntimeException("Service record not found with ID: " + id));
    }
}
