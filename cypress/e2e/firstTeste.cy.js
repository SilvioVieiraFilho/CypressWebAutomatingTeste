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

it('!cypress locator Methods', () => {
  //cy.contains('Sign In', {matchCase: false})
  cy.contains('Sign in')
  cy.contains('[status="warning"]', 'Sign in')
  cy.contains('nb-card', 'Horizontal form').find('button')
  cy.contains('nb-card', 'Horizontal form').contains('Sign in')
  //Theory
  //get() = to find elements on the page globally
  //Find() - to find only on child elements 
  //contains() - to find web element by  text 
})

it('Chil elements', () => {

  cy.contains('nb-card', 'Using the Grid').find('.row').find('button')
  cy.get('nb-card nb-radio-group').contains('Option 1')
  cy.get('nb-card  > nb-card-body [placeholder="Jane Doe"]')
})

it('Parents elements', () => {
  cy.get('#inputEmail1').parents('form').find('button') //Pega todos os ancestrais (todos os elementos “acima” na hierarquia).
  cy.contains('Using the Grid').parent().find('button') //Pega o elemento pai direto (um nível acima na árvore do HTML
  cy.get('#inputEmail1').parentsUntil('nb-card-body').find('button')//Ele pega todos os ancestrais até chegar a um seletor específico mas não inclui esse seletor final.

})

it('Cypress Chains', () => {
  cy.get('#inputEmail1').
    parents('form').
    find('button')
    .click()

  cy.get('#inputEmail1')
    .parents('form')
    .find('nb-radio')
    .first()
    .should('have.text', 'Option 1')
})

it('Reusing locators', () => {

  //THIS WILL NOT WORK!!!

  //const inputEmail1 = cy.get('#inputemail1')
  //inputEmail1.parents('form').find('button')
  //inputEmail1.parents('form').find('nb-radio')

  //1. Cypress Alias
  //cy.get('#inputEmail1').as('inputEmail1')
  //cy.get('@inputEmail1').parents('form').find('button')
  //cy.get('@inputEmail1').parents('form').find('nb-radio')


  // 2. Cypress the() methdo

  cy.get('#inputEmail1').then(inputEmail => {

    cy.wrap(inputEmail).parents('form').find('button')
    cy.wrap(inputEmail).parents('form').find('nb-radio')
    cy.wrap('Hello').should('equal', 'Hello')
    cy.wrap(inputEmail).as('inputEmail2')

  })

  cy.get('@inputEmail2').click()
})

it('Extracting Values', () => {
  //1.using a jquery methods
  cy.get('[for="exampleInputEmail1"]').then(label => {
    const emailLabel = label.text()
    console.log(emailLabel)

  })

  //2. using invoke command 

  cy.get('[for="exampleInputEmail1"]').invoke('text').then(emailLabel => {

    console.log(emailLabel)

  })

  // 3. Invoke attribute value
  cy.get('#exampleInputEmail1').invoke('attr', 'class').then(classValue => {
    console.log(classValue)
  })

  // 4. inovke input field value 

  cy.get('#exampleInputEmail1').type('hellow@teste.com')
  cy.get('#exampleInputEmail1').invoke('prop', 'value').then(value => {
    console.log(value)
  })
})

it('Assertions', () => {
  cy.get('[for="exampleInputEmail1"]').should('have.text', 'Email address')
  cy.get('[for="exampleInputEmail1"]').then(label => {
    expect(label).to.have.text('Email address')
  })

  cy.get('[for="exampleInputEmail1"]').invoke('text').then(emailLabel => {
    expect(emailLabel).to.equal('Email address')
    cy.wrap(emailLabel).should('equal', 'Email address')
  })
})

it('Timeouts', () => {

  cy.contains('Tables & Data').click()
  cy.contains('Smart Table').click()

  const ages = [20, 30, 40, 200]

  cy.wrap(ages).each(age => {

    cy.get('[placeholder="Age"]', { timeout: 10000 })
      .clear()
      .type(age)

    cy.wait(500)

    cy.get('tbody tr').each(tableRow => {
      if (age == 200) {
        cy.wrap(tableRow).should('contain.text', 'No data found')
      } else {
        cy.wrap(tableRow).find('td').last().should('have.text', age)
      }
    })

  })
})


