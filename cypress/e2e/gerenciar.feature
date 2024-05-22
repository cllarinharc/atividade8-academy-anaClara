#language: pt

Funcionalidade: Gerenciar conta

Contexto: Deve estar logado
  Dado que estou logado
  E que acessei a funcionalidade gerenciar

Cenário: Deve ser possivel editar nome do usuário
  Quando informar novo nome válido
  E confirmo a operação
  Entao visualizo a mensagem de sucesso "Informações atualizadas!"
  E deve ser atualizado o nome

Cenário: Deve ser possivel editar senha do usuário
  Quando informar nova senha válido
  E informar novamente a senha
  E confirmo a operação
  Então visualizo a mensagem de sucesso "Informações atualizadas!"
  E deve ser atualizado a senha