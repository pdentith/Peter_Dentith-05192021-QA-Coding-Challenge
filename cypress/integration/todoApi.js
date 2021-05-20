import apiRequests from '../fixtures/api.json'

let baseUrl = 'http://todo-backend-typescript.herokuapp.com/'

context("todo api tests", () => {
  describe("Crud", () => {
    it("Create Entry", () => {
      cy.request({
        method: 'POST', url: baseUrl, body: apiRequests.POST
      }).then((response) => {
        expect(response.status).to.eq(200)
      });
    });

    it("Update", () => {
      cy.request({
        method: 'PUT', url: baseUrl, body: apiRequests.POST
      }).then((response) => {
        expect(response.status).to.eq(200)
      });
    });

    it("Delete", () => {
      cy.request({
        method: 'DELETE', url: baseUrl, body: apiRequests.POST
      }).then((response) => {
        expect(response.status).to.eq(200)
      });
    });

    it("Get", () => {
      cy.request({
        method: 'GET', url: baseUrl
      }).then((response) => {
        expect(response.status).to.eq(200)
        //to do assert body
      });
    });

    it("Options", () => {
      cy.request({
        method: 'OPTIONS', url: baseUrl
      }).then((response) => {
        expect(response.status).to.eq(200)
        //to do assert body
      });
    });

  });
});
