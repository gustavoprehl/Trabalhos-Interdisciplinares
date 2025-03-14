package com.potemanager.back_potemanager.repository;

import com.potemanager.back_potemanager.model.Receita;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReceitaRepository extends JpaRepository<Receita, Long> {
}
