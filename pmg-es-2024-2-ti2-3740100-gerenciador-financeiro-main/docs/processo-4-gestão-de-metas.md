### 3.3.4 Processo 4 – Gestão de metas
 

![Gestão de Metas Diagrama (4)](https://github.com/user-attachments/assets/78b3257a-7416-4aef-a690-80f3cedbbc2f)



O processo de "Gestão de Metas" é essencial para o sucesso do usuário no controle financeiro pessoal, permitindo que ele defina, acompanhe e alcance objetivos financeiros específicos. As oportunidades de melhoria incluem a automatização do acompanhamento das metas, a criação de alertas personalizados para o progresso das metas e a integração com os potes financeiros para ajustar automaticamente os valores alocados com base no desempenho das metas.


#### Detalhamento das atividades

**Atividade 1: Verificar se o usuário está logado**

| **Campo**       | **Tipo**         | **Restrições** | **Valor default** |
| ---             | ---              | ---            | ---               |
| E-mail   | Caixa de Texto   |       Deve ser um e-mail válido         |         -          |
| Senha      |     Campo de Senha       | Mínimo de 8 caracteres |        -       |

| **Comandos**         |  **Destino**                   | **Tipo** |
| ---                  | ---                            | ---      |
|    Entrar        | Verificar se o usuário está cadastrado |  default |
|      Cadastrar-se          |          Realizar Cadastro       |  cancel  |


**Atividade 2: Realizar Cadastro**

| **Campo**       | **Tipo**         | **Restrições** | **Valor default** |
| ---             | ---              | ---            | ---               |
| Nome Completo   | Caixa de Texto   |       Mínimo de 5 caracteres, sem caracteres especiais (apenas letras, espaços e apóstrofos)        |       -        |
| E-mail     |     Caixa de Texto       | Deve ser único |        -       |
| Senha           | Campo de Senha   | Mínimo de 8 caracteres |      -     |
| Confirmar Senha           | Campo de Senha   | Deve coincidir com a senha |      -     |


| **Comandos**         |  **Destino**                   | **Tipo**          |
| ---                  | ---                            | ---               |
|    Criar Conta        | 		Início da Identificação do Objetivo |  default |
|      Cancelar          |          Página Anterior       |  cancel  |

**Atividade 3: Identificar Objetivo da Meta**

| **Campo**       | **Tipo**         | **Restrições** | **Valor default** |
| ---             | ---              | ---            | ---               |
| Objetivo da Meta    | Caixa de Texto   |       Maximo de 100 caracteres         |        -         |
| Categoria     |     Seleção Única       |  Deve ser uma categoria válida   |        -       |

| **Comandos**         |  **Destino**                   | **Tipo**          |
| ---                  | ---                            | ---               |
|    Continuar        | Verificar se objetivo está cadastrado |  default |
|      Voltar          |          Página Anterior       |  cancel  |


**Atividade 4: Estabelecer Critérios de Sucesso**

| **Campo**       | **Tipo**         | **Restrições** | **Valor default** |
| ---             | ---              | ---            | ---               |
| Critérios de Sucesso  | Caixa de Texto   |       Mínimo de 5 caracteres         |       -        |

| **Comandos**         |  **Destino**                   | **Tipo**          |
| ---                  | ---                            | ---               |
|    Continuar        | Determinar valor a alocar |  default |
|      Voltar          |          Página Anterior       |  cancel  |



**Atividade 5: Determinar Valor a Alocar**

| **Campo**       | **Tipo**         | **Restrições** | **Valor default** |
| ---             | ---              | ---            | ---               |
| Valor a Alocar   | Número   |       Deve ser maior que zero         |        -        |

| **Comandos**         |  **Destino**                   | **Tipo**          |
| ---                  | ---                            | ---               |
|    Continuar       | Definir prazo |  default |
|      Voltar          |          Página Anterior      |  cancel  |



**Atividade 6: Definir Prazo**

| **Campo**       | **Tipo**         | **Restrições** | **Valor default** |
| ---             | ---              | ---            | ---               |
| Data Limite    | Data   |      Não pode ser uma data passada         |        Nome da Meta         |
| Data de Conclusão    |     Data      | Não pode ser uma data futura |       Data atual       |
| Relatório Final           | Imagem   | -  |      -     |

| **Comandos**         |  **Destino**                   | **Tipo**          |
| ---                  | ---                            | ---               |
|    Continuar       | Temporizador (Acompanhamento) |  default |
|      Voltar          |          Página Anterior       |  cancel  |



**Atividade 7: Registrar Contribuições**

| **Campo**       | **Tipo**         | **Restrições** | **Valor default** |
| ---             | ---              | ---            | ---               |
| Valor Contribuído   | Número   |       Deve ser maior que zero       |        -         |
| Data da Contribuição    |     Data      |   -   |       Data atual       |

| **Comandos**         |  **Destino**                   | **Tipo**          |
| ---                  | ---                            | ---               |
|    Continuar       | Meta Cumprida?  |  default |
|      Voltar          |         Página Anterior       |  cancel  |



**Atividade 8: Revisar Meta**

| **Campo**       | **Tipo**         | **Restrições** | **Valor default** |
| ---             | ---              | ---            | ---               |
|  Revisão da Meta    | Caixa de Texto   |       -         |        -         |
|  Novo Prazo    |     Data      | Não pode ser uma data passada |       Data atual       |

| **Comandos**         |  **Destino**                   | **Tipo**          |
| ---                  | ---                            | ---               |
|    Continuar       | Temporizador (Acompanhamento) |  default |
|      Voltar          |          	Página Anterior      |  cancel  |



**Atividade 9: Finalização da Meta**

| **Campo**       | **Tipo**         | **Restrições** | **Valor default** |
| ---             | ---              | ---            | ---               |
| Desempenho    | Caixa de Texto   |       -         |        -        |
| Relatório Final   |     Imagem/Arquivo      | - |       -     |
| Relatório Final           | Imagem   | -  |      -     |

| **Comandos**         |  **Destino**                   | **Tipo**          |
| ---                  | ---                            | ---               |
|    Finalizar       | Fim do Processo |  default |
|      Voltar          |         Página Anterior      |  cancel  |

