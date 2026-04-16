import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getProductById } from '../services/api.js'
import { useStore } from '../context/useStore.js'

function ProductDetail() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const { addToCart } = useStore()

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductById(id)
        setProduct(data)
      } catch {
        setError('Unable to load this product right now.')
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [id])

  if (loading) {
    return <p className="status">Loading product...</p>
  }

  if (error) {
    return <p className="status status-error">{error}</p>
  }

  if (!product) {
    return <p className="status status-error">Product not found.</p>
  }

  return (
    <section className="detail">
      <img src={product.image} alt={product.title} className="detail-image" />
      <div className="detail-copy">
        <p className="chip">{product.category}</p>
        <h1>{product.title}</h1>
        <p className="meta">{product.brand} · Rated {product.rating.toFixed(1)} / 5</p>
        <p className="price">${product.price.toFixed(2)}</p>
        <p>{product.description}</p>
        <div className="actions">
          <button onClick={() => addToCart(product)} className="button-primary">Add to Cart</button>
          <Link to="/cart" className="button-link">Review Cart</Link>
        </div>
      </div>
    </section>
  )
}

export default ProductDetail
