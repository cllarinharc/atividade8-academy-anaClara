import { faker } from "@faker-js/faker";

export class LoginPage {
  inputEmail = '[name="email"]';
  inputSenha = '[name="password"]';
  buttonLogin = ".login-button";

  efetuarLogin() {
    cy.get(this.buttonLogin).click();
  }

  informoEmail(email) {
    cy.get(this.inputEmail).type(email);
  }

  informoSenha(senha) {
    cy.get(this.inputSenha).type(senha);
  }
}