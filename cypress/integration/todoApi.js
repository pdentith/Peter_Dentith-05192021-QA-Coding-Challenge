import apiRequests from '../fixtures/api.json'

//could move this url to an environment varibale
let baseUrl = 'https://todo-backend-django.herokuapp.com/';
let getId;
let updateUrl;

context("todo api tests", () => {
//These tests can be expanded to go to the ui and confrim the newly created api entires are displaying and assert info 
  describe("Crud", () => {
    it("Create Entry", () => {
      cy.request({
        method: 'POST', headers: apiRequests.HEADERS, url: baseUrl, body: apiRequests.POST
      }).then((response) => {
        expect(response.status).to.eq(201)
        expect(response.body.title).to.eq(apiRequests.POST.title)
        expect(response.body.completed).to.eq(apiRequests.POST.completed)
        expect(response.body.url).contains(baseUrl)
        expect(response.body.order).to.eq(apiRequests.POST.order)
        let getUrl = (response.body.url).split('.com/')
        getId = getUrl[1]
        console.log('Id of post todo' + getId)
        updateUrl = baseUrl + getId
      });
    });

    it("Get the new todo", () => {
      cy.request({
        method: 'GET', url: updateUrl
      }).then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body.title).to.eq(apiRequests.POST.title)
        expect(response.body.completed).to.eq(apiRequests.POST.completed)
        expect(response.body.url).contains(baseUrl)
        expect(response.body.order).to.eq(apiRequests.POST.order)
      });
    });

    //can iterate over permetations of one or multiple of the body params (title, orger, completed, url?-I think this may be static)
    //potentially build a function to spit out batch bodies over pulling from fixture
    it("Update the new todo", () => {
      cy.request({
        method: 'PATCH', url: updateUrl, body: apiRequests.PATCH
      }).then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body.title).to.eq(apiRequests.PATCH.title)
        expect(response.body.completed).to.eq(apiRequests.PATCH.completed)
        expect(response.body.url).contains(baseUrl)
        expect(response.body.order).to.eq(apiRequests.PATCH.order)

      });
    });

    it("Delete", () => {
      cy.request({
        //may not need the body here
        method: 'DELETE', url: updateUrl, body: apiRequests.DELETE
      }).then((response) => {
        expect(response.status).to.eq(204)
        expect(response.body).to.be.undefined
      });
    });

    //may expect the get to return any empty respnse or an error if this is a hard delete over soft delete
    it("Get", () => {
      cy.request({
        method: 'GET', url: updateUrl, failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.eq(400)
      });
    });

    //probably not needed put could assert that PATCH, DELETE, POST ect are returned
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
