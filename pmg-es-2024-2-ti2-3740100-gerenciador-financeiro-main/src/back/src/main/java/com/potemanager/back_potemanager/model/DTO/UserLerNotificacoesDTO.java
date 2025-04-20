package com.potemanager.back_potemanager.model.DTO;

import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class UserLerNotificacoesDTO {

    @NotEmpty
    // @NotNull(message = "A lista de notificações não pode ser nula")
    private List<Long> notificacoes;
}
