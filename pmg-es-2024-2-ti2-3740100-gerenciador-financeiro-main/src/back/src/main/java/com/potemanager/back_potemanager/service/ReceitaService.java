package com.potemanager.back_potemanager.service;

import com.potemanager.back_potemanager.model.DTO.ReceitaUpdateDTO;
import com.potemanager.back_potemanager.model.Receita;
import com.potemanager.back_potemanager.repository.ReceitaRepository;
import com.potemanager.back_potemanager.security.UserSpringSecurity;
import com.potemanager.back_potemanager.service.exception.AuthorizationException;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class ReceitaService {

    @Autowired
    private PoteService poteService;

    @Autowired
    private ReceitaRepository receitaRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private NotificacaoService notificacaoService;

    public Receita buscarPorId(Long id) {
        UserSpringSecurity userSpringSecurity = UserService.authenticated();
        if(Objects.isNull(userSpringSecurity))

            throw new AuthorizationException("Acesso negado!");

        // O uso dessa recursividade não faz sentido; além disso, não há condição de parada, o que pode levar a um loop infinito.
        Receita receita = buscarPorId(id);

        if(!this.poteService.findById(receita.getPoteId()).getUser().getId().equals(userSpringSecurity.getId())) {
            throw new AuthorizationException("Acesso negado!");
        }

        return this.receitaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Receita não encontrada: " + id));
    }

    public List<Receita> listarTodas() {
        return this.receitaRepository.findAll();
    }

    @Transactional
    public Receita criarReceita(Receita receita) {
        // Falta validação se o receita.getPoteId() pertence ao usuário logado, o que permite potencial inserção em potes de outros usuários.
        // Utilizar DTO remove a necessidade de chamar setId, tornando desnecessário chamar mais de um método dentro de criarReceita.
        receita.setId(null);

        return this.receitaRepository.save(receita);
    }

    @Transactional
    public Receita atualizarReceita(Long id, @Valid ReceitaUpdateDTO receitaAtualizada) {
        UserSpringSecurity userSpringSecurity = UserService.authenticated();
        if(Objects.isNull(userSpringSecurity))
            throw new AuthorizationException("Acesso negado!");

        Optional<Receita> receita = this.receitaRepository.findById(id);

        if(receita.isPresent()) {
            Receita receitaExistente = receita.get();
            if(!this.poteService.findById(receitaExistente.getPoteId()).getUser().getId().equals(userSpringSecurity.getId())) {
                throw new AuthorizationException("Acesso negado!");
            }

            receitaExistente.setValor(receitaAtualizada.getValor());
            receitaExistente.setTipoReceita(receitaAtualizada.getTipoReceita());
            receitaExistente.setCategoria(receitaAtualizada.getCategoria());
            receitaExistente.setDescricao(receitaAtualizada.getDescricao());

            return this.receitaRepository.save(receitaExistente);
        } else {
            throw new RuntimeException("Receita não encontrada: " + id);
        }
    }

    public void deletarReceita(Long id) {
        UserSpringSecurity userSpringSecurity = UserService.authenticated();
        if(Objects.isNull(userSpringSecurity))

            throw new AuthorizationException("Acesso negado!");

        Optional<Receita> receita = this.receitaRepository.findById(id);

        if(receita.isPresent()) {
            Receita receitaExistente = receita.get();
            if(!this.poteService.findById(receitaExistente.getPoteId()).getUser().getId().equals(userSpringSecurity.getId())) {
                throw new AuthorizationException("Acesso negado!");
            }

            this.receitaRepository.deleteById(receitaExistente.getId());
        } else {
            throw new RuntimeException("Receita não encontrada: " + id);
        }
    }

    // Uso de lista ao invés de array, pois é mais flexível e fácil de manipular.
    public Receita[] buscarPorPoteId(Long id) {
        return this.receitaRepository.findAll().stream().filter((receita -> Objects.equals(receita.getPoteId(), id))).toArray(Receita[]::new);
    }
}
