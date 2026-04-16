import { useMemo, useState } from 'react'

import { StoreContext } from './storeContext.js'

export function StoreProvider({ children }) {
  const [cartItems, setCartItems] = useState([])

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const found = prevItems.find((item) => item.id === product.id)

      if (found) {
        return prevItems.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item,
        )
      }

      return [...prevItems, { ...product, qty: 1 }]
    })
  }

  const updateQty = (productId, qty) => {
    const nextQty = Math.max(1, Number(qty) || 1)
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId ? { ...item, qty: nextQty } : item,
      ),
    )
  }

  const removeFromCart = (productId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId))
  }

  const clearCart = () => {
    setCartItems([])
  }

  const cartTotal = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.price * item.qty, 0),
    [cartItems],
  )

  const value = {
    cartItems,
    addToCart,
    updateQty,
    removeFromCart,
    clearCart,
    cartTotal,
  }

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}
