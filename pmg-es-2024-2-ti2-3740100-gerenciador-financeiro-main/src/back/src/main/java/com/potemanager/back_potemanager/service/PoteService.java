package com.potemanager.back_potemanager.service;

import java.util.List;
import java.util.Objects;

import com.potemanager.back_potemanager.model.Notificacao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.potemanager.back_potemanager.model.Pote;
import com.potemanager.back_potemanager.model.Projection.PoteProjection;
import com.potemanager.back_potemanager.model.User;
import com.potemanager.back_potemanager.model.enums.ProfileEnum;
import com.potemanager.back_potemanager.repository.PoteRepository;
import com.potemanager.back_potemanager.security.UserSpringSecurity;
import com.potemanager.back_potemanager.service.exception.AuthorizationException;


@Service
public class PoteService {
    
    @Autowired
    private PoteRepository poteRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private NotificacaoService notificacaoService;

    public Pote findById(Long id){

        Pote pote = this.poteRepository.findById(id).orElseThrow(() -> new RuntimeException(
            "Pote não encontrado! Id: " + id + ", Tipo: " + Pote.class.getName()
        ));

        UserSpringSecurity userSpringSecurity = UserService.authenticated();
        if(Objects.isNull(userSpringSecurity) || !userSpringSecurity.hasRole(ProfileEnum.ADMIN) && !userHasPote(userSpringSecurity, pote))

            throw new AuthorizationException("Acesso negado!");

        return pote;
    }

    public List<PoteProjection> findAllByUser(){

        UserSpringSecurity userSpringSecurity = UserService.authenticated();
        if(Objects.isNull(userSpringSecurity))

            throw new AuthorizationException("Acesso negado!");

        List<PoteProjection> potes = this.poteRepository.findByUser_Id(userSpringSecurity.getId());
        return potes;
    }

    @Transactional
    public Pote create(Pote obj){

        UserSpringSecurity userSpringSecurity = UserService.authenticated();
        if(Objects.isNull(userSpringSecurity))

            throw new AuthorizationException("Acesso negado!");

        User user = this.userService.findById(userSpringSecurity.getId());
        obj.setId(null);
        obj.setUser(user);
        obj = this.poteRepository.save(obj);
        Notificacao notificao = new Notificacao();
        notificao.setMensagem("Pote " + obj.getNomePote() + " criado com sucesso!");
        notificao.setTipoDeNotificacao("sucesso");
        notificao.setUser(user);
        this.notificacaoService.create(notificao);
        return obj;
    }
    
    @Transactional
    public Pote update(Pote obj){
        Pote newObj = findById(obj.getId());
        newObj.setCategoria(obj.getCategoria());
        newObj.setReceitaMensal(obj.getReceitaMensal());
        newObj.setValorInicial(obj.getValorInicial());
        newObj.setMetaPote(obj.getMetaPote());
        newObj.setValorMeta(obj.getValorMeta());
        newObj.setDataLimite(obj.getDataLimite());
        newObj.setNomePote(obj.getNomePote());
        // duplicado
        newObj.setValorMeta(obj.getValorMeta());

        return this.poteRepository.save(newObj);
    }

    public void delete(Long id){
        findById(id);
        try{
            this.poteRepository.deleteById(id);
        }catch(Exception e){
             throw new RuntimeException("Não é possível excluir pois há entidades relacionadas");
        }

    }

    private Boolean userHasPote(UserSpringSecurity userSpringSecurity, Pote pote){
        return pote.getUser().getId().equals(userSpringSecurity.getId());
    }

}