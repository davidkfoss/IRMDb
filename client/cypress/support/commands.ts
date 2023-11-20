/// <reference types="cypress" />

Cypress.Commands.add('login', (email: string, password: string) => {
    cy.visit('http://localhost:5173/');
    cy.get('a[href="/login"]').click();
    cy.get('input[name="email"]').type(email);
    cy.get('input[name="password"]').type(password);
    cy.get('button[type="submit"]').click();
});

Cypress.Commands.add('register', (email: string, password: string, name: string) => {
    cy.visit('http://localhost:5173/');
    cy.get('a[href="/login"]').click();
    cy.contains("Don't have an account? Sign up!").click();
    cy.get('input[name="email"]').type(email);
    cy.get('input[name="password"]').type(password);
    cy.get('input[name="name"]').type(name);
    cy.get('button[type="submit"]').click();
});