const socket = io()

document.addEventListener('DOMContentLoaded', () => {
	socket.on('products', (products) => {
		const productsContainer = document.getElementById('products-container')
		productsContainer.innerHTML = ''
        
		products.forEach((product) => {
			const productCard = `
                <div>
                    <div>
                        <img src="${product.thumbnails[0]}" alt="${product.description}">
                    </div>
                    <div>
                        <h3>${product.title}</h3>
                        <p>${product.description}</p>
                        <p>$${product.price}</p>
                        <p>ID: ${product.id}</p>
                        <p>Stock: ${product.stock}</p>
                    </div>
                    <button class="deleteButton" data-id="${product.id}">Delete</button>
                </div>
            `
			productsContainer.innerHTML += productCard

			const deleteButtons = document.querySelectorAll('.deleteButton')
			deleteButtons.forEach((button) => {
				const pid = button.dataset.id
				button.addEventListener('click', () => {
					socket.emit('deleteProduct', pid)
				})
			})

		})
	})
})

const createProductForm = document.getElementById('createProductForm')
createProductForm.addEventListener('submit', (e) => {
	e.preventDefault()
	const title = document.getElementById('title-input').value
	const description = document.getElementById('description-input').value
	const price = document.getElementById('price-input').value
	const thumbnail = document.getElementById('thumbnail-input').value
	const code = document.getElementById('code-input').value
	const stock = document.getElementById('stock-input').value
	const category = document.getElementById('category-input').value

	const newProduct = {
		title: title,
		description: description,
		price: price,
		thumbnail: thumbnail,
		code: code,
		stock: stock,
		category: category
	}
    
	socket.emit('addProduct', newProduct)
    
	createProductForm.reset()
})
