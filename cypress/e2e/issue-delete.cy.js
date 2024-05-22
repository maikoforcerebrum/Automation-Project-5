describe("Issue Deletion", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.url()
      .should("eq", `${Cypress.env("baseUrl")}project`)
      .then((url) => {
        cy.visit(url + "/board");
        cy.contains("This is an issue of type: Task.").click(); // Open the first issue from the board.
        cy.get('[data-testid="modal:issue-details"]').should("be.visible"); // Assert the visibility of the issue detail view modal.
      });
  });

  // Test Case 1: Issue Deletion:
  it("Should delete an issue successfully", () => {
    getIssueDetailsModal().within(() => {
      cy.get('[data-testid="icon:trash"]').click(); // Click the Delete Issue button.
    });

    cy.get('[data-testid="modal:confirm"]')
      .should("be.visible")
      .within(() => {
        cy.contains("button", "Delete issue").click(); // Confirm the deletion.
      });

    cy.get('[data-testid="modal:confirm"]').should("not.exist"); // Assert that the deletion confirmation dialogue is not visible.

    cy.get('[data-testid="board-list:backlog"]').should(
      "not.contain",
      "This is an issue of type: Task."
    );
    // Assert that the issue is deleted and no longer displayed on the Jira board.
  });

  // Test Case 2: Issue Deletion Cancellation:
  it("Should cancel deletion successfully", () => {
    getIssueDetailsModal().within(() => {
      cy.get('[data-testid="icon:trash"]').click(); // Click the Delete Issue button.
    });

    cy.get('[data-testid="modal:confirm"]')
      .should("be.visible")
      .within(() => {
        cy.contains("button", "Cancel").click(); // Cancel the deletion in the confirmation pop-up.
      });

    cy.get('[data-testid="modal:confirm"]').should("not.exist"); // Assert that the deletion confirmation dialogue is not visible.

    cy.get('[data-testid="board-list:backlog"]').should(
      "contain",
      "This is an issue of type: Task."
    );
    // Assert that the issue is not deleted and is still displayed on the Jira board.
  });

  const getIssueDetailsModal = () =>
    cy.get('[data-testid="modal:issue-details"]');
});
