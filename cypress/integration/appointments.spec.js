describe("Appointment", () => {
  beforeEach(() => {
    // Reset the database prior to each test
    cy.request("GET", "/api/debug/reset");
    cy.visit("/");
    cy.contains("Monday");
  })
  
  it("should book an interview", () => {    
    // 1. Click the add image
    cy.get("[alt=Add]")
      .first()
      .click();
    
    // 2. Type student name into the input field
    cy.get("[data-testid=student-name-input]")
      .type("Lydia Miller-Jones");
    
    // 3. Select the mentor
    cy.get("[alt='Sylvia Palmer']")
      .click();

    // 4. Click save
    cy.contains("Save")
      .click();

    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Sylvia Palmer");
  });

  it("should edit an interview", () => {    
    // 1. Click the Edit button
    cy.contains("[data-testid=appointment]", "Archie Cohen")
      .get("[alt=Edit]")
      .click({ force: true });
    
    // 2. Enter student name
    cy.get("[data-testid=student-name-input]")
      .clear()
      .type("Simon Schuster");
    
    // 3. Select the mentor  
    cy.get("[alt='Tori Malcolm']")
      .click();

    // 4. Click save
    cy.contains("Save")
      .click();

    cy.contains(".appointment__card--show", "Simon Schuster");
    cy.contains(".appointment__card--show", "Tori Malcolm");
  });

  it("should cancel an interview", () => {
    // 1. Click Delete
    cy.contains("[data-testid=appointment]", "Archie Cohen")
      .get("[alt=Delete]")
      .click({ force: true });

    // 2. Click confirm
    cy.contains("Confirm")
      .click();

    // 3. The deleting loading page should show and go away
    cy.contains("Deleting");
    cy.contains("Deleting").should('not.exist');
    
    // 4. The appointment should be deleted.
    cy.contains(".appointment__card--show", "Archie Cohen")
      .should('not.exist');
  })
});