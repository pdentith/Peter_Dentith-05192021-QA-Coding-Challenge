////////////////////////////////////////
//TestOutline
//Hit CRUD operations
//Special Characters
//Field Length
//Large Amount of ToDo Entries
//Delte All Entries
//Check links on page (assert expected urls)
//different browsers
//hit endpoints directly through rest api calls
//To Do could try multiclick completing


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

  describe('Check Links On Page', ()=> {
    it('Assert Expected Values on Page', () => {
      cy.visitTodos()
      cy.log('header if to dos')
      cy.get("header[id='header']").contains('todos')
    });

    it.skip('Follow all the links', () => {
      //to do assert the links are not broken
    });
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

    it('Get the New Entry, Check It, Assert Filters and Items Left Count', () => {
      cy.get("ul[id='todo-list']").find("li").each(($entry) => {
        console.log($entry)
        console.log($entry[0].innerText)
        if ($entry[0].innerText == 'Go to Grocery Store') {
          $entry.find("input[type='checkbox']").click()
          cy.get("span[id='todo-count']").find("strong").invoke('text').then(parseFloat).should('be.eq', 1, 'Correct Items Left')
          cy.log('Confirm Completed Filter')
          //doing this to element getting detached from dom
          cy.get("ul[id='filters']").find("a[href='#/completed']").click({force: true})
          cy.get("span[id='todo-count']").find("strong").invoke('text').then(parseFloat).should('be.eq', 1, 'Correct Items Left')
          cy.log('Confirm All Filter')
          cy.get("a[href='#/']").click({force: true})
          cy.get("span[id='todo-count']").find("strong").invoke('text').then(parseFloat).should('be.eq', 1, 'Correct Items Left')
        }
      });
    });

    it('UnCheck the Previously Checked Item, Confrim Not Showing In Completed', () => {
      cy.get("ul[id='todo-list']").find("li").each(($entry) => {
        console.log($entry)
        console.log($entry[0].innerText)
        if ($entry[0].innerText == 'Go to Grocery Store') {
          $entry.find("input[type='checkbox']").click()
          cy.get("span[id='todo-count']").find("strong").invoke('text').then(parseFloat).should('be.eq', 2, 'Correct Items Left')
          cy.log('Confirm Completed Filter')
          //doing this to element getting detached from dom
          cy.get("ul[id='filters']").find("a[href='#/completed']").click({force: true})
          cy.get("span[id='todo-count']").find("strong").invoke('text').then(parseFloat).should('be.eq', 2, 'Correct Items Left')
          cy.get("ul[id='todo-list']").find("li").each(($hidden) => {
            console.log($hidden)
            expect($hidden[0].className, 'Element has hidden class').to.equal("hidden")
          });
        }
      });
    });

    it('Complete the Both Entries, Confrim Not Showing In Active, Clear Completed, Assert Filters Disappear', () => {
      cy.get("ul[id='todo-list']").find("li").each(($entry) => {
        console.log($entry)
        console.log($entry[0].innerText)
          $entry.find("input[type='checkbox']").click()
        })
        cy.get("span[id='todo-count']").find("strong").invoke('text').then(parseFloat).should('be.eq', 0, 'Correct Items Left')
        cy.log('Confirm Completed Filter')
        //doing this to element getting detached from dom
        cy.get("ul[id='filters']").find("a[href='#/active']").click({force: true})
        cy.get("span[id='todo-count']").find("strong").invoke('text').then(parseFloat).should('be.eq', 0, 'Correct Items Left')
        cy.get("ul[id='todo-list']").find("li").each(($hidden) => {
          console.log($hidden)
          expect($hidden[0].className, 'Element has hidden class').to.equal("completed hidden")
        })
        cy.log('Confrim 2 in clear Completed Copy, and clear, footer removed')
        cy.get("button[id='clear-completed']").invoke('text').should('contain', '(2)', 'Correct Items Left')
        cy.get("button[id='clear-completed']").click({force: true})
        cy.get("footer[id='footer']").should('not.be.visible')
      
    })
  });

  describe('Special Characters, Fringe Sceanrios', () => {
    it('Special Characters/ Field Tests', () => {
      cy.get("input[id='new-todo']").type('!@#$%^&}*()+_\":?><>{enter}')
    });

    it('Field Length Test', () => {
      cy.get("input[id='new-todo']").type('I am going to enter a really long string here to try and max out the field 32432234242342432323432432432423423443043839273249874329847320472389479823749823749283479238479328749834798324734534543534534545980923849032840982304982309482309483209482309480923409230490230242034892304832094830294803924802398403294809324832948093284093284092384092384092384032948032948230948023948320948230948032984093284039248230948230948302948093248320948230948320948230948032948320948203948204938204823409238032998{enter}')
    });

    it('Sql Injection', () => {
      cy.get("input[id='new-todo']").type('HAVING 1=1 --{enter}')
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
