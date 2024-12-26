package com.example.voiture.Entities;

public class VoitureResponse {
    private Long id;
    private String marque;
    private String model;
    private String matricule;
    private Client client;

    // Default constructor
    public VoitureResponse() {
    }

    // Parameterized constructor
    public VoitureResponse(Long id, String marque, String model, String matricule, Client client) {
        this.id = id;
        this.marque = marque;
        this.model = model;
        this.matricule = matricule;
        this.client = client;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getMarque() {
        return marque;
    }

    public void setMarque(String marque) {
        this.marque = marque;
    }

    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public String getMatricule() {
        return matricule;
    }

    public void setMatricule(String matricule) {
        this.matricule = matricule;
    }

    public Client getClient() {
        return client;
    }

    public void setClient(Client client) {
        this.client = client;
    }

    // toString method for debugging and logging
    @Override
    public String toString() {
        return "VoitureResponse{" +
                "id=" + id +
                ", marque='" + marque + '\'' +
                ", model='" + model + '\'' +
                ", matricule='" + matricule + '\'' +
                ", client=" + client +
                '}';
    }
}

