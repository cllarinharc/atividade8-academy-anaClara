import { faker } from "@faker-js/faker";
const apiUrl = "https://raromdb-3c39614e42d4.herokuapp.com/";
const password = faker.internet.password(6);
let email, idUser, nome;

Cypress.Commands.add("deletarUsuario", (email, password, idUser) => {
  cy.request({
    method: "POST",
    url: `${apiUrl}api/auth/login`,
    body: { email, password },
  }).then(({ body }) => {
    const token = body.accessToken;

    cy.request({
      method: "PATCH",
      url: `${apiUrl}api/users/admin`,
      auth: { bearer: token },
    }).then(() => {
      cy.request({
        method: "DELETE",
        url: `${apiUrl}api/users/${idUser}`,
        auth: { bearer: token },
      });
    });
  });
});

Cypress.Commands.add("userCadastro", () => {
  const userData = {
    name: "faker " + faker.person.firstName(),
    email: faker.internet.email(),
    password,
  };

  return cy.request({
    method: "POST",
    url: `${apiUrl}api/users`,
    body: userData,
  }).then(({ body }) => {
    const { id, name, email } = body;
    idUser = id;
    nome = name;

    return cy.wrap({
      nome,
      email,
      id: idUser,
      password,
    });
  });
});