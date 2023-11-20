/// <reference types="cypress" />

import Chance from 'chance';
const chance = new Chance();

describe('upvote reviews', () => {
    
        it('upvotes all reviews in the feed', () => {
            // add a review in case there are no reviews in the feed
            cy.register(chance.email(), chance.string({ length: 8 }), chance.first());
            cy.wait(1000);
            cy.get('a[href="/movies"]').click();
            cy.get('img').first().parentsUntil('a').first().click();
            cy.get('input[name="rating"]').eq(3).prev().click();
            cy.get('textarea[placeholder="Write your review ..."]').type(chance.sentence());
            cy.wait(200);
            cy.get('button[type="submit"]').click();
            cy.contains('Logout').click();

            // register a new user and upvote all reviews in the feed
            cy.register(chance.email(), chance.string({ length: 8 }), chance.first());
            cy.wait(1000);
            cy.contains('FEED').click();
            cy.get('button[aria-label="Upvote review"]').click({ multiple: true});
            cy.contains('Vote added!');
            cy.wait(1500);
            cy.get('button[aria-label="Remove upvote from review"]').click({ multiple: true});
            cy.contains('Vote removed!');
        });
    });
