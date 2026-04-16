import axios from 'axios'

const api = axios.create({
  baseURL: 'https://dummyjson.com',
  timeout: 10000,
})

const toStoreProduct = (product) => ({
  id: product.id,
  title: product.title,
  description: product.description,
  price: product.price,
  image: product.thumbnail,
  brand: product.brand,
  category: product.category,
  rating: product.rating,
})

export const getProducts = async () => {
  const { data } = await api.get('/products?limit=16')
  return data.products.map(toStoreProduct)
}

export const getProductById = async (id) => {
  const { data } = await api.get(`/products/${id}`)
  return toStoreProduct(data)
}
