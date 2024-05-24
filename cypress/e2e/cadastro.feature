#language: pt
Funcionalidade: Cadastrar novo usuário
    
Contexto: Acessar funcionalidade de cadastro
  Dado que acessei a funcionalidade de cadastro

@mock
Cenário: Deve ser possível cadastrar um usuário com sucesso 
  Quando informo um nome válido "usuario"
  E informo um email válido
  E informo uma senha válida
  E informo novamente a senha
  E confirmo a operação
  Entao usuário será cadastrado no sistema
  E visualizo a mensagem de sucesso

Cenário: Nao deve ser possível cadastrar usuário sem o nome
  Quando informo um email válido
  E informo uma senha válida
  E informo novamente a senha
  E confirmo a operação
  Entao visualizo a mensagem de erro no nome vazio

Cenário: Nao deve ser possível cadastrar usuário sem o email
  Quando informo um nome1
  E informo uma senha válida
  E informo novamente a senha
  E confirmo a operação
  Entao visualizo a mensagem de erro no email vazio
    
Cenário: Nao deve ser possível cadastrar usuário sem a senha
  Quando informo um nome1
  E informo um email válido
  E confirmo a operação
  Entao visualizo a mensagem de erro na senha vazia

Cenário: Nao deve ser possível cadastrar usuário sem a confirmar da senha
  Quando informo um nome1
  E informo um email válido
  E informo uma senha válida
  E confirmo a operação
  Entao visualizo a mensagem de erro na confirmaçao senha vazia

Cenário: Não deve ser possivel cadastro com as senhas divergentes
  Quando informo um nome1
  E informo um email válido
  E informo uma senha válida
  E informo outra senha "<senha>"
  E confirmo a operação
  Então visualizar a mensagem de alerta1 "<alerta>"
  Exemplos:
  |   senha   |          alerta            |
  |   111113  | As senhas devem ser iguais.|
  |   111112  | As senhas devem ser iguais.|

@mock  
Cenário: Não deve ser possível registrar um usuario com email ja cadastrado
  Quando informo um nome1
  E informo um email existente
  E informo uma senha válida
  E informo novamente a senha
  E confirmo a operação
  Então visualizo a mensagem de erro e-mail existe

