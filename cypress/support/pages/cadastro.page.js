export default class CadastroPage {
  selectors = {
    nome: 'input[placeholder="Nome"]',
    email: 'input[placeholder="E-mail"]',
    senha: 'input[placeholder="Senha"]',
    confirmarSenha: 'input[placeholder="Confirmar senha"]',
    buttonCadastrar: ".account-save-button",
    buttonOk: ".modal-actions",
    avisoSucesso: "div.modal-body",
    avisoErro: ".input-error",
    avisoFalha: ".modal-body",
    avisoErrocas: ".error-message"
  };

  typeNome(nome) {
    cy.get(this.selectors.nome).type(nome);
  }

  typeEmail(email) {
    cy.get(this.selectors.email).type(email);
  }

  typeSenha(senha) {
    cy.get(this.selectors.senha).type(senha);
  }

  typeConfirmarSenha(senha) {
    cy.get(this.selectors.confirmarSenha).type(senha);
  }

  clickCadastrar() {
    cy.get(this.selectors.buttonCadastrar).click();
  }

  registrarUsuario(nome, email, senha) {
    this.typeNome(nome);
    this.typeEmail(email);
    this.typeSenha(senha);
    this.typeConfirmarSenha(senha);
    this.clickCadastrar();
  }
}
