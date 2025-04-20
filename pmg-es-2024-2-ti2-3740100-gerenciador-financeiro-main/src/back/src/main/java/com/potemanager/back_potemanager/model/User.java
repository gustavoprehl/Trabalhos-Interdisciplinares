package com.potemanager.back_potemanager.model;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;
import com.potemanager.back_potemanager.model.enums.ProfileEnum;

import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "user")
@AllArgsConstructor
@NoArgsConstructor
@Data
public class User {

    public interface CreateUser {
    }

    public interface UptadeUser {
    }

    public static final String TABLE_NAME = "user";

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", unique = true)
    private Long id;

    @Column(name = "email", unique = true, nullable = false)
    @NotBlank
    @Size(min = 2, max = 50)
    private String email;

    @JsonProperty(access = Access.WRITE_ONLY)
    @Column(name = "password", length = 255, nullable = false)
    @NotBlank
    @Size(min=8, max = 255)
    private String password;

    @OneToMany(mappedBy = "user")
    @JsonProperty(access = Access.WRITE_ONLY)
    // renomear
    private List<Pote> pote = new ArrayList<Pote>();

    @ElementCollection(fetch = FetchType.EAGER)
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @CollectionTable(name = "user_profile")
    @Column(name = "profile", nullable = false)
    private Set<Integer> profiles = new HashSet<>();

    @ElementCollection()
    @Column(name= "notificacoesLidas", nullable = true)
    // criar método pra não acessar diretamente
    private List<Long> notificacoesLidas = new ArrayList<Long>();
    
    public Set<ProfileEnum> getProfiles(){
        return this.profiles.stream().map(x -> ProfileEnum.toEnum(x)).collect(Collectors.toSet());
    }

    public void addProfile(ProfileEnum profileEnum){
        this.profiles.add(profileEnum.getCode());
    }

    //@CreationTimestamp
    //private LocalDateTime createdAt;
    //@UpdateTimestamp
    //private LocalDateTime updatedAt;
    
}