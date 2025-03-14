package com.potemanager.back_potemanager.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.potemanager.back_potemanager.model.Pote;
import com.potemanager.back_potemanager.model.Projection.PoteProjection;

@Repository
public interface PoteRepository extends JpaRepository<Pote, Long> {

    List<PoteProjection> findByUser_Id(Long id);
    //List<PoteProjection> findAll();
    
}
