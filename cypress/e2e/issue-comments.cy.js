describe("Issue comments creating, editing and deleting", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.url()
      .should("eq", `${Cypress.env("baseUrl")}project/board`)
      .then((url) => {
        cy.visit(url + "/board");
        cy.contains("This is an issue of type: Task.").click();
      });
  });

  const getIssueDetailsModal = () =>
    cy.get('[data-testid="modal:issue-details"]');

  it("Should add, edit, and delete a comment successfully", () => {
    const comment = "TEST_COMMENT";
    const editedComment = "TEST_COMMENT_EDITED";

    // Add a comment
    getIssueDetailsModal().within(() => {
      cy.contains("Add a comment...").click();
      cy.get('textarea[placeholder="Add a comment..."]').type(comment);
      cy.contains("button", "Save").click().should("not.exist");
      cy.contains("Add a comment...").should("exist");
      cy.get('[data-testid="issue-comment"]').should("contain", comment);
    });

    // Edit the comment
    getIssueDetailsModal().within(() => {
      cy.get('[data-testid="issue-comment"]')
        .first()
        .contains("Edit")
        .click()
        .should("not.exist");
      cy.get('textarea[placeholder="Add a comment..."]')
        .clear()
        .type(editedComment);
      cy.contains("button", "Save").click().should("not.exist");
      cy.get('[data-testid="issue-comment"]')
        .should("contain", "Edit")
        .and("contain", editedComment);
    });

    // Delete the comment
    getIssueDetailsModal().within(() => {
      cy.get('[data-testid="issue-comment"]').contains("Delete").click();
    });

    cy.get('[data-testid="modal:confirm"]').within(() => {
      cy.contains("button", "Delete comment").click();
    });

    getIssueDetailsModal().within(() => {
      cy.get('textarea[placeholder="Add a comment..."]').should("not.exist");
    });
  });
});
