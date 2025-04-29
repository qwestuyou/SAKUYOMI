export async function fetchProducts() {
  const res = await fetch('http://localhost:5000/api/products'); 
  if (!res.ok) throw new Error('Не вдалося завантажити товари');
  return res.json();
}
