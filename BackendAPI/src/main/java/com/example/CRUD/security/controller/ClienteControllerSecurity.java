package com.example.CRUD.security.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user")
public class ClienteControllerSecurity {
    @GetMapping
    public ResponseEntity<String> getUser() {
        return ResponseEntity.ok("Sucesso!");
    }
}
