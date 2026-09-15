import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import App from './App';
import ConsultationPage from './ConsultationPage';

test('opens the consultation page when Book Consultation is clicked', () => {
  render(<App />);

  fireEvent.click(screen.getByRole('button', { name: /book consultation/i }));

  expect(
    screen.getByRole('heading', { name: /book your consultation/i })
  ).toBeInTheDocument();
});

test('shows success without opening WhatsApp on the customer side after booking', async () => {
  window.open = jest.fn();
  window.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: async () => ({ success: true }),
    })
  );

  render(<ConsultationPage onBack={() => {}} />);

  fireEvent.change(screen.getByLabelText(/full name/i), {
    target: { value: 'Jane Doe' },
  });
  fireEvent.change(screen.getByLabelText(/phone number/i), {
    target: { value: '9876543210' },
  });
  fireEvent.change(screen.getByLabelText(/email address/i), {
    target: { value: 'jane@example.com' },
  });
  fireEvent.change(screen.getByLabelText(/service needed/i), {
    target: { value: 'Finance' },
  });
  fireEvent.change(screen.getByLabelText(/project details/i), {
    target: { value: 'Need loan guidance' },
  });

  fireEvent.click(screen.getByRole('button', { name: /submit request/i }));

  expect(
    screen.getByText(/booking confirmed! your request has been received successfully/i)
  ).toBeInTheDocument();

  await waitFor(() => {
    expect(window.fetch).toHaveBeenCalledWith(
      '/api/consultation',
      expect.objectContaining({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      })
    );
  });

  expect(window.open).not.toHaveBeenCalled();
});
