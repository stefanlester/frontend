// Stripe Payment
export async function createPaymentIntent(token: string, amount: number, currency = 'usd') {
  const res = await fetch(`${API_URL}/api/create-payment-intent`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ amount, currency })
  });
  if (!res.ok) throw new Error((await res.json()).error || 'Payment intent failed');
  return res.json();
}
// Auth
export async function signup(email: string, password: string) {
  const res = await fetch(`${API_URL}/api/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  if (!res.ok) throw new Error((await res.json()).error || 'Signup failed');
  return res.json();
}

export async function login(email: string, password: string) {
  const res = await fetch(`${API_URL}/api/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  if (!res.ok) throw new Error((await res.json()).error || 'Login failed');
  return res.json();
}

export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// Products
export async function fetchProducts() {
  const res = await fetch(`${API_URL}/api/products`);
  if (!res.ok) throw new Error('Failed to fetch products');
  return res.json();
}

export async function addProduct(product: { name: string; price: number; image: string; description: string }) {
  const res = await fetch(`${API_URL}/api/products`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(product),
  });
  if (!res.ok) throw new Error('Failed to add product');
  return res.json();
}

export async function updateProduct(id: number, product: { name: string; price: number; image: string; description: string }) {
  const res = await fetch(`${API_URL}/api/products/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(product),
  });
  if (!res.ok) throw new Error('Failed to update product');
  return res.json();
}

export async function deleteProduct(id: number) {
  const res = await fetch(`${API_URL}/api/products/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to delete product');
  return res.json();
}

// Orders
export async function createOrder(order: { items: any[]; total: number; customer: any }) {
  const res = await fetch(`${API_URL}/api/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(order),
  });
  if (!res.ok) throw new Error('Failed to create order');
  return res.json();
}
