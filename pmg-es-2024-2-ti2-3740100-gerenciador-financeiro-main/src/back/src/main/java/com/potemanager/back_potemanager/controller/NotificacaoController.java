package com.potemanager.back_potemanager.controller;

import com.potemanager.back_potemanager.model.Notificacao;
import com.potemanager.back_potemanager.model.Pote;
import com.potemanager.back_potemanager.model.User;
import com.potemanager.back_potemanager.security.UserSpringSecurity;
import com.potemanager.back_potemanager.service.NotificacaoService;
import com.potemanager.back_potemanager.service.UserService;
import com.potemanager.back_potemanager.service.exception.AuthorizationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/notificacoes")
@Validated
public class NotificacaoController {
    @Autowired
    private UserService userService;

    @Autowired
    private NotificacaoService notificacaoService;

    @GetMapping("/user")
    public ResponseEntity<List<Notificacao>> findById(){
        UserSpringSecurity userSpringSecurity = UserService.authenticated();
        if(Objects.isNull(userSpringSecurity))
            throw new AuthorizationException("Acesso negado!");

        User user = userService.findById(userSpringSecurity.getId());
        List<Notificacao> notificacoes = Arrays.asList(this.notificacaoService.findByUserId(userSpringSecurity.getId()));

        List<Notificacao> notificacoesFiltradas = notificacoes.stream()
                .filter(notificacao -> !user.getNotificacoesLidas().contains(notificacao.getId()))
                .collect(Collectors.toList());
        return ResponseEntity.ok().body(notificacoesFiltradas);
    }
}
