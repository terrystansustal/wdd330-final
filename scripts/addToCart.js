function addToCart(itemName, itemPrice, itemImage) {
    // Retrieve the existing cart items from sessionStorage
    let cartItems = sessionStorage.getItem('cartItems');
  
    // Check if the cartItems variable is empty or null
    if (cartItems === null || cartItems === '') {
      // If empty, initialize an empty array
      cartItems = [];
    } else {
      // If not empty, parse the JSON string into an array
      cartItems = JSON.parse(cartItems);
    }
  
    // Create a new item object
    const newItem = {
      name: itemName,
      price: itemPrice,
      image: itemImage,
    };
  
    // Add the new item to the cartItems array
    cartItems.push(newItem);
  
    // Store the updated cartItems array back to sessionStorage
    sessionStorage.setItem('cartItems', JSON.stringify(cartItems));
  
    // Display a confirmation message
    alert(itemName + " added to cart!");
  
    // Refresh the page to update the cart display
    location.reload();
  }

function removeItemFromCart(index) {
    // Retrieve the cart items from sessionStorage
    let cartItems = sessionStorage.getItem('cartItems');

    // Check if the cartItems variable is empty or null
    if (cartItems === null || cartItems === '') {
        return; // No items to remove
    }

    // Parse the JSON string into an array
    cartItems = JSON.parse(cartItems);

    // Remove the item at the specified index from the cartItems array
    if (index >= 0 && index < cartItems.length) {
        cartItems.splice(index, 1);
    }

    // Store the updated cartItems array back to sessionStorage
    sessionStorage.setItem('cartItems', JSON.stringify(cartItems));

    // Refresh the page to update the cart display
    location.reload();
}

function displayCart() {
    // Retrieve the cartItems from sessionStorage
    let cartItems = sessionStorage.getItem('cartItems');
  
    // Check if the cartItems variable is empty or null
    if (cartItems === null || cartItems === '') {
      // If empty, display an empty cart message
      document.getElementById('cartItems').innerHTML = "<p>Your cart is empty.</p>";
      document.getElementById('cartTotal').innerHTML = ""; // Clear the total cost
    } else {
      // If not empty, parse the JSON string into an array
      cartItems = JSON.parse(cartItems);
  
      // Generate the HTML to display the cart items and calculate the total cost
      let cartHTML = '';
      let totalCost = 0;
      for (let i = 0; i < cartItems.length; i++) {
        const item = cartItems[i];
        cartHTML += "<div class='cart-item'>";
        cartHTML += "<img src='" + item.image + "' alt='Image of item'>";
        cartHTML += "<div class='item-details'>";
        cartHTML += "<p class='item-name'>" + item.name + "</p>";
        cartHTML += "<p class='item-price'>" + item.price + "</p>";
        cartHTML += "<button class='remove-button' onclick='removeItemFromCart(" + i + ")'>Remove</button>";
        cartHTML += "</div>";
        cartHTML += "</div>";
  
        // Calculate the total cost
        const price = parseFloat(item.price.replace(/[^0-9.-]+/g, ''));
        totalCost += price;
      }
  
      // Display the cart items in the HTML element with the id 'cartItems'
      document.getElementById('cartItems').innerHTML = cartHTML;
  
      // Update the total items count
      document.getElementById('itemCount').textContent = cartItems.length;
  
      // Display the total cost in the HTML element with the id 'cartTotal'
      document.getElementById('cartTotal').innerHTML = "Total Cost: $" + totalCost.toFixed(2);
    }
  }

function checkout(event) {
  event.preventDefault();

  // Retrieve the cart items from sessionStorage
  let cartItems = sessionStorage.getItem('cartItems');

  // Check if the cartItems variable is empty or null
  if (cartItems === null || cartItems === '') {
    // If the cart is empty, display an error message
    alert("Your cart is empty. Add items before checking out.");
    // Redirect the user back to the cart page
    window.location.href = "cart.html";
    return;
  }

  // Clear the cart items from sessionStorage
  sessionStorage.removeItem('cartItems');

  // Display a success message
  alert("Checkout completed successfully!");
  // Redirect the user to the thank you page
  window.location.href = "index.html";
}