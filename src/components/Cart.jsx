import { Link } from 'react-router-dom'
import { useStore } from '../context/useStore.js'

function Cart() {
  const { cartItems, cartTotal, removeFromCart, updateQty } = useStore()

  if (!cartItems.length) {
    return (
      <section>
        <h1>Cart Dock</h1>
        <p className="status">No gear selected yet. Start building your loadout.</p>
        <Link to="/" className="button-link">Browse Collection</Link>
      </section>
    )
  }

  return (
    <section>
      <h1>Cart Dock</h1>
      <div className="cart-list">
        {cartItems.map((item) => (
          <div key={item.id} className="cart-item">
            <img src={item.image} alt={item.title} className="cart-image" />
            <div className="cart-info">
              <h2>{item.title}</h2>
              <p>${item.price.toFixed(2)}</p>
            </div>
            <input
              type="number"
              min="1"
              value={item.qty}
              onChange={(event) => updateQty(item.id, event.target.value)}
              className="qty-input"
            />
            <button onClick={() => removeFromCart(item.id)} className="button-danger">Remove</button>
          </div>
        ))}
      </div>

      <h2 className="total">Dock Total: ${cartTotal.toFixed(2)}</h2>
      <Link to="/checkout" className="button-primary">Continue to Checkout</Link>
    </section>
  )
}

export default Cart
