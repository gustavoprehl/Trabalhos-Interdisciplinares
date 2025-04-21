package com.potemanager.back_potemanager.model.DTO;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class UserUpdateDTO {

    // Não há verificação para o id, porém, ele é obrigatório para updates.
    private Long id;

    @NotBlank
    @Size(min=8, max = 255)
    private String password;

}