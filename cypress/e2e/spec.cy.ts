describe("Plant tracker", () => {
    it("renders front page", () => {
        cy.visit("http://localhost:3000");
        cy.contains("plant tracker");
    });
});

describe("Plant actions", () => {
    beforeEach(() => {
        cy.clearDatabase();
    });
    it("when plant is added, it is rendered on the front page", () => {
        cy.visit("http://localhost:3000");
        cy.addPlant();

        cy.contains("calathea");
        cy.get("#plant-image")
            .should("be.visible")
            .should(([img]) => {
                const image = img as HTMLImageElement;
                expect(image.naturalWidth).to.equal(194);
                expect(image.naturalHeight).to.equal(259);
            });
    });

    it("when plant is watered, new time to water shows", () => {
        cy.visit("http://localhost:3000");
        cy.addPlant();

        cy.contains("watering late");

        cy.contains("calathea").get("#water-btn").click();

        cy.contains("water in 6 days");
    });

    it("when plant that has an image is edited, new info is shown on the front page", () => {
        cy.visit("http://localhost:3000");
        //plant with an image
        cy.addPlant();

        cy.contains("calathea").get("#edit-btn").click();

        cy.contains("Plant details");

        cy.get("#plant-name-input").clear().type("calathea beauty star");
        cy.get("#plant-growingMedium-select").select(3);
        cy.get("#plant-lastWatered-input").clear().type("2022-05-01");
        cy.get("#plant-wateringCycle-input").clear().type("3");
        cy.get("#img-remove-btn").click();
        cy.get("#plant-image-input").attachFile("calathea-beauty-star.jpeg");

        cy.get("#submit-btn").click();

        cy.contains("calathea beauty star");
    });
});
