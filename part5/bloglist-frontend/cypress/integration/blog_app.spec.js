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

  it('front page can be opened', () => {
    cy.contains('Blogs');
  });

  it('login form is shown', () => {
    cy.contains('Login');
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
      cy.login({ username: 'tester', password: '111111' });
    });

    it('new blog can be added', () => {
      cy.createBlog({ text: 'new blog', link: 'https://www.cypress.io/' });
      cy.contains('new blog');
    });

    describe('and blogs exist', () => {
      beforeEach(() => {
        cy.createBlog({ text: 'blog 1', link: 'google.com' });
        cy.createBlog({ text: 'blog 2', link: 'google.com' });
        cy.createBlog({ text: 'blog 3', link: 'google.com' });
      });

      it('blog can be liked', () => {
        cy.contains('blog 2').parent().parent().find('.like').click();
        cy.contains('blog 2').parent().parent().find('.like').contains('1');
      });

      it('blog can be deleted', () => {
        cy.contains('blog 2').parent().parent().find('.remove').click();
        cy.get('.blog').should('have.length', 2);
      });

      it('blogs are sorted by likes', () => {
        cy.contains('blog 3').parent().parent().find('.like').click();
        cy.wait(500);
        cy.contains('blog 3').parent().parent().find('.like').click();
        cy.wait(500);
        cy.contains('blog 3').parent().parent().find('.like').click();
        cy.wait(500);
        cy.contains('blog 1').parent().parent().find('.like').click();
        cy.wait(500);
        cy.contains('blog 1').parent().parent().find('.like').click();
        cy.wait(500);
        cy.get('.like').then(likes => {
          expect(likes[0]).to.contain(3);
          expect(likes[1]).to.contain(2);
          expect(likes[2]).to.contain(0);
        });
      });
    });
  });
});
