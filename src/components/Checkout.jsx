import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useStore } from '../context/useStore.js'

function Checkout() {
  const navigate = useNavigate()
  const { cartItems, cartTotal, clearCart } = useStore()
  const [form, setForm] = useState({ name: '', email: '', address: '' })

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!cartItems.length) {
      return
    }

    clearCart()
    navigate('/')
    alert('Order transmitted successfully!')
  }

  if (!cartItems.length) {
    return (
      <section>
        <h1>Checkout Bay</h1>
        <p className="status">Your cart is empty. Add items to proceed.</p>
        <Link to="/" className="button-link">Return to Collection</Link>
      </section>
    )
  }

  return (
    <section className="checkout-wrapper">
      <h1>Checkout Bay</h1>
      <p className="total">Transmission Total: ${cartTotal.toFixed(2)}</p>
      <form onSubmit={handleSubmit} className="checkout-form">
        <label htmlFor="name">Full Name</label>
        <input
          id="name"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <label htmlFor="address">Address</label>
        <textarea
          id="address"
          name="address"
          value={form.address}
          onChange={handleChange}
          required
        />

        <button type="submit" className="button-primary">Place Order</button>
      </form>
    </section>
  )
}

export default Checkout
