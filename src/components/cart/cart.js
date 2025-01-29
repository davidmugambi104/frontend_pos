class Cart {
  constructor(apiBaseUrl, authToken) {
      this.apiBaseUrl = apiBaseUrl;
      this.authToken = authToken;
      this.cart = JSON.parse(localStorage.getItem('cart')) || [];
  }

  async fetchProduct(productId) {
      try {
          const response = await fetch(`${this.apiBaseUrl}/products/${productId}`, {
              headers: { 'Authorization': `Bearer ${this.authToken}` }
          });
          return response.ok ? response.json() : null;
      } catch (error) {
          console.error('Error fetching product:', error);
          return null;
      }
  }

  async addToCart(productId, quantity) {
      const product = await this.fetchProduct(productId);
      if (!product) {
          console.error('Product not found');
          return;
      }

      const stockCheck = await this.validateStock(productId, quantity);
      if (!stockCheck) {
          console.error('Insufficient stock');
          return;
      }

      const existingItem = this.cart.find(item => item.id === productId);
      if (existingItem) {
          existingItem.quantity += quantity;
      } else {
          this.cart.push({ id: productId, name: product.name, price: product.price, quantity });
      }
      this.updateStorage();
  }

  async validateStock(productId, quantity) {
      try {
          const response = await fetch(`${this.apiBaseUrl}/stock/${productId}`, {
              headers: { 'Authorization': `Bearer ${this.authToken}` }
          });
          const stockData = await response.json();
          return stockData.available >= quantity;
      } catch (error) {
          console.error('Error checking stock:', error);
          return false;
      }
  }

  removeFromCart(productId) {
      this.cart = this.cart.filter(item => item.id !== productId);
      this.updateStorage();
  }

  updateStorage() {
      localStorage.setItem('cart', JSON.stringify(this.cart));
  }

  getCartTotal() {
      return this.cart.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  async checkout() {
      try {
          const response = await fetch(`${this.apiBaseUrl}/checkout`, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${this.authToken}`
              },
              body: JSON.stringify({ items: this.cart })
          });
          const result = await response.json();
          if (response.ok) {
              console.log('Checkout successful:', result);
              this.cart = [];
              this.updateStorage();
          } else {
              console.error('Checkout failed:', result);
          }
      } catch (error) {
          console.error('Error processing checkout:', error);
      }
  }
}

export default Cart;
