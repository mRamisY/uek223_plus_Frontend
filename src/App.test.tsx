import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

test('renders welcome message', () => {
    render(
        <MemoryRouter>
            <App />
        </MemoryRouter>
    );
    const welcomeElement = screen.getByText(/Welcome to the Homepage/i);
    expect(welcomeElement).toBeInTheDocument();
});
