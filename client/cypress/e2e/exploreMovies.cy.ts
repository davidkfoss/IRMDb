/// <reference types="cypress" />

import Chance from 'chance';
const chance = new Chance();

describe('explore movies using filter options', () => {

    it('explores movies by searching and applying filters', () => {
        cy.visit('http://localhost:5173/');
        cy.get('a[href="/movies"]').click();
        cy.contains('Load 12 more movies').click();
        cy.contains('Load 12 more movies').click();
        cy.contains('Load 12 more movies').click();
        cy.contains('Load 12 more movies').click();
        cy.get('img').last().parentsUntil('a').first().click({ force: true });
        cy.get('img').click({ force: true });
        cy.get('button[data-testid="close-button"]').click();
        cy.contains('Go back').click();
        cy.contains('Show filters').click();
        cy.get('div[data-testid="genre-select"]').click();
        cy.contains('Action').click();
        cy.contains('War').click();
        cy.get('body').type('{esc}');
        cy.contains('Name').click();
        cy.contains('Release Date').click();
        cy.contains('Sort order').click();
        cy.get('img').first().parentsUntil('a').first().click();
        cy.contains('Action');
        cy.contains('War');
        let releaseYearOldMovie = 100000;
        cy.get('h2[data-testid="release-year"]').should(($releaseYear) => {
            const releaseYearText = $releaseYear.text();
            const releaseYearValue = parseInt(releaseYearText);
            releaseYearOldMovie = releaseYearValue;
        });
        cy.contains('Go back').click();
        cy.get('img').last().parentsUntil('a').first().click();
        cy.contains('Action');
        cy.contains('War');
        cy.get('h2[data-testid="release-year"]').should(($releaseYear) => {
            const releaseYearText = $releaseYear.text();
            const releaseYearValue = parseInt(releaseYearText);
            expect(releaseYearValue).to.be.greaterThan(releaseYearOldMovie);
        });
        cy.contains('Go back').click();
        cy.contains('Show filters').click();
        cy.get('input[id="search-input"]').type('dictator');
        cy.get('button[data-testid="search-button"]').click();
        cy.contains('No movies found matching the current filters ...');
        cy.get('div[data-testid="genre-select"]').click();
        cy.get('li[data-value="Action"]').click();
        cy.get('section[data-testid="movie-grid"]').should(($movieGrid) => {
            expect($movieGrid.children().length).to.be.equal(1);
        });
        cy.get('li[data-value="War"]').click();
        cy.get('body').type('{esc}');
        cy.get('section[data-testid="movie-grid"]').should(($movieGrid) => {
            expect($movieGrid.children().length).to.be.equal(3);
        });
        cy.contains('Load 12 more movies').should('not.exist');
        cy.get('input[id="search-input"]').clear().type('the');
        cy.get('button[data-testid="search-button"]').click();
        cy.contains('Load 12 more movies');


    });
});
