import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getProducts } from '../services/api.js'
import { useStore } from '../context/useStore.js'

function ProductList() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const { addToCart } = useStore()

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts()
        setProducts(data)
      } catch {
        setError('Failed to load products. Please try again.')
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  if (loading) {
    return <p className="status">Loading products...</p>
  }

  if (error) {
    return <p className="status status-error">{error}</p>
  }

  return (
    <section>
      <div className="hero-banner">
        <p className="eyebrow">LIMITED DROP</p>
        <h1>Immersive Gear Vault</h1>
        <p className="hero-copy">
          Explore a refreshed product lineup curated from next-gen devices,
          lifestyle tech, and sharp everyday tools.
        </p>
      </div>

      <div className="grid">
        {products.map((product) => (
          <article key={product.id} className="card">
            <img src={product.image} alt={product.title} className="card-image" />
            <p className="chip">{product.category}</p>
            <h2>{product.title}</h2>
            <p className="meta">{product.brand} · {product.rating.toFixed(1)} stars</p>
            <p className="price">${product.price.toFixed(2)}</p>
            <div className="actions">
              <Link to={`/products/${product.id}`} className="button-link">Inspect</Link>
              <button onClick={() => addToCart(product)} className="button-primary">Add to Cart</button>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default ProductList
