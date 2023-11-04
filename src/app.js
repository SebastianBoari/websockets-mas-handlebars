import express from 'express'
import handlebars from 'express-handlebars'
import { Server } from 'socket.io'
import productsRouter from './routes/products.routes.js'
import viewsProductsRouter from './routes/views.products.routes.js'
import cartsRouter from './routes/carts.routes.js'

// express config
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('./src/public'))

// handlebars config
app.engine('handlebars', handlebars.engine())
app.set('views', './src/views')
app.set('view engine', 'handlebars')

const httpServer = app.listen(8080, () => console.log('server up'))
const io = new Server(httpServer)

io.on('connection', () => console.log('new client connection'))

app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)
app.use('/', viewsProductsRouter(io))
