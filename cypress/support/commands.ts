/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }
import "cypress-file-upload";

const apiUrl = Cypress.env("apiUrl") as string;
const apiKey = Cypress.env("apiKey") as string;

Cypress.Commands.add("deletePlants", () => {
    cy.request({
        method: "POST",
        url: `${apiUrl}/action/deleteMany`,
        headers: { "Content-type": "application/json", "api-key": apiKey },
        body: {
            dataSource: "Cluster0",
            database: "test",
            collection: "plants",
            filter: {},
        },
    });
});

Cypress.Commands.add("deleteUsers", () => {
    cy.request({
        method: "POST",
        url: `${apiUrl}/action/deleteMany`,
        headers: { "Content-type": "application/json", "api-key": apiKey },
        body: {
            dataSource: "Cluster0",
            database: "test",
            collection: "users",
            filter: {},
        },
    });
});

Cypress.Commands.add("deleteTestGrowingMedium", () => {
    cy.request({
        method: "POST",
        url: `${apiUrl}/action/deleteOne`,
        headers: { "Content-type": "application/json", "api-key": apiKey },
        body: {
            dataSource: "Cluster0",
            database: "test",
            collection: "growingmedia",
            filter: { name: "customMix" },
        },
    });
});

Cypress.Commands.add("addPlant", () => {
    cy.get("#add-plant-form-btn").click();
    cy.get("#plant-image-input").attachFile("calathea.jpeg");
    cy.wait(2000);
    cy.get("#plant-name-input").type("calathea");
    cy.get("#plant-growingMedium-select").select(3);
    cy.get("#plant-lastWatered-input").type("2022-06-01");
    cy.get("#plant-wateringCycle-input").type("6");
    cy.get("#submit-btn").click();
});

Cypress.Commands.add("createUser", () => {
    cy.get("#signup-btn").click();
    cy.get("#signup-email-input").type("test@user.com");
    cy.get("#signup-password-input").type("secret");
    cy.get("#signup-password-confirm-input").type("secret");
    cy.get("#signup-submit-btn").click();
});

Cypress.Commands.add("login", () => {
    cy.get("#login-email-input").type("test@user.com");
    cy.get("#login-password-input").type("secret");
    cy.get("#login-submit-btn").click();
});
