package com.example.CRUD.repository;

import com.example.CRUD.entity.ClienteEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ClienteRepository extends JpaRepository<ClienteEntity, Integer> {

    // Buscar por nome
    List<ClienteEntity> findByNomeContainingIgnoreCase(String nome);


}
