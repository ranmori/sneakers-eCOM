// Get references to HTML elements by their IDs
const large = document.getElementById('large-img');
const first = document.getElementById('thumbfst');
const second = document.getElementById('thumbsnd');
const third = document.getElementById('thumbtrd');
const fourth = document.getElementById('thumbfrt')
const container = document.getElementById('productImage')
const productDetails = document.getElementById('productDetails');
const header = document.getElementById('header')


// Function to change the layout of the product image container

function imageChanger() {
  container.style.flex = 'none';
  container.style.justifyContent = "center";
  container.style.alignItems = "center";
  // Hide the header and product details sections
  header.style.display = 'none'
  productDetails.style.display = 'none';
  console.log('success');
  
 // Event listener for closing the image view
  const close = document.createElement('div');
  close.id = 'close-button';

  container.appendChild(close)
  close.addEventListener('click', function() {
    container.style.flex = '1';
    container.style.justifyContent = '';
    container.style.alignItems = '';
    header.style.display = '';
    productDetails.style.display = '';
    container.removeChild(close); // Remove the close button
  });


}
// Functions to change the large image source based on the thumbnail clicked
function firstchange() {
  large.src = "https://images.unsplash.com/photo-1603808033192-082d6919d3e1?q=80&w=1430&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
}

function secondchange() {
  large.src = "https://images.unsplash.com/photo-1603808033596-5d1fa1629eae?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDN8fHxlbnwwfHx8fHw%3D"
}

function thirdchange() {
  large.src = "https://images.unsplash.com/photo-1603808033176-9d134e6f2c74?q=80&w=1430&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  console.log('success');
}

function fourthChange() {
  large.src = "https://images.unsplash.com/photo-1603808033587-935942847de4?q=80&w=1412&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  console.log('success')

}
// Add event listeners for the large image and thumbnails
large.addEventListener('click', imageChanger);
first.addEventListener('click', firstchange);
second.addEventListener('click', secondchange);
third.addEventListener('click', thirdchange);
fourth.addEventListener('click', fourthChange);
// Variables for quantity control
const incrBtn = document.getElementById('increaseBtn')
const quantity = document.getElementById('quantity');
let index = 0;
// Function to increase the quantity of the product
function increaseQuantity() {
  index++;
  document.getElementById('quantity').value = index;
  console.log('increase')
}
// Function to decrease the quantity of the product
function decreaseQuantity() {
  if (index > 0) {
    index--;
    document.getElementById('quantity').value = index;
    console.log('decrease')
  }
};

// Add to Cart Functionality
const addCart = document.getElementById('add');

function addToCart() {
   // Display a temporary message confirming the addition to the cart
  const cartMessage = document.createElement('div');
  const message = document.createElement('p');
  cartMessage.id = 'cart-message';
  cartMessage.style.position = 'fixed';
  cartMessage.style.bottom = '20px';
  cartMessage.style.right = '20px';
  cartMessage.style.backgroundColor = '#28a745';
  cartMessage.style.color = 'white';
  cartMessage.style.padding = '10px';
  cartMessage.style.borderRadius = '5px';
  cartMessage.style.boxShadow = '0px 0px 10px rgba(0, 0, 0, 0.3)';
  cartMessage.style.zIndex = '1000';
  message.textContent = 'Successfully added to cart!';
  cartMessage.appendChild(message);
  document.body.appendChild(cartMessage);
 // Remove the message after 3 seconds
  setTimeout(() => {
    document.body.removeChild(cartMessage);
  }, 3000);

  // Add item to local storage 
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const productElement = document.getElementById('main');
  const itemId = productElement.dataset.id; // Ensure the HTML element has a data-id attribute
  const itemName = document.getElementById('productName').textContent;
      const itemPriceElement = document.getElementById('productPrice');
    const itemPrice = itemPriceElement ? itemPriceElement.textContent : '0';
  const itemImage = document.getElementById('large-img').src
  const quantity = parseInt(document.getElementById('quantity').value, 10);
  const item = {
    id: itemId,
    name: itemName,
    price: itemPrice,
    image: itemImage,
    quantity: quantity

  };
  // make sure the item is there
  const existingItem = cart.find(i => i.id === itemId)
  if (existingItem) {
    existingItem.quantity += quantity // update the quantity
  } else {
    cart.push(item); // add  a new item
  }
 // Save the updated cart to local storage

  localStorage.setItem('cart', JSON.stringify(cart));
  console.log('cart:',cart)
}



// Event listener for adding items to the cart

addCart.addEventListener('click', addToCart);


// Function to get cart items from local storage

function getCartItems() {
  return JSON.parse(localStorage.getItem('cart') || []);

}
// Event listener for the cart icon click
const cartIcon=document.getElementById('cart-icon');
cartIcon.addEventListener('click',mycart);

// Function to render the cart items in a modal or fixed position element
function mycart() {
  // render the cart items
  console.log('clicked')
  const cartItems = getCartItems();
  const cartContainer = document.getElementById('main')
  console.log('got them ', cartItems)
// Create a container for the cart items
      const  cartcontainer = document.createElement('div');
        cartcontainer.id = 'cart-container';
        cartcontainer.style.position = 'fixed';
        cartcontainer.style.top = '70px';
        cartcontainer.style.right = '10px';
        cartcontainer.style.backgroundColor = 'white';
        cartcontainer.style.padding = '20px';
        cartcontainer.style.color= 'black';
        cartcontainer.style.borderRadius = '10px';
        cartcontainer.style.boxShadow = '0px 0px 10px rgba(0, 0, 0, 0.3)';
        cartcontainer.style.zIndex = '1000';
        document.body.appendChild(cartcontainer);

  // for each item added create a n image name price and quantity
  cartItems.forEach(item => {

    const itemElement = document.createElement('div');

    const itemImage = document.createElement('img');
    itemImage.src = item.image;
    itemImage.alt = item.name;
    itemImage.style.width = '100px';
    itemImage.style.borderRadius='10px';
    itemImage.style.padding='8px';

    const itemPrice = document.createElement('p');
    // Function to extract numeric value from a price string with a dollar sign
    function parsePrice(priceString){
        // Remove any non-numeric characters (except for the decimal point)
      return parseFloat(priceString.replace(/[^0-9.]/g, ''))
    }
    // Convert item.price and item.quantity to numbers explicitly
    const price =parsePrice(item.price);
    
    itemPrice.textContent = 
      `Price : $${price * Number(item.quantity)}`
    ;
    itemPrice.style.padding='8px';
  
    const itemName = document.createElement('p');
    itemName.textContent = item.name
    itemName.style.padding='8px';
    const itemQuantity = document.createElement('p');
    itemQuantity.textContent =
      `Quantity: ${Number(item.quantity)}`;
   itemQuantity.style.padding='8px';
    // Append all elements to the item container
    itemElement.appendChild(itemName);
    itemElement.appendChild(itemPrice);
    itemElement.appendChild(itemImage);
    itemElement.appendChild(itemQuantity)
    cartcontainer.appendChild(itemElement);
 console.log('item:', item);
  });
  setTimeout(()=>{
    
    document.body.removeChild(cartcontainer);
    
  },4000)
  
  
  // Check if the cartcontainer exists before trying to remove it
// cartIcon.addEventListener('click', function() {
//   const existingContainer = document.getElementById('cart-container');
//   if (existingContainer) {
//     document.body.removeChild(existingContainer);
//   }
// });

  
}
