## 5. Indicadores de desempenho

_Apresente aqui os principais indicadores de desempenho e algumas metas para o processo. Atenção: as informações necessárias para gerar os indicadores devem estar contempladas no modelo relacional. Defina no mínimo 3 indicadores de desempenho._

# Sistema de Gestão Financeira Pessoal

Este repositório contém o sistema de Gestão Financeira Pessoal que permite o controle detalhado das finanças, organização de despesas e receitas em potes financeiros, e acompanhamento de metas financeiras. O sistema oferece uma interface para o usuário gerenciar seus potes de forma eficiente, incluindo funcionalidades como alocação de receitas e despesas, revisão de alocações e geração de relatórios de progresso. 

## Processos Principais

### 1. Verificação de Cadastro e Criação de Potes Financeiros Personalizados

Este processo envolve a criação e configuração dos potes financeiros personalizados, permitindo ao usuário alocar receitas e despesas em categorias específicas para um controle financeiro mais detalhado.

### 2. Gerenciamento de Despesas

Este processo permite ao usuário registrar e classificar despesas, verificar limites de saldo dos potes, atualizar saldos após transações e receber notificações de atualização.

### 3. Gerenciamento de Receitas

Neste processo, o usuário registra e classifica as receitas, assegurando que elas sejam alocadas nos potes corretos e que os saldos sejam atualizados automaticamente.

### 4. Gestão de Metas Financeiras

Este processo permite definir, acompanhar e alcançar metas financeiras específicas. O sistema oferece oportunidades de melhoria, como alertas de progresso e ajustes automáticos de valores alocados nos potes com base no desempenho das metas.

## Indicadores de Desempenho

Abaixo estão os principais indicadores de desempenho definidos para cada processo, acompanhados de seus objetivos, descrições, fontes de dados e fórmulas de cálculo.

| Indicador                              | Objetivo                                                             | Descrição                                                                                     | Fonte de dados                | Fórmula de cálculo                                                   |
|----------------------------------------|----------------------------------------------------------------------|------------------------------------------------------------------------------------------------|-------------------------------|-----------------------------------------------------------------------|
| **Média de Potes por Usuário Mensal**      | Monitorar a média de potes ativos por usuário ativo     | Média de potes ativos criados pelos usuários ativos            | Tabela Potes e Tabela Usuários              |(Número de potes ativos / Número de usuários ativos) * 100   |
| **Percentual de Metas Atingidas**      | Avaliar o cumprimento de metas financeiras definidas nos potes       | Percentual de potes que atingiram a meta financeira no período                                 | Tabela Potes                  | (Número de potes com meta atingida / Número total de potes) * 100     |
| **Taxa de Sucesso (Potes)** | Avaliar a proporção de potes com saldo final maior que zero       | Percentual de potes cujo valor final é maior que 0 em relação ao total de potes                         | Tabela Potes               | (Número de potes com valor final > 0 / Número total de potes) * 100             |


---
