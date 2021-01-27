const { createYield } = require("typescript");

describe('Smoke Test', () => {
    it('Makes sure the welcome message comes up', () => {
        cy.visit('http://localhost:63125')
            .contains('Hello, world!');
    });
});