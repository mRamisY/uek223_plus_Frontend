describe('Admin creates a new group', () => {
    it('should log in as admin, create a new group, and navigate back to admin home', () => {
        // Visit the login page
        cy.visit('http://localhost:3000/login');

        // Enter valid admin credentials and sign in
        cy.get('input[id="email"]').type('admin@example.com');
        cy.get('input[id="password"]').type('1234');
        cy.get('button[type="submit"]').click();

        // Verify the user is redirected to the admin home page
        cy.url().should('include', '/admin-home');
        cy.contains('Welcome to the Admin Dashboard');

        // Verify the presence of buttons: Manage Users, Show Groups, Create New Group
        cy.contains('Manage Users');
        cy.contains('Show Groups');
        cy.contains('Create New Group');

        // Click on "Create New Group" button
        cy.contains('Create New Group').click();

        // Verify navigation to the Create Group page
        cy.url().should('include', '/admin/create-group');
        cy.contains('Create New Group');

        // Fill out the Group Name, Group Motto, and Group Logo URL fields
        cy.get('input[name="groupName"]').type('TestName');
        cy.get('input[name="groupMotto"]').type('TestMotto');
        cy.get('input[name="groupLogoUrl"]').type('https://th.bing.com/th/id/R.424fe5698f7b25d15dca8d99d7cb6e73?rik=7tz2zNQ2Rw5ECw&pid=ImgRaw&r=0');

        // Click on the "Create Group" button
        cy.contains('Create Group').click();

        // Verify redirection back to the admin home page
        cy.url().should('include', '/admin-home');
        cy.contains('Welcome to the Admin Dashboard');
    });
});
