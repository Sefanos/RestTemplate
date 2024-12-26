package com.example.voiture.services;

import com.example.voiture.Entities.Client;
import com.example.voiture.Entities.Voiture;
import com.example.voiture.Entities.VoitureResponse;
import com.example.voiture.repositories.VoitureRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class VoitureService {

    @Autowired
    private VoitureRepository voitureRepository;

    @Autowired
    private RestTemplate restTemplate; // Inject RestTemplate bean

    private static final String CLIENT_SERVICE_URL = "http://localhost:8888/SERVICE-CLIENT/clients";
    public List<VoitureResponse> findAll() {
        List<Voiture> voitures = voitureRepository.findAll();
        return voitures.stream().map(voiture -> {
            // Fetch the client details using RestTemplate
            Client client = fetchClientById(voiture.getIdClient());
            return new VoitureResponse(
                    voiture.getId(),
                    voiture.getMarque(),
                    voiture.getModel(),
                    voiture.getMatricule(),
                    client // Set the fetched client object
            );
        }).collect(Collectors.toList());
    }

    public VoitureResponse findById(Long id) throws Exception {
        Voiture voiture = voitureRepository.findById(id)
                .orElseThrow(() -> new Exception("Voiture not found"));

        // Fetch the client details using RestTemplate
        Client client = fetchClientById(voiture.getIdClient());
        return new VoitureResponse(
                voiture.getId(),
                voiture.getMarque(),
                voiture.getModel(),
                voiture.getMatricule(),
                client
        );
    }
    public Voiture addVoiture(Voiture voiture) throws Exception {
        System.out.println("Received Voiture: " + voiture);
        if (voiture.getIdClient() != null) {
            Client client = fetchClientById(voiture.getIdClient());
            if (client == null) {
                throw new Exception("Client with ID " + voiture.getIdClient() + " not found");
            }
        }
        return voitureRepository.save(voiture);
    }


    // Helper method to fetch client details by ID using RestTemplate
    private Client fetchClientById(Long clientId) {
        if (clientId == null) {
            return null; // Handle cases where clientId is null
        }
        try {
            return restTemplate.getForObject(CLIENT_SERVICE_URL + "/" + clientId, Client.class);
        } catch (Exception e) {
            System.err.println("Failed to fetch client with ID " + clientId + ": " + e.getMessage());
            return null; // Return null if client fetch fails
        }
    }
}
