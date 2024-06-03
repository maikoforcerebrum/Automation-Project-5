const url = "https://jira.ivorreic.com/";
const listIssueSelector = '[data-testid="list-issue"]';
const estimationInputSelector = '[placeholder="Number"]';
const estimationDisplaySelector = ".sc-rBLzX.irwmBe";

describe("Time Tracking Functionality", () => {
  beforeEach(() => {
    cy.visit(url);
    cy.get(listIssueSelector).first().click();
  });

  it("Should add, edit and remove estimation successfully", () => {
    // Adding estimation (10h) with assertion.
    cy.get(estimationInputSelector)
      .clear()
      .type("10")
      .should("have.value", "10");
    cy.get(estimationDisplaySelector).should("contain", "10");
    // Editing estimation (10h to 5h) with assertion.
    cy.get(estimationInputSelector).clear().type("5").should("have.value", "5");
    cy.get(estimationDisplaySelector).should("contain", "5");
    // Removing estimation (5h to none) with assertion.
    cy.get(estimationInputSelector).clear().should("have.value", "");
    cy.get(estimationDisplaySelector).should("not.have.value");
  });
});
