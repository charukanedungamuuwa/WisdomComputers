package com.example.WisdomComputerTechnologies.Services;

import com.example.WisdomComputerTechnologies.Model.AddServiceRecord;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
public class KafkaProducer {

    private static final String TOPIC = "service-records";

    @Autowired
    private KafkaTemplate<String, AddServiceRecord> kafkaTemplate;

    public void sendMessage(AddServiceRecord record) {
        kafkaTemplate.send(TOPIC, record);
        System.out.println("Produced message: " + record);
    }
}
