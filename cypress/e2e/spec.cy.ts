const baseUrl = Cypress.env("baseUrl") as string;

describe("Plant tracker", () => {
    it("renders front page", () => {
        cy.visit("http://localhost:3000");
        cy.contains("Plant tracker");
    });
});

describe("Plant actions", () => {
    beforeEach(() => {
        cy.clearDatabase();
    });
    //not adding image
    it("when plant is added, it is rendered on the front page", () => {
        cy.visit("http://localhost:3000");
        cy.addPlant();

        cy.contains("calathea-test");
    });

    it("when plant is watered, new time to water shows", () => {
        cy.visit("http://localhost:3000");
        cy.addPlant();

        cy.contains("watering late");

        cy.contains("calathea-test").parent().find("button").click();

        cy.contains("water in 6 days");
    });
});
