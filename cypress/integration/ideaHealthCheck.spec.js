describe('IDEA Health checks', function() {

    beforeEach(() => {
        cy.visit('localhost:3000');
        cy.wait(2000);
    });

    it('check if the application launches successfully and renders all the components', function() {
        
        cy.get('video')
            .should('be.visible');

        cy.get('#dimensions')
            .should('be.visible');

        cy.get('#capture-image')
            .should('be.visible');

        cy.get('#retake-image')
            .should('be.visible');
    
    });

    it('click on capture and test submit button and diabled capture button', function() {
    
        cy.get('#capture-image')
            .click();

        cy.get('#retake-image')
            .should('be.visible');

        cy.get('#submit-image')
            .should('be.visible');

        cy.get('#capture-image')
            .should('be.disabled');
    
    });

    it('test to check if form shows on click of submit button', () => {
        cy.server();

        cy.route({
            method: 'PUT',
            url: '/ocr/detecttext',
            status: 200,
            response: {
                status: '200'
            }
        });

        cy.route({
            method: 'POST',
            url: '/ocr/categorize',
            status: 200,
            response: {
                "dob": "13/08/1993", 
                "docId": "Abc123456", 
                "docType": "Pancard", 
                "name": "Conor"
            }
        });

        cy.get('#capture-image')
            .click();

        cy.get('#submit-image')
            .click(); 

        cy.get('#form')
            .should('be.visible');

        cy.get('#name')
            .should('have.value', 'Conor');

        cy.get('#docId')
            .should('have.value', 'Abc123456');

        cy.get('#docType')
            .should('have.value', 'Pancard')

        cy.get('#dob')
            .should('have.value', '13/08/1993')
    });
  });