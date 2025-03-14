package com.potemanager.back_potemanager.service;

import com.potemanager.back_potemanager.model.Notificacao;
import com.potemanager.back_potemanager.model.enums.ProfileEnum;
import com.potemanager.back_potemanager.repository.NotificacaoRepository;
import com.potemanager.back_potemanager.security.UserSpringSecurity;
import com.potemanager.back_potemanager.service.exception.AuthorizationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Objects;

@Service
public class NotificacaoService {
    @Autowired
    private UserService userService;

    @Autowired
    private NotificacaoRepository notificacaoRepository;

    @Transactional
    public Notificacao create(Notificacao obj) {
        obj = this.notificacaoRepository.save(obj);
        return obj;
    }

    public Notificacao[] findByUserId(Long id) {
        UserSpringSecurity userSpringSecurity = UserService.authenticated();
        if (!Objects.nonNull(userSpringSecurity) || !id.equals(userSpringSecurity.getId()))
            throw new AuthorizationException("Acesso negado!");

        return this.notificacaoRepository.findAll().stream()
                .filter(notificacao -> notificacao.getUser().getId().equals(id))
                .toArray(Notificacao[]::new);  // Corrigido aqui, convertendo para Notificacao[]
    }

}
