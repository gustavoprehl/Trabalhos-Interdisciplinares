package com.potemanager.back_potemanager.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Data
public class Receita {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    private Long poteId;

    @NotNull
    private Double valor;

    @NotNull
    private String tipoReceita;

    @NotNull
    private String categoria;

    @NotNull
    private String descricao;

    private LocalDateTime criadoEm = LocalDateTime.now();
}
