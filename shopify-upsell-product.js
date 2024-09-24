(function () {
  // Ensure the script only runs on the target page
  if (window.location.pathname !== '/products/splittesting-beanie') {
    return;
  }
  
  // Function to inject upsell product CSS
  function injectStyles() {
    const upsellStyles = document.createElement('style');
    upsellStyles.innerHTML = `
          .upsell-product-container * {
              font-family: Assistant, sans-serif;
          }
          
          .upsell-product-container {
              display: flex;
              flex-wrap: wrap;
              background-color: #f4f4f4;
              border: 2px solid #d7d7d7;
              border-radius: 0 8px 8px 8px;
              position: relative;
              width: 100%;
          }
          
          @media only screen and (min-width: 1400px) {
            .upsell-product-container {
              max-width: 450px;
            }
          }
          
          .discount-badge {
              display: inline-block;
              background-color: #f7bb41;
              color: #433f3f;
              padding: 3px 10px;
              font-size: 14px;
              border-radius: 5px 5px 0 0;
              font-weight: 700;
          }
          
          .upsell-product--image-wrapper,
          .upsell-product--info-wrapper {
              display: flex;
              flex: 1;
          }
          
          
          .upsell-product--image-wrapper {
            align-items: center;
            justify-content: center;
            padding: 12px;
            background-color: #d7d7d7;
          }
          
          .upsell-product--image-wrapper img {
            width: 154px;
            height: auto;
          }
          
          .upsell-product--info-wrapper {
            padding: 15px;
            flex-basis: auto;
            flex-direction: column;
          }
          
          .upsell-product-title,
          .upsell-product-description {
              color: #423f3f;
          }

          .upsell-product-title {
              font-size: 18px;
              font-weight: 700;
              margin: 0;
          }
          
          .upsell-product-description {
              font-size: 14px;
              font-weight: 400;
              margin: 0 0 10px;
          }
          
          .price-section {
              display: flex;
              align-items: center;
              justify-content: flex-start;
          }
          
          .discount-price {
              color: #ce4537;
              font-size: 16px;
              font-weight: bold;
              margin-right: 5px;
          }
          
          .regular-price {
              color: #423f3f;
              font-size: 15px;
              text-decoration: line-through;
          }
          
          .add-to-cart {
              background-color: #423f3f;
              color: #fff;
              border: none;
              padding: 6px 36px;
              cursor: pointer;
              border-radius: 4px;
              font-size: 14px;
              margin-left: 20px;
              text-transform: uppercase;
              font-weight: 700;
          }
          
          .add-to-cart:hover {
              background-color: #333;
          }
          
          @media only screen and (max-width: 1300px) {
            .upsell-product--info-wrapper {
              padding: 15px;
              flex-basis: auto;
              flex-direction: column;align-items: center;
            }
          }
          
          @media only screen and (max-width: 525px) {
              .upsell-product-container {
                  display: flex;
                  flex-direction: column;
                  justify-content: center;
                  align-items: center;
                  border-radius: 0 0 8px 8px;
                  max-width: 100%;
              }
              
              .discount-badge,
              .upsell-product--image-wrapper,
              .upsell-product--info-wrapper {
                  width: 100%;
                  text-align: center;
              }
              
              .discount-badge {
                  border-radius: 8px 8px 0 0;
                  height: auto;
                  padding:5px;
                  font-size: 20px;
              }
              
              .price-section {
                  justify-content: center;
              }
          }
        `;
    document.head.appendChild(upsellStyles);
  }
  
  // Function to inject upsell product HTML
  function injectUpsell() {
    // Check if upsell has already been injected
    if (document.querySelector('.upsell-product-section')) return;
    
    // Create the upsell product HTML
    const upsellHtml = `
            <div class="upsell-product-section">
            <div class="discount-badge">20% OFF</div>
              <div class="upsell-product-container">
                <div class="upsell-product--image-wrapper">
                  <img src="https://cdn.shopify.com/s/files/1/0612/5086/3345/files/Group_72_1.png?v=1726779947" width="154" height="87" alt="Splittesting Gear">
                </div>
                <div class="upsell-product--info-wrapper">
                  <h3 class="upsell-product-title">Splittesting Gear</h3>
                  <p class="upsell-product-description">Lorem ipsum dolor sit amet</p>
                  <div class="price-section">
                    <div class="price-wrapper">
                      <span class="discount-price">$62</span>
                      <span class="regular-price">$77</span>
                    </div>
                    <button class="add-to-cart">ADD</button>
                  </div>
                </div>
              </div>
            </div>
        `;
    
    // Insert the upsell block before the product description
    const targetInsertElement = document.querySelector('div.product__description.rte');
    if (targetInsertElement) {
      targetInsertElement.insertAdjacentHTML('beforebegin', upsellHtml);
      
      // MutationObserver to watch for element removal
      const reinjectObserver = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
          if (!document.querySelector('.upsell-product-section')) {
            injectUpsell(); // Re-inject if removed
          }
        });
      });
      
      reinjectObserver.observe(targetInsertElement.parentNode, { childList: true, subtree: true });
    }
    
    // Add event listener to the 'ADD' button
    document.querySelector('.add-to-cart').addEventListener('click', function () {
      // Function to add a specific product to the cart (split testing for babies)
      addToCart('splittesting-for-babies');
    });
    
    
  }
  
  // Function to add a product to the Shopify cart using the product handle
  function addToCart(handle) {
    fetch(`/products/${handle}.js`)
        .then(function (response) {
          return response.json();
        })
        .then(function (product) {
          const formData = {
            items: [{
              id: product.variants[0].id, // Add first variant of product
              quantity: 1
            }]
          };
          
          // Append product image and title to cart notification
          const cartNotification = document.getElementById('cart-notification-product');
          if (cartNotification) {
            // Clear previous product info
            cartNotification.innerHTML = '';
            
            // Create and append product image
            const productImage = document.createElement('img');
            productImage.src = product.images[0]; // Product image source
            productImage.className = 'cart-notification-product__image';
            productImage.width = 70;
            cartNotification.appendChild(productImage);
            
            // Create and append product title container
            const productTitleContainer = document.createElement('div');
            const productTitle = document.createElement('h3');
            productTitle.className = 'cart-notification-product__name h4';
            productTitle.textContent = product.title;
            productTitleContainer.appendChild(productTitle);
            
            // Append the title container to the cart notification
            cartNotification.appendChild(productTitleContainer);
          }
          
          
          return fetch('/cart/add.js', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
          });
        })
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          console.log('Cart data:', data);
          
          // Update "View my cart" button with the new item count
          const cartButton = document.getElementById('cart-notification-button');
          if (cartButton) {
            fetch('/cart.js')
                .then(function (response) {
                  return response.json();
                })
                .then(function (cart) {
                  const newItemCount = cart.item_count; // Get the current cart item count
                  cartButton.textContent = `View my cart (${newItemCount})`; // Update button text
                  
                  // Update cart count bubble
                  const cartIconBubble = document.getElementById('cart-icon-bubble');
                  
                  // Remove the existing "Cart" span if it exists
                  const existingVisuallyHiddenSpan = cartIconBubble.querySelector('.visually-hidden');
                  if (existingVisuallyHiddenSpan) {
                    existingVisuallyHiddenSpan.remove();
                  }
                  
                  // Check if cart count bubble already exists
                  let cartCountBubble = cartIconBubble.querySelector('.cart-count-bubble');
                  if (!cartCountBubble) {
                    // Create the cart count bubble element if it doesn't exist
                    cartCountBubble = document.createElement('div');
                    cartCountBubble.className = 'cart-count-bubble';
                    
                    // Append the cart count bubble after the svg element
                    const svgElement = cartIconBubble.querySelector('svg');
                    svgElement.insertAdjacentElement('afterend', cartCountBubble);
                  }
                  
                  // Update the contents of the cart count bubble
                  cartCountBubble.innerHTML = `
                            <span aria-hidden="true">${newItemCount}</span>
                            <span class="visually-hidden">${newItemCount} item${newItemCount > 1 ? 's' : ''}</span>
                        `;
                  
                  // Add 'active' class to the cart notification
                  const cartNotificationContainer = document.querySelector('#cart-notification');
                  if (cartNotificationContainer) {
                    cartNotificationContainer.classList.add('active');
                  }
                  
                  
                })
                .catch(function (error) {
                  console.error('Error fetching cart data:', error);
                });
          }
        })
        .catch(function (error) {
          console.error('Error adding product to cart:', error);
        });
  }
  
  // MutationObserver to watch for DOM changes and inject upsell product
  const targetElementObserver = new MutationObserver(function (mutations, targetElementObserver) {
    const targetElement = document.querySelector('div.product__description.rte');
    if (targetElement) {
      injectUpsell();
      targetElementObserver.disconnect();
    }
  });
  targetElementObserver.observe(document, { childList: true, subtree: true });
  
  // MutationObserver to watch for URL changes in case of SPA-like behavior
  const urlObserver = new MutationObserver(function () {
    if (window.location.pathname === '/products/splittesting-beanie') {
      injectUpsell();
    }
  });
  
  // Override pushState to detect URL changes
  window.history.pushState = (function (pushStateFunction) {
    return function pushState() {
      const returnedValue = pushStateFunction.apply(this, arguments);
      urlObserver.observe(document, { childList: true, subtree: true });
      return returnedValue;
    };
  })(window.history.pushState);
  
  // Listen for URL changes triggered by the browser's back/forward navigation
  window.addEventListener('popstate', function () {
    urlObserver.observe(document, { childList: true, subtree: true });
  });
  
  // Inject styles when the script loads
  injectStyles();
})();