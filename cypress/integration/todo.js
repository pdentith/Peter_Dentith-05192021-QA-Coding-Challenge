context("todo tests", () => {
  describe("filters", () => {
    it("'All' should be the default filter", () => {
      cy.visit("/")
        .get(".selected")
        .contains("All");
    });
  });
  // write remaining tests here
});
