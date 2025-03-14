### 3.3.2 Processo 2 – Registro de Despesas

![Registro de despesas1 Diagrama](https://github.com/user-attachments/assets/995b89dd-1b9b-4777-afa7-82efbc577d71)

## 1. Selecionar Pote

**Descrição**:  
Atividade em que o usuário seleciona o pote financeiro adequado para a despesa, como "Despesas", "Viagens", "Lazer", etc. Isso garante que a despesa será alocada corretamente para facilitar o controle financeiro.

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
Atividade que classifica a despesa de acordo com o tipo de pote selecionado, verificando se a categoria escolhida está adequada à transação.

| **Campo**                | **Tipo**        | **Restrições**                                | **Valor default** |
| ------------------------ | --------------- | --------------------------------------------- | ----------------- |
| Tipo de Pote             | Seleção única   | Campo obrigatório, selecionar categoria       | -                 |
| Justificativa            | Área de Texto   | Opcional                                      | -                 |

**Comandos**:  
| **Comando**              | **Destino**                | **Tipo**  |
| ------------------------ | -------------------------- | -------- |
| Confirmar Classificação   | Verificar Limite do Pote    | default  |

---

## 3. Verificar Limite do Pote

**Descrição**:  
Verificação automática do sistema para garantir que o pote selecionado possui saldo suficiente para cobrir a despesa.

| **Campo**            | **Tipo**        | **Restrições**                                | **Valor default** |
| -------------------- | --------------- | --------------------------------------------- | ----------------- |
| Limite de Pote       | Booleano        | Campo obrigatório                             | -                 |

**Comandos**:  
| **Comando**              | **Destino**              | **Tipo**  |
| ------------------------ | ------------------------ | -------- |
| Confirmar Limite          | Registrar Despesa        | default  |
| Limite Excedido           | Aguardar Saldo           | default  |

---

## 4. Aguardar Saldo

**Descrição**:  
Atividade onde o sistema aguarda o saldo suficiente no pote para permitir o registro da despesa. Uma notificação pode ser enviada ao usuário quando o saldo estiver disponível.

| **Campo**              | **Tipo**        | **Restrições**                                | **Valor default** |
| ---------------------- | --------------- | --------------------------------------------- | ----------------- |
| Tempo de Espera        | Número          | Opcional                                      | -                 |

**Comandos**:  
| **Comando**              | **Destino**              | **Tipo**  |
| ------------------------ | ------------------------ | -------- |
| Saldo Disponível          | Registrar Despesa        | default  |

---

## 5. Registrar Despesa

**Descrição**:  
Atividade de registro da despesa associada ao pote selecionado e validado, onde são inseridos os dados da transação financeira.

| **Campo**              | **Tipo**        | **Restrições**                                | **Valor default** |
| ---------------------- | --------------- | --------------------------------------------- | ----------------- |
| Valor da Despesa        | Número          | Campo obrigatório, valor >= 0                 | 0.0               |
| Data de Registro        | Data            | Campo obrigatório                             | Data atual        |

**Comandos**:  
| **Comando**              | **Destino**              | **Tipo**  |
| ------------------------ | ------------------------ | -------- |
| Confirmar Registro        | Atualizar Pote           | default  |

---

## 6. Atualizar Pote

**Descrição**:  
Atividade onde o sistema atualiza automaticamente o saldo e as informações do pote com a despesa registrada, mantendo o controle financeiro atualizado.

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
Atividade de revisão em que o usuário verifica todas as informações inseridas e confirmadas até o momento, garantindo que o registro da despesa e a atualização do pote foram feitas corretamente.

| **Campo**              | **Tipo**        | **Restrições**                                | **Valor default** |
| ---------------------- | --------------- | --------------------------------------------- | ----------------- |
| Confirmação do Registro | Booleano        | Campo obrigatório                             | -                 |

**Comandos**:  
| **Comando**              | **Destino**              | **Tipo**  |
| ------------------------ | ------------------------ | -------- |
| Confirmar Revisão         | Notificar Usuário        | default  |

---

## 8. Notificar o Usuário

**Descrição**:  
Atividade final onde o sistema notifica o usuário que a despesa foi registrada com sucesso e o pote foi atualizado. A notificação pode ser feita por e-mail, SMS ou outros meios de comunicação configurados.

| **Campo**              | **Tipo**        | **Restrições**                                | **Valor default** |
| ---------------------- | --------------- | --------------------------------------------- | ----------------- |
| Tipo de Notificação     | Seleção única   | Selecionar entre e-mail, SMS ou outro         | E-mail            |

**Comandos**:  
| **Comando**              | **Destino**              | **Tipo**  |
| ------------------------ | ------------------------ | -------- |
| Enviar Notificação        | Fim                      | default  |
