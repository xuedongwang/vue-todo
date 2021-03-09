describe('My first test', function() {
  it('Does not do much', function() {
    expect(true).to.equal(true)
  });
  it('visite website', function() {
    cy.visit('https://example.cypress.io')
    cy.contains('type').click()
  });
})