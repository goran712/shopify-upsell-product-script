---

# Shopify Product Upsell with JavaScript

This script dynamically injects a product upsell section on the Shopify product page `/products/splittesting-beanie`. It uses `MutationObserver` to handle URL changes and DOM modifications, ensuring the upsell block stays visible even if the page updates via AJAX or SPA-like behavior.

### Key Features

1. **Upsell Product Injection:**
   - The script injects a product upsell block above the product description on the specific product page.
   - It includes product image, description, price (discounted and regular), and an "Add to Cart" button.

2. **Dynamic Cart Update:**
   - When the "Add" button is clicked, the upsell product is added to the cart.
   - The cart data is dynamically fetched and updated using Shopify's `/cart/add.js` and `/cart.js` endpoints.

3. **Cart Notification Update:**
   - A cart notification appears after adding the upsell product, displaying the product image and name.
   - The notification also updates the "View my cart" button with the current number of items in the cart.

4. **Cart Icon Bubble Update:**
   - The cart icon bubble is dynamically updated to reflect the current number of items in the cart.
   - It checks if the bubble exists, and if not, creates and appends it next to the cart icon.

### Mutation Observers

- **Reinjecting the Upsell Block:** A `MutationObserver` monitors for the removal of the upsell block and reinjects it if necessary.
- **URL Changes Detection:** Another `MutationObserver` monitors URL changes using `history.pushState` and the `popstate` event to detect page navigation changes without a full reload.

### Custom Styles

The script dynamically injects CSS to style the upsell section for different screen sizes, ensuring a responsive design across various devices.

---

### Extra Functionality:

- **Updating the Cart:**
   - The script updates the cart contents dynamically on button click.
  
- **Cart Notification:**
   - It displays a notification when an item is added, showing the product image and name.
  
- **Cart Bubble Update:**
   - The cart item count bubble near the cart icon is updated with the latest item count.

---
