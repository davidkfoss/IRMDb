/// <reference types="cypress" />

declare namespace Cypress {
    interface Chainable<Subject = any> {
        login(email: string, password: string): Chainable<void>;
        register(email: string, password: string, name: string): Chainable<void>;
    }
}