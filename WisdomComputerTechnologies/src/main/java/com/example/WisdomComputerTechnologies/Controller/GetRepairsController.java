package com.example.WisdomComputerTechnologies.Controller;

import com.example.WisdomComputerTechnologies.Model.GetRepairs;
import com.example.WisdomComputerTechnologies.Services.GetRepairsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/getRepairs")
public class GetRepairsController {


    @Autowired
    private GetRepairsService getRepairsService;

    @GetMapping
    public List<GetRepairs> getAllGetRepairs() {
        return getRepairsService.getAllGetRepairs();
    }

    @GetMapping("/{id}")
    public GetRepairs getGetRepairById(@PathVariable int id) {
        return getRepairsService.getGetRepairById(id)
                .orElse(null);  // Returns null if not found
    }

    @PostMapping
    public GetRepairs createGetRepair(@RequestBody GetRepairs getRepair) {
        return getRepairsService.createGetRepair(getRepair);
    }

    @PutMapping("/{id}")
    public GetRepairs updateGetRepair(@PathVariable int id, @RequestBody GetRepairs getRepairDetails) {
        return getRepairsService.updateGetRepair(id, getRepairDetails);
    }

    @DeleteMapping("/{id}")
    public void deleteGetRepair(@PathVariable int id) {
        getRepairsService.deleteGetRepair(id);
        // No return value; a successful delete will return a 204 No Content by default
    }
}
