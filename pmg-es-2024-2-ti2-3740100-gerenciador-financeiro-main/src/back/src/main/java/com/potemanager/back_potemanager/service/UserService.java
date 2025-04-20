package com.potemanager.back_potemanager.service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import com.potemanager.back_potemanager.model.DTO.UserLerNotificacoesDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.potemanager.back_potemanager.model.DTO.UserCreateDTO;
import com.potemanager.back_potemanager.model.DTO.UserUpdateDTO;
import com.potemanager.back_potemanager.model.User;
import com.potemanager.back_potemanager.model.enums.ProfileEnum;
import com.potemanager.back_potemanager.repository.UserRepository;
import com.potemanager.back_potemanager.security.UserSpringSecurity;
import com.potemanager.back_potemanager.service.exception.AuthorizationException;
import com.potemanager.back_potemanager.service.exception.DataBindingViolationException;
import com.potemanager.back_potemanager.service.exception.ObjectNotFoundException;

import jakarta.validation.Valid;


@Service
public class UserService {

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;
    
    @Autowired
    private UserRepository userRepository;

    public User findById(Long id) throws AuthorizationException {
        UserSpringSecurity userSpringSecurity = authenticated();
        if (!Objects.nonNull(userSpringSecurity)
                || !userSpringSecurity.hasRole(ProfileEnum.ADMIN) && !id.equals(userSpringSecurity.getId()))
            throw new AuthorizationException("Acesso negado!");

        Optional<User> user = this.userRepository.findById(id);
        return user.orElseThrow(() -> new ObjectNotFoundException(
                "Usuário não encontrado! Id: " + id + ", Tipo: " + User.class.getName()));
    }

    @Transactional
    public User create(User obj) {
        obj.setId(null);
        obj.setPassword(this.bCryptPasswordEncoder.encode(obj.getPassword()));
        obj.setProfiles(Stream.of(ProfileEnum.USER.getCode()).collect(Collectors.toSet()));
        obj = this.userRepository.save(obj);
        return obj;
    }
    
    @Transactional
    public User update(User obj) {
        User newObj = findById(obj.getId());
        // duplicado
        newObj.setPassword(obj.getPassword());
        newObj.setPassword(this.bCryptPasswordEncoder.encode(obj.getPassword()));
        return this.userRepository.save(newObj);
    }

    public void delete(Long id) {
        findById(id);
        try {
            this.userRepository.deleteById(id);
        } catch (Exception e) {
            throw new DataBindingViolationException("Não é possível excluir pois há entidades relacionadas!");
        }
    }
    // code review
    public void lerNotificacoes(UserLerNotificacoesDTO obj) {
        UserSpringSecurity userSpringSecurity = authenticated();
        if (!Objects.nonNull(userSpringSecurity)) {
            throw new AuthorizationException("Acesso negado!");
        }

        User newObj = findById(userSpringSecurity.getId());
        List<Long> newObjNotificacoesLidas = newObj.getNotificacoesLidas();
        newObjNotificacoesLidas.addAll(obj.getNotificacoes());
        newObj.setNotificacoesLidas(newObjNotificacoesLidas);

        this.userRepository.save(newObj);
    }

    // code review
    public static UserSpringSecurity authenticated() {
        try {
            return (UserSpringSecurity) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        } catch (Exception e) {
            return null;
        }
    }

    public User fromDTO(@Valid UserCreateDTO obj) {
        User user = new User();
        user.setEmail(obj.getEmail());
        user.setPassword(obj.getPassword());
        return user;
    }

    public User fromDTO(@Valid UserUpdateDTO obj) {
        User user = new User();
        user.setId(obj.getId());
        user.setPassword(obj.getPassword());
        return user;
    }
}
