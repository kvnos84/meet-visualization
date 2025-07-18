describe('Feature 1: Filter Events by City', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/');
  });

  it('should show city suggestions when user types', () => {
    cy.get('[data-testid="city-input"]').type('Berlin');
    cy.get('.suggestions li').should('have.length.greaterThan', 0);
  });

  it('should filter events when a city is selected', () => {
    cy.get('[data-testid="city-input"]').type('Berlin');
    cy.get('.suggestions li').first().click();

    cy.get('.event').each(($event) => {
      cy.wrap($event).contains('Berlin');
    });
  });
});
