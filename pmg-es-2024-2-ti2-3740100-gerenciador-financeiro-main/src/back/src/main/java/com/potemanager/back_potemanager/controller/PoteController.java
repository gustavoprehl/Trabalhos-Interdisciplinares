package com.potemanager.back_potemanager.controller;

import java.net.URI;
import java.util.List;

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

import com.potemanager.back_potemanager.model.Pote;
import com.potemanager.back_potemanager.model.Projection.PoteProjection;
import com.potemanager.back_potemanager.service.PoteService;

import jakarta.validation.Valid;


@RestController
@RequestMapping("/pote")
@Validated
public class PoteController {
    
    @Autowired
    private PoteService poteService;
    
    @GetMapping("/{id}")
    public ResponseEntity<Pote> findById(@PathVariable Long id){
        Pote obj = this.poteService.findById(id);
        return ResponseEntity.ok().body(obj);
    }

    @GetMapping("/user") 
    public ResponseEntity<List<PoteProjection>> findAllByUser(){
        List<PoteProjection> objs = this.poteService.findAllByUser();
        return ResponseEntity.ok(objs);
    } 

    @PostMapping
    @Validated
    public ResponseEntity<Pote> create(@Valid @RequestBody Pote obj){
        Pote pote = this.poteService.create(obj);
        return ResponseEntity.ok(pote);
    }

    @PutMapping("/{id}")
    @Validated
    public ResponseEntity<Void> update(@Valid @RequestBody Pote obj, @PathVariable Long id){
        obj.setId(id);
        this.poteService.update(obj);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id){
        this.poteService.delete(id);
        return ResponseEntity.noContent().build();
    }

}