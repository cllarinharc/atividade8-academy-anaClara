import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { LoginPage } from "../pages/login.page";
let login = new LoginPage();

let nome, email, password, idUser;

Given("que acessei a funcionalidade de login", function () {
  cy.visit("login");
});

When("efetuar a operação", function () {
  login.efetuarLogin();
});

When("informo uma senha", function () {
  login.informoSenha(password);
});

When("informo um email", function () {
  login.informoEmail(email);
});

Then("tenho cadastro no sistema", function () {
  cy.intercept("POST", "api/auth/login").as("logarUser");

  cy.userCadastro().then(function (resposta) {
    cy.intercept("POST", "api/auth/login").as("logarUser");
    cy.userCadastro().then((resposta) => {
      ({ id: idUser, nome, email, password } = resposta);
      cy.intercept("GET", `api/users/${idUser}`).as("get");
    });
  });
});

Then("visualizo a mensagem de sucesso no login", function () {
  cy.wait("@login").then((intercept) => {
    const { statusCode, body } = intercept.response;
    cy.url().should(
      "equal",
      "https://raromdb-frontend-c7d7dc3305a0.herokuapp.com/"
    );
    expect(statusCode).to.equal(200);
    expect(body).to.have.property("accessToken");
  });

  cy.wait("@get").then((intercept) => {
    const { statusCode, body, statusMessage } = intercept.response;
    expect(statusCode).to.equal(200);
    expect(body).to.include({
      name: nome,
      id: idUser,
      email: email,
      active: true,
      type: 0,
    });
    expect(statusMessage).to.equal("OK");
  });
});

Then("visualizo a mensagem e-mail vazio {string}", function (mensagem) {
  cy.contains("span", mensagem).should("exist");
});

Then("visualizo a mensagem senha vazia {string}", function (mensagem) {
  cy.contains("span", mensagem).should("exist");
});

Then(
  "visualizo a mensagem e-mail e senha vazios {string}",
  function (mensagem) {
    cy.contains("span", mensagem).should("exist");
  }
);
