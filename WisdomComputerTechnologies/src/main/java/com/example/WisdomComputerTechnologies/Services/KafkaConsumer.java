package com.example.WisdomComputerTechnologies.Services;

import com.example.WisdomComputerTechnologies.Model.AddServiceRecord;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
public class KafkaConsumer {

    @KafkaListener(topics = "service-records", groupId = "group_id")
    public void consume(AddServiceRecord record) {
        System.out.println("Consumed message: " + record);
    }
}
