describe('Feature 1: Filter events by city', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173');
  });

  it('should show a list of suggestions when the user types in a city', () => {
    cy.get('input[role="textbox"]').first().type('Berlin');

    cy.get('.suggestions li').should('have.length.greaterThan', 0);
  });

  it('should filter events based on the selected city suggestion', () => {
    cy.get('input[role="textbox"]').first().type('Berlin');
    cy.get('.suggestions li').contains('Berlin').click();

    cy.get('.event').each(($el) => {
      cy.wrap($el).should('contain.text', 'Berlin');
    });
  });
});
