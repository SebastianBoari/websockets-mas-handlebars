import { Router } from 'express'
import cartManager from '../classes/CartManager.js'

const router = Router()

router.get('/:cid', async (req, res) => {
	try{
		if(!req.params.cid){
			res.status(400).send({status: 'Error', payload: 'Missed required arguments'})
		}
		const cartId = Number(req.params.cid)

		const currentCart = await cartManager.getCartById(cartId)

		res.status(200).send({ status: 'Success', payload: currentCart })
	} catch (error){
		res.status(500).send({ status: 'Error', payload: `${error}` })
	}
})

router.post('/:cid/product/:pid', async (req, res) => {
	try{
		if(!req.params.cid || !req.params.pid){
			res.status(400).send({status: 'Error', payload: 'Missed required arguments'})
		}

		const cartId = Number(req.params.cid)
		const productId = Number(req.params.pid)

		const data = await cartManager.addProductToCart(cartId, productId)

		res.status(201).send({ status: 'Success', payload: data })
	} catch (error){
		res.status(500).send({ status: 'Error', payload: `${error}` })
	}
})

export default router