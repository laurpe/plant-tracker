describe("Plant tracker", () => {
    it("renders front page", () => {
        cy.visit("http://localhost:3000");
        cy.contains("plant tracker");
    });
});

describe("When a new plant is added", () => {
    beforeEach(() => {
        cy.clearDatabase();
    });
    it("the plant is rendered on the front page", () => {
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
});

describe("When plant info is modified", () => {
    beforeEach(() => {
        cy.clearDatabase();
        cy.visit("http://localhost:3000");
        cy.addPlant();
    });
    it("new info is shown on the front page (plant has image)", () => {
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
    it("and user deletes plant, it is removed from front page", () => {
        cy.contains("calathea").get("#edit-btn").click();

        cy.get("#delete-plant-btn").click();

        cy.get("calathea").should("not.exist");
    });
});

describe("Plant actions", () => {
    beforeEach(() => {
        cy.clearDatabase();
    });
    it("when plant is watered, new time to water shows", () => {
        cy.visit("http://localhost:3000");
        cy.addPlant();

        cy.contains("watering late");

        cy.contains("calathea").get("#water-btn").click();

        cy.contains("water in 6 days");
    });
});

describe("Growing mediums", () => {
    it.only("When new growing medium is added, it shows in add plant form's list of growing mediums", () => {
        //todo
    });
});
