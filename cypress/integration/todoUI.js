////////////////////////////////////////
//TestOutline
//Hit CRUD operations
//Special Characters
//Filed Length
//Large Amount of ToDo Entries
//Delte All Entries
//Check links on page (assert expected urls)
//different browsers
//hit endpoints directly through rest api calls


let x = 0;

context("todo tests", () => {
  describe("filters", () => {
    it("'All' should be the default filter", () => {
      cy.visitTodos()
      cy.get(".selected")
        .contains("All");
    });

    it("Confirm All Filters Present", () => {
      cy.visitTodos()
      cy.get("ul[id='filters']").then(filters => {
        expect(filters[0]).to.contain.text('All')
        expect(filters[0]).to.contain.text('Active')
        expect(filters[0]).to.contain.text('Completed')
      });
    });
  });

  it('Assert Expected Values on Page', () => {
    cy.visitTodos()
    cy.log('header if to dos')
    cy.get("header[id='header']").contains('todos')
  });

  describe("Crud Operations", () => {
    it('Add A New Entry', () => {
      cy.visitTodos()
      //cy.get("input[id='new-todo']").should('have.text', 'What needs to be done?')
      cy.get("input[id='new-todo']").type('Go to Grocery Store{enter}')
    });

    it('Get the New Entry, confirm second in list', () => {
      cy.get("ul[id='todo-list']").then(entries => {
        expect(entries).to.contain.text('Take the dog for a walk')
        expect(entries).to.contain.text('Go to Grocery Store')
      });
    });

    it('Get the New Entry, Check It Then UnCheck It', () => {
      cy.get("ul[id='todo-list']").find("li").each(($entry) => {
        console.log($entry)
        console.log($entry[0].innerText)
        if ($entry[0].innerText == 'Go to Grocery Store') {
          $entry.find("input[type='checkbox']").click()
          cy.get("span[id='todo-count']").find("strong").invoke('text').then(parseFloat).should('be.eq', 1, 'Correct Items Left')
          cy.log('Confirm Completed Filter')
          //doing this to element getting detached from dom
          cy.get("ul[id='filters']").find("a[href='#/completed']").should('be.clickable').click()
          cy.get("span[id='todo-count']").find("strong").invoke('text').then(parseFloat).should('be.eq', 1, 'Correct Items Left')
        }
      })
    })

    it.skip('Get the New Entry, Delete It', () => {
      cy.get("ul[id='todo-list']").find("li").each(($entry) => {
        console.log($entry)
        console.log($entry[0].innerText)
        if ($entry[0].innerText == 'Go to Grocery Store') {
          $entry.find("input[type='checkbox']").click()
          cy.get("span[id='todo-count']").find("strong").invoke('text').then(parseFloat).should('be.eq', 1, 'Correct Items Left')
          cy.log('Confirm Completed Filter')
          cy.get("a[href='#/completed']").click()
          cy.get("span[id='todo-count']").find("strong").invoke('text').then(parseFloat).should('be.eq', 1, 'Correct Items Left')
          cy.log('Confirm Active Filter')
          cy.get("a[href='#/active']").click()
          cy.get("span[id='todo-count']").find("strong").invoke('text').then(parseFloat).should('be.eq', 1, 'Correct Items Left')
          // cy.log('Confirm All Filter')
          // cy.get("a[href='#/all']").click()
          // cy.get("span[id='todo-count']").find("strong").invoke('text').then(parseFloat).should('be.eq', 2, 'Correct Items Left')
        }
      });
    });

    it.skip('Get the New Entry, Check It Then Delete It', () => {
      cy.get("ul[id='todo-list']").find("li").each(($entry) => {
        console.log($entry)
        console.log($entry[0].innerText)
        if ($entry[0].innerText == 'Go to Grocery Store') {
          $entry.find("input[type='checkbox']").click()
          cy.get("span[id='todo-count']").find("strong").invoke('text').then(parseFloat).should('be.eq', 1, 'Correct Items Left')
          cy.log('Confirm Completed Filter')
          cy.get()
          cy.log('Confirm Active Filter')
          cy.get()
          cy.log('Confirm All Filter')
          cy.get()
        }
      });
    });
  });

  describe('Special Characters, Fringe Sceanrios', () => {
    it('Special Characters/ Field Tests', () => {
      cy.get("input[id='new-todo']").type('!@#$%^&}*()+_\":?><>{enter}')
    });
  });

  describe('Mini Load Test', () => {
    it('Large Amount of Entries', () => {
      cy.visitTodos()
      for (x = 0; x < 30; x++) {
        cy.get("input[id='new-todo']").type('Go to Grocery Store' + x + '{enter}')
        cy.get("span[id='todo-count']").find("strong").invoke('text').then(parseFloat).should('be.eq', x + 2)
      }
      cy.get("span[id='todo-count']").scrollIntoView().should('be.visible')
    });
  });
});
