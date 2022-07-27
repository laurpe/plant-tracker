/// <reference types="cypress" />

declare namespace Cypress {
    interface Chainable<Subject = any> {
        /**
         * Custom command to ... add your description here
         * @example cy.clickOnMyJourneyInCandidateCabinet()
         */
        deletePlants(): Chainable<null>;
        deleteUsers(): Chainable<null>;
        deleteTestGrowingMedium(): Chainable<null>;
        addPlant(): Chainable<null>;
        createUser(email: string, password: string): Chainable<null>;
        login(email: string, password: string): Chainable<null>;
        logout(): Chainable<null>;
    }
}
