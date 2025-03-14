package com.potemanager.back_potemanager.model.Projection;

import java.time.LocalDate;

public interface PoteProjection {

    public Long getId();

    public String getNomePote();

    public Double getValorInicial();

    public String getMetaPote();

    public Double getValorMeta();

    public LocalDate getDataLimite();

    public Double getReceitaMensal();

    public String getCategoria();
}

