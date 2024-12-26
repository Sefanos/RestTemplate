package com.example.voiture;

import com.example.voiture.Entities.Voiture;
import com.example.voiture.repositories.VoitureRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.Bean;
import org.springframework.http.client.SimpleClientHttpRequestFactory;
import org.springframework.web.client.RestTemplate;

@SpringBootApplication
@EnableDiscoveryClient
@EnableFeignClients
public class VoitureApplication {

    public static void main(String[] args) {
        SpringApplication.run(VoitureApplication.class, args);
    }

    @Bean
    public RestTemplate restTemplate() {
        RestTemplate restTemplate = new RestTemplate();
        SimpleClientHttpRequestFactory requestFactory = new SimpleClientHttpRequestFactory();
        requestFactory.setConnectTimeout(5000);
        requestFactory.setReadTimeout(5000);
        restTemplate.setRequestFactory(requestFactory);
        return restTemplate;
    }

    @Bean
    CommandLineRunner testDataLoader(VoitureRepository voitureRepository) {
        return args -> {
            voitureRepository.save(new Voiture(null, "Toyota", "A 25 333", "Corolla", 1L));
            voitureRepository.save(new Voiture(null, "Renault", "B 6 3456", "Megane", 2L));
            voitureRepository.save(new Voiture(null, "Peugeot", "A 55 4444", "301", 1L));
            voitureRepository.save(new Voiture(null, "Ford", "C 77 5555", "Focus", 3L));

            System.out.println("Test data for Voiture successfully loaded!");
        };
    }
}
