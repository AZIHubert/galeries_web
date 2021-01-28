describe('header', () => {
  it('display the header', () => {
    const user = 'newUser';
    const email = 'user@email.com';
    const password = 'password';
    cy.visit('http://localhost:1234');
    cy.get('[data-testid="openLogin"]').click();
    cy.get('[data-testid="userNameField"]').type(user);
    cy.get('[data-testid="emailField"]').type(email);
    cy.get('[data-testid="passwordField"').type(password);
    cy.get('[data-testid="confirmPasswordField"').type(password);
    cy.get('[data-testid="submitButton"]').click();
  });
});
