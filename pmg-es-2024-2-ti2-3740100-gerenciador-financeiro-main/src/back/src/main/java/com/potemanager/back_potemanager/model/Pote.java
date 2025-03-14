package com.potemanager.back_potemanager.model;

import java.time.Instant;
import java.time.LocalDate;
import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.UpdateTimestamp;

@Entity
@Table(name = Pote.TABLE_NAME)
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Pote {
    public static final String TABLE_NAME = "pote";

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", unique = true)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false, updatable = false)
    private User user;

    @Column(name = "nome_pote", nullable = false, length = 50)
    @NotBlank
    @Size(min = 1, max = 50)
    private String nomePote;

    @Column(name = "categoria", nullable = false, length = 50)
    @NotBlank
    private String categoria;

    @Column(name = "valor_inicial", nullable = false)
    @DecimalMin(value = "0.0", inclusive = false, message = "O valor inicial deve ser maior que zero")
    private Double valorInicial;

    @Column(name = "meta_pote", nullable = false, length = 50)
    @NotBlank
    @Size(min = 1, max = 9)
    private String metaPote;

    @Column(name = "valor_meta", nullable = false)
    @NotNull
    @DecimalMin(value = "0.0", inclusive = false, message = "O valor da meta deve ser maior que zero")
    private Double valorMeta;

    @Column(name = "data_limite", nullable = false)
    @NotNull(message = "A data limite não pode ser nula")
    private LocalDate dataLimite;

    @Column(name = "receita_mensal", nullable = false)
    @NotNull
    @DecimalMin(value = "0.0", inclusive = false, message = "A receita mensal deve ser maior que zero")
    private Double receitaMensal;

    //@Column(name = "updated_on")
    //@UpdateTimestamp
    //private Date updatedOn;
}
