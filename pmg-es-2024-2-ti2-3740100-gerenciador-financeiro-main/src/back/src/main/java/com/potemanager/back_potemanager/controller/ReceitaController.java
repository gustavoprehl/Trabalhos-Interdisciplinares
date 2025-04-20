package com.potemanager.back_potemanager.controller;

import java.net.URI;
import java.util.List;

import com.potemanager.back_potemanager.model.DTO.ReceitaUpdateDTO;
import com.potemanager.back_potemanager.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.potemanager.back_potemanager.model.Receita;
import com.potemanager.back_potemanager.service.ReceitaService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/receitas")
@Validated
public class ReceitaController {
    
    @Autowired
    private ReceitaService receitaService;

    // **1. Buscar receita por ID**
    @GetMapping("/{id}")
    public ResponseEntity<Receita> findById(@PathVariable Long id) {
        Receita receita = this.receitaService.buscarPorId(id);
        return ResponseEntity.ok(receita);
    }

    // **2. Listar todas as receitas**
    @GetMapping
    public ResponseEntity<List<Receita>> findAll() {
        List<Receita> receitas = this.receitaService.listarTodas();
        return ResponseEntity.ok(receitas);
    }
    // acessa o pote?
    @GetMapping("/pote/{id}")
    public ResponseEntity<Receita[]> findByPote(@PathVariable Long id) {
        Receita[] receitas = this.receitaService.buscarPorPoteId(id);
        return ResponseEntity.ok(receitas);
    }


    // **3. Criar nova receita**
    @PostMapping
    @Validated
    public ResponseEntity<Receita> create(@Valid @RequestBody Receita receita) {
        Receita novaReceita = this.receitaService.criarReceita(receita);

        return ResponseEntity.ok(novaReceita);
    }

    // **4. Atualizar uma receita existente**
    @PutMapping("/{id}")
    @Validated
    public ResponseEntity<Void> update(@Valid @RequestBody ReceitaUpdateDTO receitaAtualizada, @PathVariable Long id) {
        this.receitaService.atualizarReceita(id, receitaAtualizada);
        return ResponseEntity.noContent().build();
    }

    // **5. Excluir receita por ID**
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        this.receitaService.deletarReceita(id);
        return ResponseEntity.noContent().build();
    }
}
