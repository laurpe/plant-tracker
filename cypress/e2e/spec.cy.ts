describe("Plant tracker", () => {
    it("renders front page", () => {
        cy.visit("http://localhost:3000");
        cy.contains("plant tracker");
    });
});

describe("User", () => {
    beforeEach(() => {
        cy.deletePlants();
    });

    it("can sign up", () => {
        cy.visit("http://localhost:3000");

        cy.get("#signup-btn").click();

        cy.get("#signup-email-input").type("test@user.com");
        cy.get("#signup-password-input").type("secret");
        cy.get("#signup-password-confirm-input").type("secret");
        cy.get("#signup-submit-btn").click();

        cy.contains("Log in");
    });

    it("can log in", () => {
        cy.visit("http://localhost:3000");

        cy.get("#login-email-input").type("test@user.com");
        cy.get("#login-password-input").type("secret");
        cy.get("#login-submit-btn").click();

        cy.url().should("include", "/main");

        cy.get("#profile-btn").click();

        cy.contains("test@user.com");
    });

    it("can log out", () => {
        cy.visit("http://localhost:3000");

        cy.get("#login-email-input").type("test@user.com");
        cy.get("#login-password-input").type("secret");
        cy.get("#login-submit-btn").click();

        cy.get("#profile-btn").click();
        cy.get("#logout-btn").click();

        cy.contains("Don't have an account?");
    });
});

describe.only("Plant", () => {
    beforeEach(() => {
        cy.deletePlants();
        cy.visit("http://localhost:3000");
        cy.createUser();
        cy.login();
        cy.addPlant();
    });
    it("can be added", () => {
        cy.contains("calathea");
        cy.get("#plant-image")
            .should("be.visible")
            .should(([img]) => {
                const image = img as HTMLImageElement;
                expect(image.naturalWidth).to.equal(194);
                expect(image.naturalHeight).to.equal(259);
            });
    });
    it("can be updated", () => {
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
    it("can be deleted", () => {
        cy.contains("calathea").get("#edit-btn").click();

        cy.get("#delete-plant-btn").click();

        cy.get("calathea").should("not.exist");
    });
    it("can be watered", () => {
        cy.contains("watering late");

        cy.contains("calathea").get("#water-btn").click();

        cy.contains("water in 6 days");
    });
});

describe("Growing mediums", () => {
    beforeEach(() => {
        cy.deletePlants();
        cy.deleteTestGrowingMedium();
    });

    it("When new growing medium is added, it shows in add plant form's list of growing mediums", () => {
        cy.visit("http://localhost:3000");

        cy.get("#add-plant-form-btn").click();
        cy.get("#plant-growingMedium-select").select(1);

        cy.contains("Add growing medium");

        cy.get("#growing-medium-name-input").type("customMix");
        cy.get("#growing-medium-component-1-select").select(3);
        cy.get("#growing-medium-percentage-1-input").clear().type("30");

        cy.get("#growing-medium-add-more-components-btn").click();

        cy.get("#growing-medium-component-2-select").select(4);
        cy.get("#growing-medium-percentage-2-input").clear().type("20");

        cy.get("#growing-medium-add-more-components-btn").click();

        cy.get("#growing-medium-component-3-select").select(5);
        cy.get("#growing-medium-percentage-3-input").clear().type("50");

        cy.get("#growing-medium-submit-btn").click();

        cy.contains("Add plant");
        cy.get("#plant-growingMedium-select").select("customMix");
    });

    it("Growing medium components' percentage can't add up to more than 100", () => {
        cy.visit("http://localhost:3000");

        cy.get("#add-plant-form-btn").click();
        cy.get("#plant-growingMedium-select").select(1);

        cy.contains("Add growing medium");

        cy.get("#growing-medium-name-input").type("customMix");
        cy.get("#growing-medium-component-1-select").select(3);
        cy.get("#growing-medium-percentage-1-input").clear().type("30");

        cy.get("#growing-medium-add-more-components-btn").click();

        cy.get("#growing-medium-component-2-select").select(4);
        cy.get("#growing-medium-percentage-2-input").clear().type("20");

        cy.get("#growing-medium-add-more-components-btn").click();

        cy.get("#growing-medium-component-3-select").select(5);
        cy.get("#growing-medium-percentage-3-input").clear().type("90");

        cy.get("#growing-medium-submit-btn").click();

        cy.contains("Components can't add up to more than 100%");
    });

    it("Can't add growing medium with a name that already exists", () => {
        cy.visit("http://localhost:3000");

        cy.get("#add-plant-form-btn").click();
        cy.get("#plant-growingMedium-select").select(1);

        cy.contains("Add growing medium");

        cy.get("#growing-medium-name-input").type("customMix");
        cy.get("#growing-medium-component-1-select").select(3);
        cy.get("#growing-medium-submit-btn").click();

        cy.get("#plant-growingMedium-select").select(1);

        cy.get("#growing-medium-name-input").type("customMix");
        cy.get("#growing-medium-component-1-select").select(4);
        cy.get("#growing-medium-submit-btn").click();

        cy.contains("Name already exists");
    });
});
