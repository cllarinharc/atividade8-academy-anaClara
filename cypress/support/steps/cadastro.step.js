import {
  Given,
  When,
  Then,
  Before,
} from "@badeball/cypress-cucumber-preprocessor";
import { fakerPT_BR } from "@faker-js/faker";
import CadastroPage from "../pages/cadastro.page";

const userCadastros = new CadastroPage();
Before(
  {
    tags: "@mock",
  },
  () => {
    cy.intercept(
      "POST",
      "https://raromdb-3c39614e42d4.herokuapp.com/api/users"
    ).as("post");
  }
);

Given("que acessei a funcionalidade de cadastro", function () {
  cy.visit("/register");
});

When("informo um nome válido {string}", function (nome) {
  userCadastros.typeNome(nome);
});

When("informo um nome1", function () {
  const nome = fakerPT_BR.person.fullName();
  userCadastros.typeNome(nome);
});

When("informo um email válido", function () {
  const email = fakerPT_BR.internet.email();
  userCadastros.typeEmail(email);
});

When("informo uma senha válida", function () {
  userCadastros.typeSenha("111111");
});

When("informo novamente a senha", function () {
  userCadastros.typeConfirmarSenha("111111");
});

When("informo senha {string} {string}", function (senha) {
  userCadastros.typeSenha(senha);
  userCadastros.typeConfirmarSenha(senha);
});

When("informo outra senha {string}", function (senha) {
  cy.wait(2000);
  userCadastros.typeConfirmarSenha(senha);
});

When("confirmo a operação", function () {
  userCadastros.clickCadastrar();
});

When("informo um email existente", function () {
  cy.intercept("POST", "https://raromdb-3c39614e42d4.herokuapp.com/api/users", {
    statusCode: 409,
    body: {
      message: "Email already in use",
      error: "Conflict",
    },
  }).as("post");
  userCadastros.typeEmail(fakerPT_BR.internet.email());
});

Then("usuário será cadastrado no sistema", function () {
  cy.wait("@cadastro").then(function (intercept) {
    const type = intercept.response.body.type;
    cy.wrap(type).should("eq", 0);
    expect(intercept.response.statusCode).to.equal(201);
  });
});

Then("visualizo a mensagem de sucesso", function () {
  cy.get(userCadastros.selectors.avisoSucesso).contains("Cadastro realizado!");
});

Then("visualizo a mensagem de erro no nome vazio", function () {
  cy.get(userCadastros.selectors.nome).invoke("val").should("be.empty");
  cy.get(userCadastros.selectors.avisoErro).contains("Informe o nome");
});

Then("visualizo a mensagem de erro no email vazio", function () {
  cy.get(userCadastros.selectors.email).invoke("val").should("be.empty");
  cy.get(userCadastros.selectors.avisoErro).contains("Informe o e-mail");
});

Then("visualizo a mensagem de erro na senha vazia", function () {
  cy.get(userCadastros.selectors.senha).invoke("val").should("be.empty");
  cy.get(userCadastros.selectors.avisoErro).eq(0).contains("Informe a senha");

  cy.get(userCadastros.selectors.confirmarSenha).invoke("val").should("be.empty");
  cy.get(userCadastros.selectors.avisoErro).contains("Informe a senha");
});

Then("visualizo a mensagem de erro na confirmaçao senha vazia", function () {
  cy.get(userCadastros.selectors.confirmarSenha).invoke("val").should("be.empty");
  cy.get(userCadastros.selectors.avisoErro).contains("Informe a senha");
});

Then("visualizar a mensagem de alerta1 {string}", function (alerta) {
  cy.get(userCadastros.selectors.avisoErro).contains(alerta);
});


Then("visualizo a mensagem de erro e-mail existe", function () {
  cy.wait("@cadastro").then(function (intercept) {
    expect(intercept.response.statusCode).to.equal(409);
  });
  cy.get(userCadastros.selectors.avisoFalha).contains("Falha no cadastro.");
  cy.get(userCadastros.selectors.avisoErrocas).contains(
    "E-mail já cadastrado. Utilize outro e-mail"
  );
});
