#language: pt

Funcionalidade: Login de usuário

Contexto: Acessar funcionalidade de login 
    Dado que acessei a funcionalidade de login
    E tenho cadastro

Cenário: Login com sucesso
    Quando informo um email válido
    E informo uma senha válida
    E confirmo a operação
    Então visualizo a mensagem de sucesso


Cenário: Não deve ser possível fazer login sem o e-mail
    E informo uma senha válida
    E confirmo a operação
    Então visualizo a mensagem e-mail vazio "Informe o e-mail"

  
Cenário: Não deve ser possível fazer login sem a senha
    Quando informo um email válido
    E confirmo a operação
    Então visualizo a mensagem senha vazia "Informe a senha"

  
Cenário: Não deve ser possível fazer login sem o e-mail e senha
    E confirmo a operação
    Então visualizo a mensagem e-mail vazio "Informe o e-mail"
    E visualizo a mensagem senha vazia "Informe a senha"
