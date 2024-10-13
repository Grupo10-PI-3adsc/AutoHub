package com.example.CRUD.repository;

import com.example.CRUD.entity.MaoDeObrEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MaoDeObraRepository extends JpaRepository<MaoDeObrEntity, Integer> {

    List<MaoDeObrEntity> findAllByFkUser(Integer id);

    Optional<MaoDeObrEntity> findByFkUser(Integer id);
}
