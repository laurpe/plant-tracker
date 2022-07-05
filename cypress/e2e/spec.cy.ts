describe("Plant tracker", () => {
    it("renders front page", () => {
        cy.visit("http://localhost:3000");
        cy.contains("Plant tracker");
    });
});

describe("When adding new plant", () => {
    //not adding image
    it("new plant is added and rendered on front page", () => {
        cy.visit("http://localhost:3000");
        cy.get("#add-plant-form-btn").click();
        cy.get("#plant-name-input").type("calathea-test");
        cy.get("#plant-soil-input").type("seramis");
        cy.get("#plant-lastWatered-input").type("2022-07-01");
        cy.get("#plant-wateringCycle-input").type("6");
        cy.get("#add-plant-btn").click();

        cy.contains("calathea-test");
    });
});
