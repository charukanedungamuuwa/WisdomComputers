package com.example.WisdomComputerTechnologies.DAO;

import com.example.WisdomComputerTechnologies.Model.GetRepairs;
import com.example.WisdomComputerTechnologies.Model.Repairs;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GetRepairsDAO extends JpaRepository<GetRepairs, Integer> {

}
