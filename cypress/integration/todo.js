context("todo tests", () => {
  describe("filters", () => {
    it("'All' should be the default filter", () => {
      cy.visitTodos()
      cy.get(".selected")
        .contains("All");
    });
  });
  // write remaining tests here
});
