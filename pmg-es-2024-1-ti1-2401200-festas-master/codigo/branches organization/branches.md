# Organização das Branches

Este documento descreve a organização das branches no projeto, incluindo a estratégia de versionamento e fluxo de trabalho adotados pela equipe.

## Estratégia de Branches

O projeto segue a seguinte estratégia de branches:

- **master**: Esta é a branch principal do projeto. Representa a versão de produção estável do código. Todo o código nesta branch é considerado pronto para implantação em ambiente de produção.

- **release/sprint-X**: A cada sprint, uma nova branch de release é criada, onde X é o número da sprint. Por exemplo, para a sprint 1, teríamos a branch `release/sprint-1`. Essa branch é utilizada para preparar a versão de lançamento da sprint, incluindo correções de bugs finais e ajustes de última hora.

- **pc-X**: Para cada issue ou tarefa a ser desenvolvida, os desenvolvedores criam uma branch individual com o número da issue. Por exemplo, se a issue for numerada como 1, a branch correspondente seria `pc-1`. Isso facilita a organização e rastreamento das alterações relacionadas a uma determinada tarefa.

## Fluxo de Trabalho

O fluxo de trabalho para contribuição de código é o seguinte:

1. Criação da branch: Antes de iniciar o trabalho em uma nova funcionalidade ou correção de bug, o desenvolvedor cria uma nova branch a partir da branch de release ou da branch principal `master`.

2. Desenvolvimento e testes: O desenvolvedor implementa as alterações necessárias na sua branch e realiza os testes locais para garantir que tudo funcione conforme o esperado.

3. Solicitação de Pull Request (PR): Uma vez concluído o desenvolvimento e os testes locais, o desenvolvedor abre um PR apontando para a branch de release correspondente à sprint atual.

4. Revisão e aprovação: Outros membros da equipe revisam o código, fornecem feedback e, se estiver tudo correto, aprovam o PR.

5. Integração: Após a aprovação, o código é integrado na branch de release correspondente à sprint atual.

6. Implantação: Após a integração bem-sucedida, as alterações são implantadas no ambiente de desenvolvimento, teste e, posteriormente, em produção.

## Considerações Finais

A estratégia de branches adotada proporciona uma organização eficiente do fluxo de trabalho, permitindo o desenvolvimento paralelo de várias funcionalidades enquanto mantém a estabilidade da versão de produção. Além disso, o uso de branches individuais para cada tarefa facilita o gerenciamento e rastreamento das alterações realizadas ao longo do ciclo de desenvolvimento.
