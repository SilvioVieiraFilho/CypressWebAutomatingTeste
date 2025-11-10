/// <reference types="cypress" />

beforeEach('open test application', () => {
  cy.visit('/')
  cy.contains('Forms').click()
  cy.contains('Form Layouts').click()
})

it('Hello world 1 - various selectors', () => { 
  cy.wait(3000)

  // by Tag
  cy.get('input')

  // by ID value
  cy.get('#inputEmail1')

  // by Class value
  cy.get('.input-full-width')

  // by Attribute value
  cy.get('[fullwidth]')

  // by Attribute with value 
  cy.get('[placeholder="Email"]')

  // by entire class value
  cy.get('[class="input-full-width size-medium status-basic shape-rectangle nb-transition"]')

  // combine several attributes 
  cy.get('[placeholder="Email"][fullwidth]')
 cy.get('input[placeholder="Email"]')


  // find by data-cy attributes
  cy.get('[data-cy="inputEmail1"]')
})

it.only('!cypress locator Methods', () => {
//cy.contains('Sign In', {matchCase: false})
cy.contains('Sign in')
cy.contains('[status="warning"]','Sign in')
cy.contains('nb-card','Horizontal form').find('button')

//Theory
//get() = to find elements on the page globally
//Find() - to find only on child elements 
//contains() - to find web element by  text 
})
