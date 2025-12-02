/// <reference types="cypress" />

import { onDatepickerPage } from "../paga-objects/detepickerPage"
import { onformLyoutsPage } from "../paga-objects/formLayoutsPage"
import { navigateTo } from "../paga-objects/navigationPage"

beforeEach('open test application', () => {
  cy.visit('/')
})

it('navigation teste', () => {

navigateTo.formLayoutspage()
navigateTo.datePickerPage()
navigateTo.tooltipPage()
navigateTo.toastrPage()

    
})

it.only('test with page objects', () => {

    navigateTo.formLayoutspage()
    onformLyoutsPage.submitUsingtTheGridForm('teste_teste@gmail.com','Welcome',0)
    onformLyoutsPage.submitBasicForm("artem@test.com",'Welcome',true)
    navigateTo.datePickerPage()
    onDatepickerPage.selectCommonDatepickerDateFromToday(5)
    onDatepickerPage.selectRangePickerDateFromToday(10,50)
})


