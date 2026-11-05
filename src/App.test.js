import { fireEvent, render, screen, within } from '@testing-library/react';
import App from './App';

afterEach(() => {
  window.history.replaceState({}, '', '/');
});

test('renders the Forma storefront and product collection', () => {
  render(<App />);

  expect(screen.getByRole('heading', { name: /less, but better/i })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: /pieces to keep/i })).toBeInTheDocument();
  expect(screen.getByText('The Everyday Trench')).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Shopping bag, 0 items' }).querySelector('svg')).toBeInTheDocument();
});

test('filters products by collection', () => {
  render(<App />);

  fireEvent.click(screen.getByRole('button', { name: 'Women' }));

  expect(screen.getByText('The Everyday Trench')).toBeInTheDocument();
  expect(screen.queryByText('Relaxed Linen Shirt')).not.toBeInTheDocument();
  expect(screen.getByText('SHOWING 4 OF 8 PIECES')).toBeInTheDocument();
});

test('footer collection links filter the shop and show customer-care details', () => {
  render(<App />);

  const footer = screen.getByRole('contentinfo');
  fireEvent.click(within(within(footer).getByRole('navigation', { name: 'Shop' })).getByRole('link', { name: 'Women' }));

  expect(screen.getByText('SHOWING 4 OF 8 PIECES')).toBeInTheDocument();
  expect(within(footer).getByRole('link', { name: 'hello@forma.studio' })).toHaveAttribute('href', 'mailto:hello@forma.studio');
  expect(within(footer).getByRole('link', { name: /back to top/i })).toHaveAttribute('href', '#top');
});

test('footer policy links navigate to the terms and returns pages', () => {
  render(<App />);

  const footer = screen.getByRole('contentinfo');
  fireEvent.click(within(footer).getByRole('link', { name: /terms & conditions/i }));
  expect(screen.getByRole('heading', { name: 'Terms & Conditions' })).toBeInTheDocument();
  expect(window.location.pathname).toBe('/policies/terms-and-conditions');

  fireEvent.click(within(screen.getByRole('contentinfo')).getAllByRole('link', { name: /returns policy/i })[0]);
  expect(screen.getByRole('heading', { name: 'Returns Policy' })).toBeInTheDocument();
  expect(window.location.pathname).toBe('/policies/returns-policy');
});

test.each([
  ['/policies/terms-and-conditions', 'Terms & Conditions'],
  ['/policies/returns-policy', 'Returns Policy'],
])('loads policy page directly at %s', (path, title) => {
  window.history.replaceState({}, '', path);
  render(<App />);

  expect(screen.getByRole('heading', { name: title })).toBeInTheDocument();
  expect(document.title).toBe(`${title} | Forma`);
});

test('a product page loads directly from its URL', () => {
  window.history.replaceState({}, '', '/products/the-everyday-trench');
  render(<App />);

  expect(screen.getByRole('heading', { name: 'The Everyday Trench' })).toBeInTheDocument();
  expect(screen.getByText('Warm stone', { selector: 'strong' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: /you may also like/i })).toBeInTheDocument();
  expect(screen.getByLabelText('Shopping benefits').querySelectorAll('svg')).toHaveLength(3);

  fireEvent.click(screen.getByRole('tab', { name: 'Materials' }));
  expect(screen.getByRole('tabpanel')).toHaveTextContent(/cotton blend/i);

  fireEvent.click(screen.getByRole('tab', { name: 'Size & Fit' }));
  expect(screen.getByRole('tabpanel')).toHaveTextContent(/relaxed through the body/i);
  expect(screen.getByRole('tabpanel')).toHaveTextContent('AVAILABLE SIZES');

  fireEvent.click(screen.getByRole('tab', { name: 'Shipping & Returns' }));
  expect(screen.getByRole('tabpanel')).toHaveTextContent(/returns policy/i);

  fireEvent.click(screen.getByRole('button', { name: /add to favorites/i }));
  expect(screen.getByRole('button', { name: /saved to favorites/i })).toHaveAttribute('aria-pressed', 'true');
});

test('adds a product to the bag and updates its quantity', () => {
  render(<App />);

  const product = screen.getByText('The Everyday Trench').closest('article');
  fireEvent.click(within(product).getByRole('button', { name: /view details for the everyday trench/i }));

  expect(screen.getByRole('heading', { name: 'The Everyday Trench' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: /you may also like/i })).toBeInTheDocument();
  expect(window.location.pathname).toBe('/products/the-everyday-trench');
  fireEvent.click(screen.getByRole('button', { name: 'Deep olive' }));
  fireEvent.click(screen.getByRole('button', { name: 'M', exact: true }));
  fireEvent.change(screen.getByLabelText('ZIP or postal code'), { target: { value: '10001' } });
  fireEvent.click(screen.getByRole('button', { name: 'CHECK' }));
  expect(screen.getByRole('status')).toHaveTextContent(/10001: 3–5 business days/i);
  fireEvent.click(screen.getByRole('button', { name: /add to bag — \$198/i }));

  expect(screen.getByRole('dialog')).toBeInTheDocument();
  expect(window.location.pathname).toBe('/products/the-everyday-trench');
  expect(screen.getByRole('heading', { name: /shopping bag \(1\)/i })).toBeInTheDocument();
  expect(screen.getByText('Deep olive · M')).toBeInTheDocument();
  expect(within(screen.getByRole('dialog')).getAllByText('$198')).toHaveLength(2);

  fireEvent.click(screen.getByRole('button', { name: /add one the everyday trench/i }));

  expect(screen.getByRole('heading', { name: /shopping bag \(2\)/i })).toBeInTheDocument();
  expect(within(screen.getByRole('dialog')).getAllByText('$396')).toHaveLength(2);
});

test('related products open their own product pages', () => {
  render(<App />);

  fireEvent.click(screen.getByRole('button', { name: /view details for the everyday trench/i }));
  fireEvent.click(screen.getByRole('button', { name: /view details for soft structure blazer/i }));

  expect(screen.getByRole('heading', { name: 'Soft Structure Blazer' })).toBeInTheDocument();
  expect(window.location.pathname).toBe('/products/soft-structure-blazer');
});
