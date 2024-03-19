describe('Basic Test', () => {
  it('Visits the initial project page', () => {
    cy.visit('/');
    cy.contains('Lens Desktop');
    cy.contains('Lens Desktop app is running!');
  });
});
