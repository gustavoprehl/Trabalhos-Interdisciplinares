package com.potemanager.back_potemanager.service;

import java.util.Objects;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.potemanager.back_potemanager.model.User;
import com.potemanager.back_potemanager.repository.UserRepository;
import com.potemanager.back_potemanager.security.UserSpringSecurity;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        
        User user = this.userRepository.findByEmail(email);
        if (Objects.isNull(user))
            throw new UsernameNotFoundException("Email not found: " + email);
        return new UserSpringSecurity(user.getId(), user.getEmail(), user.getPassword(), user.getProfiles());

        
        // throw new UnsupportedOperationException("Unimplemented method 'loadUserByUsername'");
    }


}