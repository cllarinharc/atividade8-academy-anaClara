#language: pt

Funcionalidade: Login de usuário

Contexto: Acessar funcionalidade de login 
    Dado que acessei a funcionalidade de login

@login
Cenário: Login com sucesso
    E tenho cadastro no sistema
    Quando informo um email
    E informo uma senha 
    E efetuar a operação
    Então visualizo a mensagem de sucesso no login


Cenário: Não deve ser possível fazer login sem o e-mail
    E informo uma senha
    E efetuar a operação
    Então visualizo a mensagem e-mail vazio "Informe o e-mail"

  
Cenário: Não deve ser possível fazer login sem a senha
    Quando informo um email
    E efetuar a operação
    Então visualizo a mensagem senha vazia "Informe a senha"

  
Cenário: Não deve ser possível fazer login sem o e-mail e senha
    E efetuar a operação
    Então visualizo a mensagem e-mail vazio "Informe o e-mail"
    E visualizo a mensagem e-mail e senha vazios "Informe a senha"
