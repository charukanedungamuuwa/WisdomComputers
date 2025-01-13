package com.example.WisdomComputerTechnologies.DAO;

import com.example.WisdomComputerTechnologies.Model.AddServiceRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AddServiceRecordDAO extends JpaRepository<AddServiceRecord, Integer> {
}
