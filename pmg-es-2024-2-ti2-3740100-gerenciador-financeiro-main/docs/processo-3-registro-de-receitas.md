### 3.3.3 Processo 3 – Registro de receitas

![Registro de despesas Diagrama (1)](https://github.com/user-attachments/assets/e6eae416-bdc0-462b-b7fe-eb395f9768bc)

Oportunidades de melhoria:

Automatização da Classificação de Receita
Melhoria: Implementar um mecanismo automatizado que sugira a categoria de receita com base em entradas anteriores ou integração com sistemas bancários que reconheçam automaticamente a origem dos depósitos.
Benefício: Redução de tempo gasto pelos usuários na classificação manual e minimização de erros humanos.

Notificações Proativas
Melhoria: Configurar notificações automáticas para lembrar os usuários de registrar receitas, ou para avisá-los quando novos valores forem identificados, evitando esquecimentos.
Benefício: Maior disciplina no registro de receitas e melhoria na completude dos dados financeiros do usuário.

## 1. Selecionar Pote

**Descrição**:  
Atividade em que o usuário seleciona o pote financeiro adequado para classificar a receita, como "Despesas", "Viagens", "Lazer", etc. Isso garante que a receita será alocada na categoria correta para facilitar o gerenciamento financeiro.

| **Campo**              | **Tipo**        | **Restrições**                                | **Valor default** |
| ---------------------- | --------------- | --------------------------------------------- | ----------------- |
| Nome do Pote           | Seleção única   | Campo obrigatório, selecionar entre potes existentes | -              |
| Descrição do Pote      | Área de Texto   | Opcional                                      | -                 |

**Comandos**:  
| **Comando**              | **Destino**           | **Tipo**  |
| ------------------------ | --------------------- | -------- |
| Confirmar Seleção         | Classificar Pote      | default  |

---

## 2. Classificar Pote

**Descrição**:  
Atividade que classifica a receita de acordo com o tipo de pote selecionado, verificando se a categoria escolhida está adequada à transação em questão.

| **Campo**                | **Tipo**        | **Restrições**                                | **Valor default** |
| ------------------------ | --------------- | --------------------------------------------- | ----------------- |
| Tipo de Pote             | Seleção única   | Campo obrigatório, selecionar categoria       | -                 |
| Justificativa            | Área de Texto   | Opcional                                      | -                 |

**Comandos**:  
| **Comando**              | **Destino**                | **Tipo**  |
| ------------------------ | -------------------------- | -------- |
| Confirmar Classificação   | Verificar Validade do Pote  | default  |

---

## 3. É um Pote Válido?

**Descrição**:  
Verificação automática do sistema para garantir que o pote selecionado está válido e disponível para o tipo de receita ou despesa que está sendo registrada.

| **Campo**            | **Tipo**        | **Restrições**                                | **Valor default** |
| -------------------- | --------------- | --------------------------------------------- | ----------------- |
| Validação de Pote    | Booleano        | Campo obrigatório                             | -                 |

**Comandos**:  
| **Comando**              | **Destino**              | **Tipo**  |
| ------------------------ | ------------------------ | -------- |
| Confirmar Validade        | Registrar Receita        | default  |
| Pote Inválido             | Criar/Selecionar Novo Pote | default  |

---

## 4. Criar/Selecionar Novo Pote

**Descrição**:  
Atividade em que o usuário pode criar um novo pote ou selecionar um pote diferente caso o anterior tenha sido considerado inválido ou inadequado.

| **Campo**              | **Tipo**        | **Restrições**                                | **Valor default** |
| ---------------------- | --------------- | --------------------------------------------- | ----------------- |
| Nome do Novo Pote      | Texto           | Campo obrigatório                             | -                 |
| Descrição do Pote      | Área de Texto   | Opcional                                      | -                 |

**Comandos**:  
| **Comando**              | **Destino**              | **Tipo**  |
| ------------------------ | ------------------------ | -------- |
| Confirmar Novo Pote       | Classificar Pote         | default  |

---

## 5. Registrar Receita

**Descrição**:  
Atividade de registro da receita associada ao pote selecionado e validado, onde são inseridos os dados da transação financeira.

| **Campo**              | **Tipo**        | **Restrições**                                | **Valor default** |
| ---------------------- | --------------- | --------------------------------------------- | ----------------- |
| Valor da Receita        | Número          | Campo obrigatório, valor >= 0                 | 0.0               |
| Data de Registro        | Data            | Campo obrigatório                             | Data atual        |

**Comandos**:  
| **Comando**              | **Destino**              | **Tipo**  |
| ------------------------ | ------------------------ | -------- |
| Confirmar Registro        | Atualizar Pote           | default  |

---

## 6. Atualizar Pote

**Descrição**:  
Atividade onde o sistema atualiza automaticamente o saldo e as informações do pote com a receita registrada, mantendo o controle financeiro.

| **Campo**              | **Tipo**        | **Restrições**                                | **Valor default** |
| ---------------------- | --------------- | --------------------------------------------- | ----------------- |
| Saldo Atualizado        | Número          | Campo obrigatório, valor >= 0                 | -                 |

**Comandos**:  
| **Comando**              | **Destino**              | **Tipo**  |
| ------------------------ | ------------------------ | -------- |
| Confirmar Atualização     | Revisar                  | default  |

---

## 7. Revisar

**Descrição**:  
Atividade de revisão em que o usuário verifica todas as informações inseridas e confirmadas até o momento, garantindo que o registro da receita e a atualização do pote foram feitas corretamente.

| **Campo**              | **Tipo**        | **Restrições**                                | **Valor default** |
| ---------------------- | --------------- | --------------------------------------------- | ----------------- |
| Confirmação do Registro | Booleano        | Campo obrigatório                             | -                 |

**Comandos**:  
| **Comando**              | **Destino**              | **Tipo**  |
| ------------------------ | ------------------------ | -------- |
| Confirmar Revisão         | Notificar Usuário        | default  |

---

## 8. Notificar Usuário

**Descrição**:  
Atividade final onde o sistema notifica o usuário que a receita foi registrada com sucesso e o pote foi atualizado. A notificação pode ser feita por e-mail, SMS ou outros meios de comunicação configurados.

| **Campo**              | **Tipo**        | **Restrições**                                | **Valor default** |
| ---------------------- | --------------- | --------------------------------------------- | ----------------- |
| Tipo de Notificação     | Seleção única   | Selecionar entre e-mail, SMS ou outro         | E-mail            |

**Comandos**:  
| **Comando**              | **Destino**              | **Tipo**  |
| ------------------------ | ------------------------ | -------- |
| Enviar Notificação        | Fim                      | default  |
