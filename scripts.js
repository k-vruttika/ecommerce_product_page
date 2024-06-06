document.addEventListener('DOMContentLoaded', () => {
    const imgs = document.querySelectorAll('.img-select a');
    const imgBtns = [...imgs];
    let imgId = 1;

    imgBtns.forEach((imgItem) => {
        imgItem.addEventListener('click', (event) => {
            event.preventDefault();
            imgId = imgItem.dataset.id;
            slideImage();
        });
    });

    function slideImage() {
        const displayWidth = document.querySelector('.img-display').clientWidth;
        document.querySelector('.img-showcase').style.transform = `translateX(${- (imgId - 1) * displayWidth}px)`;
    }

    window.addEventListener('resize', slideImage);

    // Cart functionality
    const cartModal = document.getElementById('cart-modal');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const addToCartBtn = document.querySelector('.add-to-cart');
    const viewCartBtn = document.querySelector('.view-cart');
    const closeModal = document.querySelector('.close');
    let cart = [];

    addToCartBtn.addEventListener('click', () => {
        const productTitle = document.querySelector('.product-title').innerText;
        const productPrice = parseFloat(document.querySelector('.new-price span').innerText.replace('₹', ''));
        const quantity = parseInt(document.getElementById('quantity').value);

        const product = {
            title: productTitle,
            price: productPrice,
            quantity: quantity
        };

        cart.push(product);
        updateCart();
    });

    viewCartBtn.addEventListener('click', () => {
        cartModal.style.display = 'block';
    });

    closeModal.addEventListener('click', () => {
        cartModal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target == cartModal) {
            cartModal.style.display = 'none';
        }
    });

    function updateCart() {
        cartItemsContainer.innerHTML = '';
        let total = 0;

        cart.forEach((item, index) => {
            const cartItem = document.createElement('li');
            cartItem.innerText = `${item.title} - ₹${item.price} x ${item.quantity}`;
            cartItemsContainer.appendChild(cartItem);

            total += item.price * item.quantity;
        });

        cartTotal.innerText = `Total: ₹${total.toFixed(2)}`;
    }
});
