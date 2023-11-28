/// <reference types="cypress" />

import Chance from 'chance';
const chance = new Chance();


describe('registering a new user', () => {
  const email = chance.email();
  const password = chance.string({ length: 8 });
  const firstName = chance.first();

  it('regisers a new user and logs out', () => {
    cy.visit('http://localhost:5173/');
    cy.register(email, password, firstName);
    cy.contains('Welcome ' + firstName + '!');
    cy.contains('Logout').click();
    cy.contains('Login');
  });

  it('logs in', () => {
    cy.visit('http://localhost:5173/');
    cy.login(email, password);
    cy.contains('Welcome back, ' + firstName + '!');
  });
})