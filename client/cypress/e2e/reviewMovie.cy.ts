/// <reference types="cypress" />

import Chance from 'chance';
const chance = new Chance();

describe('review a movie and delete the review', () => {

    it('review movie and delete the review', () => {
        cy.register(chance.email(), chance.string({ length: 8 }), chance.first());
        cy.wait(1000);
        cy.get('a[href="/movies"]').click();
        cy.contains('Load 12 more movies').click();
        cy.get('img').first().parentsUntil('a').first().click();
        cy.get('input[name="rating"]').eq(3).prev().click();
        cy.get('textarea[placeholder="Write your review ..."]').type(chance.sentence());
        cy.wait(200);
        cy.get('button[type="submit"]').click();
        cy.contains('Review added!');
        cy.get('button[aria-label="Delete review"]').click();
        cy.contains('Review deleted!');
    });
});
