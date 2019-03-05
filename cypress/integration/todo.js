context("todo tests", () => {
  describe("filters", () => {
    it("'All' should be the default filter", () => {
      cy.visit("https://www.todobackend.com/client/index.html?https://todo-backend-typescript.herokuapp.com/")
        .get(".selected")
        .contains("All");
    });
  });
  // write remaining tests here
});
