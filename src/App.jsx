import { Link, NavLink, Route, Routes } from 'react-router-dom'
import ProductList from './components/ProductList.jsx'
import ProductDetail from './components/ProductDetail.jsx'
import Cart from './components/Cart.jsx'
import Checkout from './components/Checkout.jsx'
import { useStore } from './context/useStore.js'

function App() {
  const { cartItems } = useStore()
  const cartCount = cartItems.reduce((sum, item) => sum + item.qty, 0)

  return (
    <div className="app-shell">
      <header className="topbar aura-panel">
        <div className="brand-wrap">
          <p className="eyebrow">NEON MARKET</p>
          <Link to="/" className="brand">Orbital Store</Link>
        </div>
        <nav>
          <NavLink to="/" end className="nav-link">Collection</NavLink>
          <NavLink to="/cart" className="nav-link nav-cart">
            Cart
            <span className="badge">{cartCount}</span>
          </NavLink>
          <NavLink to="/checkout" className="nav-link">Checkout</NavLink>
        </nav>
      </header>

      <main className="page-content aura-panel">
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
