package com.example.voiture.controllers;

import com.example.voiture.Entities.Voiture;
import com.example.voiture.Entities.VoitureResponse;
import com.example.voiture.services.VoitureService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/car")
public class VoitureController {

    @Autowired
    private VoitureService voitureService;

    @GetMapping
    public List<VoitureResponse> findAll() {
        return voitureService.findAll();
    }

    @GetMapping("/{id}")
    public VoitureResponse findById(@PathVariable Long id) throws Exception {
        return voitureService.findById(id);
    }

    @PostMapping
    public Voiture addVoiture(@RequestBody Voiture voiture) throws Exception {
        return voitureService.addVoiture(voiture);
    }

}
