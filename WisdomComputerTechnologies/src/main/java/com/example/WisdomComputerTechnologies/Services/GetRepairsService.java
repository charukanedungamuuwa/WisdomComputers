package com.example.WisdomComputerTechnologies.Services;

import com.example.WisdomComputerTechnologies.DAO.GetRepairsDAO;
import com.example.WisdomComputerTechnologies.Model.GetRepairs;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class GetRepairsService {

    @Autowired
    private GetRepairsDAO getRepairsDAO;

    public List<GetRepairs> getAllGetRepairs() {
        return getRepairsDAO.findAll();
    }

    public Optional<GetRepairs> getGetRepairById(int id) {
        return getRepairsDAO.findById(id);
    }

    public GetRepairs createGetRepair(GetRepairs getRepair) {
        return getRepairsDAO.save(getRepair);
    }

    public GetRepairs updateGetRepair(int id, GetRepairs getRepairDetails) {
        GetRepairs getRepair = getRepairsDAO.findById(id)
                .orElseThrow(() -> new RuntimeException("GetRepair not found"));
        getRepair.setDate(getRepairDetails.getDate());
        getRepair.setTime(getRepairDetails.getTime());
        getRepair.setCustomer(getRepairDetails.getCustomer());
        getRepair.setRepairs(getRepairDetails.getRepairs());
        return getRepairsDAO.save(getRepair);
    }

    public void deleteGetRepair(int id) {
        getRepairsDAO.deleteById(id);
    }




}
