describe('My First Test', () => {
    it('Visits the website', () => {
        cy.visit('https://localhost:1313')
    })

    it('Creates an User', () => {
        Cypress.Cookies.debug(true, { verbose: false })
        cy.get('#create_fullname').type('Eduardo Magaldi').should('have.value', 'Eduardo Magaldi')
        cy.get('#create_email').type('fake@email.com').should('have.value', 'fake@email.com')
        cy.get('#create_password').type('ddkd%31hj4').should('have.value', 'ddkd%31hj4')
        cy.get('#create_passwordRepeat').type('ddkd%31hj4').should('have.value', 'ddkd%31hj4')
        cy.get('#register').click()
        Cypress.Cookies.preserveOnce('id_token')
    })

    it('Shows correct welcome message', () => {
        Cypress.Cookies.preserveOnce('id_token')
        cy.get('#message_welcome').should('have.text', 'Welcome Eduardo Magaldi!')
    });

    it('Logs out correctly', () => {
        Cypress.Cookies.preserveOnce('id_token')
        cy.wait(500)
        cy.get('#logout').click()
        cy.get('#message_welcome').should('have.text', 'Welcome !')
    });

    it('Navigates to Login Page', () => {
        cy.get('#nav_login').click()
    });

    it('Tries to log in with just created user', () => {
        cy.get('#login_email').type('fake@email.com').should('have.value', 'fake@email.com')
        cy.get('#login_password').type('ddkd%31hj4').should('have.value', 'ddkd%31hj4')
        cy.get('#login').click()
        Cypress.Cookies.preserveOnce('id_token')
    });

    it('Shows correct welcome message', () => {
        Cypress.Cookies.preserveOnce('id_token')
        cy.get('#message_welcome').should('have.text', 'Welcome Eduardo Magaldi!')
    });

    it('Logs out correctly', () => {
        Cypress.Cookies.preserveOnce('id_token')
        cy.wait(500)
        cy.get('#logout').click()
        cy.get('#message_welcome').should('have.text', 'Welcome !')
    });
})