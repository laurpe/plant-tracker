describe("Plant tracker", () => {
    it("renders front page", () => {
        cy.visit("http://localhost:3000");
        cy.contains("plant tracker");
    });
});

describe("User", () => {
    beforeEach(() => {
        cy.visit("http://localhost:3000");
        cy.deleteUsers();
    });
    it("can sign up", () => {
        cy.get("#signup-btn").click();

        cy.get("#signup-email-input").type("test@user.com");
        cy.get("#signup-password-input").type("secret");
        cy.get("#signup-password-confirm-input").type("secret");
        cy.get("#signup-submit-btn").click();

        cy.contains("Log in");
    });

    it("can log in", () => {
        cy.createUser("test@user.com", "secret");

        cy.get("#login-email-input").type("test@user.com");
        cy.get("#login-password-input").type("secret");
        cy.get("#login-submit-btn").click();

        cy.url().should("include", "/main");

        cy.get("#profile-btn").click();

        cy.contains("test@user.com");
    });

    it("can log out", () => {
        cy.createUser("test@user.com", "secret");
        cy.login("test@user.com", "secret");

        cy.get("#profile-btn").click();
        cy.get("#logout-btn").click();

        cy.contains("Don't have an account?");
    });

    it("email needs to be unique", () => {
        cy.createUser("test@user.com", "secret");
        cy.createUser("test@user.com", "secret");

        cy.contains("Email already associated with an account");
    });

    it("only sees plants they have added themselves", () => {
        cy.createUser("test@user.com", "secret");
        cy.login("test@user.com", "secret");
        cy.addPlant();
        cy.contains("calathea").should("exist");

        cy.logout();

        cy.createUser("second@user.com", "secret");
        cy.login("second@user.com", "secret");
        cy.wait(1000);

        cy.contains("calathea").should("not.exist");
    });
});

describe("Plant", () => {
    beforeEach(() => {
        cy.deletePlants();
        cy.deleteUsers();
        cy.visit("http://localhost:3000");
        cy.createUser("test@user.com", "secret");
        cy.login("test@user.com", "secret");
        cy.addPlant();
    });
    it("can be added", () => {
        cy.contains("calathea");
        cy.get("#plant-card").then(($el) => {
            cy.request($el.css("background-image")).then((res) => {
                expect(res.status).to.eql(200);
            })
        });
    });
    it("can be updated", () => {
        cy.contains("calathea").get("#plant-edit-link").click();

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
        cy.contains("calathea").get("#plant-edit-link").click();

        cy.get("#delete-plant-btn").click();

        cy.get("calathea").should("not.exist");
    });
    it("can be watered", () => {
        cy.contains("watering late");

        cy.contains("calathea").get("#water-btn").click();

        cy.contains("water in 6 days");
    });
});

describe("Growing medium", () => {
    beforeEach(() => {
        cy.deletePlants();
        cy.deleteUsers();
        cy.deleteTestGrowingMedium();
        cy.visit("http://localhost:3000");
        cy.createUser("test@user.com", "secret");
        cy.login("test@user.com", "secret");
    });

    it("can be added and it shows in add plant form's list of growing mediums", () => {
        cy.get("#add-plant-form-btn").click();
        cy.get("#plant-growingMedium-select").select(1);

        cy.contains("Growing medium name");

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

        cy.contains("Last watered");
        cy.get("#plant-growingMedium-select").select("customMix");
    });

    it("components' percentage can't add up to more than 100", () => {
        cy.get("#add-plant-form-btn").click();
        cy.get("#plant-growingMedium-select").select(1);

        cy.contains("Growing medium name");

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

    it("can't have a name that already exists", () => {
        cy.get("#add-plant-form-btn").click();
        cy.get("#plant-growingMedium-select").select(1);

        cy.contains("Growing medium name");

        cy.get("#growing-medium-name-input").type("customMix");
        cy.get("#growing-medium-component-1-select").select(3);
        cy.get("#growing-medium-submit-btn").click();

        cy.get("#plant-growingMedium-select").select(1);

        cy.get("#growing-medium-name-input").type("customMix");
        cy.get("#growing-medium-component-1-select").select(4);
        cy.get("#growing-medium-submit-btn").click();

        cy.contains("Name already exists");
    });

    it("only shows if it's created by the user or is a default growing medium", () => {
        cy.get("#add-plant-form-btn").click();
        cy.get("#plant-growingMedium-select").select(1);

        cy.contains("Growing medium name");

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

        cy.logout();
        cy.createUser("second@user.com", "secret");
        cy.login("second@user.com", "secret");

        cy.get("#add-plant-form-btn").click();
        cy.get("#plant-growingMedium-select option:contains(customMix)").should(
            "not.exist"
        );
    });
});

describe("Notification shows when", () => {
    beforeEach(() => {
        cy.deletePlants();
        cy.deleteUsers();
        cy.deleteTestGrowingMedium();
        cy.visit("http://localhost:3000");
        cy.createUser("test@user.com", "secret");
    });

    it("new plant is added", () => {
        cy.login("test@user.com", "secret");
        cy.addPlant();
        cy.get("#notification-container").contains("New plant added")
    })

    it("plant is deleted", () => {
        cy.login("test@user.com", "secret");
        cy.addPlant();
        cy.contains("calathea").get("#plant-edit-link").click();
        cy.get("#delete-plant-btn").click()
        cy.get("#confirm-plant-delete-btn").click()

        cy.get("#notification-container").contains("Plant deleted!")
    })

    it("plant is updated", () => {
        cy.login("test@user.com", "secret");
        cy.addPlant();
        cy.contains("calathea").get("#plant-edit-link").click();
        cy.get("#plant-name-input").clear().type("calathea beauty star");

        cy.get("#submit-btn").click();

        cy.get("#notification-container").contains("Plant updated");
    })

    it("new account is created", () => {
        cy.get("#notification-container").contains("Account created");
    })

    it("user is trying to log in with wrong credentials", () => {
        cy.get("#login-email-input").type("test@user.com");
        cy.get("#login-password-input").type("wrong");
        cy.get("#login-submit-btn").click();

        cy.contains("Invalid email or password");
    })
})
