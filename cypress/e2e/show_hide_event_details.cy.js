// cypress/e2e/show_hide_event_details.cy.js

describe('Feature 2: Show/Hide Event Details', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173');
  });

  it('should show event details when user clicks "Show Details"', () => {
    cy.get('.event').first().as('firstEvent');

    cy.get('@firstEvent').contains('Show Details').click();

    cy.get('@firstEvent').find('.event-details').should('be.visible');
  });

  it('should hide event details when user clicks "Hide Details"', () => {
    cy.get('.event').first().as('firstEvent');

    // Show first
    cy.get('@firstEvent').contains('Show Details').click();

    // Then hide
    cy.get('@firstEvent').contains('Hide Details').click();

    cy.get('@firstEvent').find('.event-details').should('not.exist');
  });
});
