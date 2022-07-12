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

        cy.contains("calathea-test");
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

        cy.contains("calathea-test").get("#water-btn").click();

        cy.contains("water in 6 days");
    });
});
