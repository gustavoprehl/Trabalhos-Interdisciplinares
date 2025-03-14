package com.potemanager.back_potemanager.model.enums;

import java.util.Objects;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum ProfileEnum {
    ADMIN(1, "ROLE_AD"),
    USER(2, "ROLE_USER");

    private Integer code;
    private String description;

    public static ProfileEnum toEnum(Integer code){
        if(Objects.isNull(code))
            return null;

        for(ProfileEnum x : ProfileEnum.values()){
            if(code.equals(x.getCode()))
                return x;
        }
         
        throw new IllegalArgumentException("Invalid code: " + code);
    }
}
