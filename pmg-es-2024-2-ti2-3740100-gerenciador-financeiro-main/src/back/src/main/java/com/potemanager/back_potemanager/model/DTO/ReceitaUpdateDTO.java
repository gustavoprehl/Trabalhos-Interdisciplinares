package com.potemanager.back_potemanager.model.DTO;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
// Poderia ter utilizado um record ao invés de uma classe para os DTOs.
public class ReceitaUpdateDTO {
    @NotNull
    @Min(1)
    private Double valor;

    @NotBlank
    private String tipoReceita;

    @NotBlank
    private String categoria;

    @NotBlank
    private String descricao;
}