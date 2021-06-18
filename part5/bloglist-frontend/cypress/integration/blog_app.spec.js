describe('Blog app', function () {
  beforeEach(() => {
    cy.request('POST', 'http://localhost:3003/api/testing/reset');

    const author = {
      name: 'Ivan Ivanov',
      username: 'tester',
      password: '111111',
    };

    cy.request('POST', 'http://localhost:3003/api/authors/', author);
    cy.visit('http://localhost:3000');
  });

  it('front page can be opened', function () {
    cy.contains('Blogs');
  });

  it('user with wrong credentials can not log in', () => {
    cy.get('#username').type('tester');
    cy.get('#password').type('111112');
    cy.get('#login').click();
    cy.should('not.contain', 'Ivan Ivanov');
  });

  it('user can log in', () => {
    cy.get('#username').type('tester');
    cy.get('#password').type('111111');
    cy.get('#login').click();
    cy.contains('Ivan Ivanov');
  });

  describe('When logged in', () => {
    beforeEach(() => {
      cy.get('#username').type('tester');
      cy.get('#password').type('111111');
      cy.get('#login').click();
      cy.contains('Ivan Ivanov');
    });

    it('new blog can be added', () => {
      cy.get('#add-blog').click();
      cy.get('#text').type('new blog');
      cy.get('#link').type('https://www.cypress.io/');
      cy.get('#post').click();
      cy.contains('new blog');
    });
  });
});
