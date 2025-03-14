### 3.3.1 Processo 1 – Elaboração de Orçamento
Nome do Processo: Elaboração de Orçamento

![image](https://github.com/user-attachments/assets/a940ddac-9692-4eb6-b6f6-5b081f34e78f)




Oportunidades de melhoria: Atualmente, muitos usuários gerenciam seu orçamento de maneira desorganizada, sem uma alocação clara de suas receitas e prioridades financeiras. O processo de Elaboração de Orçamento busca automatizar essa distribuição de receitas, permitindo que o usuário defina metas e priorize gastos. Além disso, a automatização pode:

Reduzir o risco de despesas impulsivas.
Melhorar o controle financeiro.
Facilitar o alcance de metas financeiras.
Aumentar a transparência nos gastos.

A seguir está o detalhamento das principais atividades:

Verificação de Cadastro:

O sistema verifica se o usuário já possui um cadastro.
Se o usuário estiver cadastrado, ele é direcionado para fazer login.
Se o usuário não estiver cadastrado, ele deve realizar o cadastro antes de prosseguir.

Criação de Potes Financeiros Personalizados:

Após o login, o usuário pode criar seus potes financeiros personalizados. Cada pote corresponde a uma categoria de gastos (ex.: moradia, lazer, poupança).
Esta etapa permite que o usuário tenha controle detalhado sobre suas finanças, alocando valores específicos para cada necessidade.

Definir Meta Financeira para os Potes:

O usuário define uma meta financeira para cada pote. Isso envolve a quantia que ele pretende economizar ou gastar em cada categoria financeira.

Definir Data Limite para Potes:

Nesta etapa, o usuário estabelece uma data limite para cumprir suas metas financeiras. Este prazo é importante para o acompanhamento e o cumprimento dos objetivos de cada pote.
Alocação de Receita Mensal em Potes:

O sistema permite que o usuário aloque sua receita mensal nos potes criados. Essa distribuição é automática e baseada nas metas definidas para cada pote.

Revisão das Alocações de Receitas:

Com o passar do tempo, o usuário pode revisar as alocações de receita. Ele pode ajustar os valores conforme suas necessidades ou mudanças em sua situação financeira.

Gerar Relatórios de Progresso:

O sistema gera relatórios de progresso, mostrando ao usuário o desempenho de cada pote em relação à meta estabelecida.
Esses relatórios auxiliam o usuário a visualizar de forma clara se está conseguindo atingir suas metas financeiras ou se precisa fazer ajustes.
Esse processo é fundamental para garantir que o usuário tenha um planejamento financeiro eficiente e organizado, facilitando o controle e a gestão de suas finanças pessoais. Ele promove disciplina financeira ao permitir que o usuário defina metas, acompanhe seu progresso e revise suas alocações ao longo do tempo.


### Detalhamento das Atividades:
**Nome da Atividade 1: Verificar se o usuário possui cadastro**

| **Campo**    | **Tipo**          | **Restrições**            | **Valor default**      |
| ---          | ---               | ---                       | ---                    |
| E-mail       | Caixa de Texto    | Deve ser um e-mail válido |            -           |
| Senha        | Campo de Senha    | Mínimo de 8 caracteres    |            -           |


| **Comandos**         |  **Destino**            | **Tipo**         |
| ---                  | ---                     | ---              |
| Entrar               | Fazer login             | Default          |
| Cadastrar-se         | Realizar cadastro       | Cancel           |

**Nome da atividade 2: Realizar Cadastro**

| **Campo**           | **Tipo**          | **Restrições**                                    | **Valor default**    |
| ---                 | ---               | ---                                               | ---                  |
| Nome Completo       | Caixa de Texto    | Mínimo de 5 caracteres, sem caracteres especiais  |           -          |
| E-mail              | Caixa de Texto    | Deve ser único                                    |           -          |
| Senha               | Campo de Senha    | Mínimo de 8 caracteres                            |           -          |
| Confirmar Senha     | Campo de Senha    | Deve coincidir com a senha                        |           -          |

| **Comandos**         |  **Destino**                   | **Tipo**         |
| ---                  | ---                            | ---              |
| Criar Conta          | Início da criação de potes     | Default          |
| Cancela              | Página anterior                | Cancel           |

**Nome da atividade 3: Criar Potes Financeiros Personalizados**

| **Campo**           | **Tipo**         | **Restrições**                | **Valor default**    |
| ---                 | ---              | ---                           | ---                  |
| Nome do Pote        | Caixa de Texto   | Máximo de 50 caracteres       |           -          |
| Categoria do Pote   | Seleção Única    | Deve ser uma categoria válida |           -          |
| Valor Inicial       | Número           | Deve ser maior que zero       |           -          |

| **Comandos**         |  **Destino**                   | **Tipo**         |
| ---                  | ---                            | ---              |
| Continuar            | Definir metas financeiras      | Default          |
| Voltar               | Página anterior                | Cancel           |

**Nome da atividade 4: Definir Meta Financeira para Potes**

| **Campo**           | **Tipo**         | **Restrições**            | **Valor default**    |
| ---                 | ---              | ---                       | ---                  |
| Meta do Pote        | Caixa de Texto   | Máximo de 100 caracteres  |           -          |
| Valor da Meta       | Número           | Deve ser maior que zero   |           -          |

| **Comandos**         |  **Destino**                       | **Tipo**         |
| ---                  | ---                                | ---              |
| Continuar            | Definir data limite para potes     | Default          |
| Voltar               | Página anterior                    | Cancel           |

**Nome da atividade 5: Definir Data Limite para Potes**

| **Campo**           | **Tipo**    | **Restrições**                 | **Valor default**    |
| ---                 | ---         | ---                            | ---                  |
| Data Limite         | Data        | Não pode ser uma data passada  | Nome do Pote         |
| Data de Conclusão   | Data        | Não pode ser uma data futura   | Data atual           |

| **Comandos**         |  **Destino**                     | **Tipo**         |
| ---                  | ---                              | ---              |
| Continuar            | Alocar receita mensal nos potes  | Default          |
| Voltar               | Página anterior                  | Cancel           |

**Nome da atividade 6: Alocar Receita Mensal em Potes**

| **Campo**           | **Tipo**      | **Restrições**            | **Valor default**    |
| ---                 | ---           | ---                       | ---                  |
| Valor Alocado       | 	Número      | Deve ser maior que zero   |           -          |

| **Comandos**         |  **Destino**          | **Tipo**         |
| ---                  | ---                   | ---              |
| Continuar            | Revisar alocações     | Default          |
| Voltar               | Página anterior       | Cancel           |

**Nome da atividade 7: Revisar Alocações de Receitas**

| **Campo**           | **Tipo**         | **Restrições**       | **Valor default**    |
| ---                 | ---              | ---                  | ---                  |
| Revisão             | Caixa de Texto   |           -          |           -          |

| **Comandos**         |  **Destino**                       | **Tipo**         |
| ---                  | ---                                | ---              |
| Continuar            | Gerar relatórios de progresso      | Default          |
| Voltar               | Página anterior                    | Cancel           |

**Nome da atividade 8: Gerar Relatórios de Progresso**

| **Campo**           | **Tipo**         | **Restrições**       | **Valor default**    |
| ---                 | ---              | ---                  | ---                  |
| Relatór             | Imagem/Arquivo   |           -          |           -          |

| **Comandos**         |  **Destino**           | **Tipo**         |
| ---                  | ---                    | ---              |
| Finalizar            | Fim do processo        | Default          |
| Voltar               | Página anterior        | Cancel           |
