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
    beforeEach(() => {
        cy.clearDatabase();
    });

    it("When new growing medium is added, it shows in add plant form's list of growing mediums", () => {
        cy.visit("http://localhost:3000");

        cy.get("#add-plant-form-btn").click();
        cy.get("#add-growing-medium-btn").click();

        cy.contains("Add growing medium");

        cy.get("#growing-medium-name-input").type("customMix");
        cy.get("#growing-medium-component-1-select").select(1);
        cy.get("#growing-medium-percentage-1-input").clear().type("30");

        cy.get("#growing-medium-add-more-components-btn").click();

        cy.get("#growing-medium-component-2-select").select(2);
        cy.get("#growing-medium-percentage-2-input").clear().type("20");

        cy.get("#growing-medium-add-more-components-btn").click();

        cy.get("#growing-medium-component-3-select").select(3);
        cy.get("#growing-medium-percentage-3-input").clear().type("50");

        cy.get("#growing-medium-submit-btn").click();

        cy.contains("Add plant");
        cy.get("#plant-growingMedium-select").select("customMix");
    });

    // it("Growing medium components' percentage can't add up to more than 100", () => {
    //     cy.visit("http://localhost:3000");

    //     cy.get("#add-plant-form-btn").click();
    //     cy.get("#add-growing-medium-btn").click();

    //     cy.contains("Add growing medium");

    //     cy.get("#growing-medium-name-input").type("customMix");
    //     cy.get("#growing-medium-component-1-select").select(1);
    //     cy.get("#growing-medium-percentage-1-input").clear().type("30");

    //     cy.get("#growing-medium-add-more-components-btn").click();

    //     cy.get("#growing-medium-component-2-select").select(2);
    //     cy.get("#growing-medium-percentage-2-input").clear().type("20");

    //     cy.get("#growing-medium-add-more-components-btn").click();

    //     cy.get("#growing-medium-component-3-select").select(3);
    //     cy.get("#growing-medium-percentage-3-input").clear().type("90");

    //     cy.get("#growing-medium-submit-btn").click();

    //     cy.contains("Components can't add up to more than 100%");
    // });
});
