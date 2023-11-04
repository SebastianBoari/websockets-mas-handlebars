import { Router } from 'express'
import productManager from '../classes/ProductManager.js'

const router = Router()

const viewsProductsRouter = (io) => {

	router.get('/home', async (req, res) => {
		try{
			const products = await productManager.getProducts()
			
			res.render('home', { products: products })
		} catch(error){
			res.render('error', { error: error })
		}
	})
		
	router.get('/realtimeproducts', async (req, res) => {
		try{
			const products = await productManager.getProducts()
			
			io.on('connection', (socket) => {
				io.emit('products', products)

				socket.on('addProduct', async (product) => {
					if(!product) return
					
					const { title, description, price, thumbnail, code, stock, category } = product
	
					await productManager.addProduct(title, description, price, thumbnail, code, stock, category)
					const updatedProducts = await productManager.getProducts()
	
					io.emit('products', updatedProducts)
				})

				socket.on('deleteProduct', async (pid) => {
					if(!pid) return

					const productId = Number(pid)

					await productManager.deleteProduct(productId)
					const updatedProducts = await productManager.getProducts()

					io.emit('products',  updatedProducts)
				})

				socket.on('updateProduct', async (product) => {
					if(!product) return 

					const { pid, field, data} = product 
					
					await productManager.updateProduct(pid, field, data)
					const updatedProducts = await productManager.getProducts()
					
					io.emit('products', updatedProducts)
				})
			})
			res.render('realTimeProducts')
		} catch(error){
			res.render('error', { error: error })
		}
	})

	return router
}
	
export default viewsProductsRouter