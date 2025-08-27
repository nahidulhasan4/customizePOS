import { useState, useEffect } from 'react';
import Head from 'next/head';

export default function BillingDashboard() {
  const [activeTab, setActiveTab] = useState('products');
  const [products, setProducts] = useState([]);
  const [tables, setTables] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: '', price: '', image: null });
  const [imagePreview, setImagePreview] = useState(null);

  // Load data from localStorage on component mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedProducts = JSON.parse(localStorage.getItem('products')) || [];
      const savedTables = JSON.parse(localStorage.getItem('tables')) || [];
      
      // Add some sample products if none exist
      if (savedProducts.length === 0) {
        const sampleProducts = [
          { id: 1, name: 'Pizza Margherita', price: 12.99, image: '/api/placeholder/200/200' },
          { id: 2, name: 'Caesar Salad', price: 8.99, image: '/api/placeholder/200/200' },
          { id: 3, name: 'Burger & Fries', price: 10.99, image: '/api/placeholder/200/200' },
          { id: 4, name: 'Coca Cola', price: 2.99, image: '/api/placeholder/200/200' },
          { id: 5, name: 'Chocolate Cake', price: 6.99, image: '/api/placeholder/200/200' },
        ];
        setProducts(sampleProducts);
        localStorage.setItem('products', JSON.stringify(sampleProducts));
      } else {
        setProducts(savedProducts);
      }
      
      setTables(savedTables);
    }
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('products', JSON.stringify(products));
    }
  }, [products]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('tables', JSON.stringify(tables));
    }
  }, [tables]);

  // Handle product image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewProduct({ ...newProduct, image: reader.result });
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Add a new product
  const addProduct = () => {
    if (newProduct.name && newProduct.price && newProduct.image) {
      const updatedProducts = [...products, { 
        id: Date.now(), 
        ...newProduct, 
        price: parseFloat(newProduct.price) 
      }];
      setProducts(updatedProducts);
      setNewProduct({ name: '', price: '', image: null });
      setImagePreview(null);
      
      // Force update localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('products', JSON.stringify(updatedProducts));
      }
      
      // Show success notification
      alert('Product added successfully!');
    } else {
      alert('Please fill all fields and upload an image');
    }
  };

  // Create a new table
  const addTable = () => {
    const tableId = Date.now();
    const updatedTables = [...tables, { id: tableId, name: `Table ${tables.length + 1}`, items: [] }];
    setTables(updatedTables);
    
    // Force update localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('tables', JSON.stringify(updatedTables));
    }
  };

  // Add product to a table
  const addToTable = (tableId, product) => {
    const updatedTables = tables.map(table => {
      if (table.id === tableId) {
        const existingItem = table.items.find(item => item.id === product.id);
        if (existingItem) {
          return {
            ...table,
            items: table.items.map(item =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            )
          };
        } else {
          return {
            ...table,
            items: [...table.items, { ...product, quantity: 1 }]
          };
        }
      }
      return table;
    });
    setTables(updatedTables);
    
    // Force update localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('tables', JSON.stringify(updatedTables));
    }
  };

  // Remove item from table
  const removeFromTable = (tableId, productId) => {
    const updatedTables = tables.map(table => {
      if (table.id === tableId) {
        return {
          ...table,
          items: table.items.filter(item => item.id !== productId)
        };
      }
      return table;
    });
    setTables(updatedTables);
    
    // Force update localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('tables', JSON.stringify(updatedTables));
    }
  };

  // Update item quantity in table
  const updateQuantity = (tableId, productId, newQuantity) => {
    if (newQuantity < 1) return;
    
    const updatedTables = tables.map(table => {
      if (table.id === tableId) {
        return {
          ...table,
          items: table.items.map(item =>
            item.id === productId
              ? { ...item, quantity: newQuantity }
              : item
          )
        };
      }
      return table;
    });
    setTables(updatedTables);
    
    // Force update localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('tables', JSON.stringify(updatedTables));
    }
  };

  // Calculate total for a table
  const calculateTotal = (items) => {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
  };

  // Reset a table
  const resetTable = (tableId) => {
    if (confirm('Are you sure you want to reset this table? All items will be removed.')) {
      const updatedTables = tables.map(table =>
        table.id === tableId ? { ...table, items: [] } : table
      );
      setTables(updatedTables);
      
      // Force update localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('tables', JSON.stringify(updatedTables));
      }
    }
  };

  // Delete a table
  const deleteTable = (tableId) => {
    if (confirm('Are you sure you want to delete this table?')) {
      const updatedTables = tables.filter(table => table.id !== tableId);
      setTables(updatedTables);
      
      // Force update localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('tables', JSON.stringify(updatedTables));
      }
    }
  };

  // Print bill
  const printBill = (table) => {
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head>
          <title>Bill for ${table.name}</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            .header { text-align: center; margin-bottom: 20px; }
            .bill-table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
            .bill-table th, .bill-table td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            .bill-table th { background-color: #f2f2f2; }
            .total { font-weight: bold; font-size: 1.2em; text-align: right; }
            .thank-you { text-align: center; margin-top: 30px; font-style: italic; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Restaurant Bill</h1>
            <h2>${table.name}</h2>
            <p>Date: ${new Date().toLocaleDateString()}</p>
          </div>
          <table class="bill-table">
            <thead>
              <tr>
                <th>Item</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              ${table.items.map(item => `
                <tr>
                  <td>${item.name}</td>
                  <td>${item.quantity}</td>
                  <td>$${item.price.toFixed(2)}</td>
                  <td>$${(item.price * item.quantity).toFixed(2)}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
          <div class="total">Total: $${calculateTotal(table.items)}</div>
          <div class="thank-you">Thank you for your business!</div>
          <script>
            window.onload = function() {
              window.print();
              setTimeout(function() { window.close(); }, 500);
            }
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  return (
    <div className="dashboard-container">
      <Head>
        <title>Billing Dashboard</title>
        <meta name="description" content="Product price management and billing system" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="dashboard-header">
        <div className="header-content">
          <h1>🍽️ Restaurant Billing System</h1>
          <div className="header-actions">
            <div className="stats">
              <div className="stat">
                <span className="stat-value">{products.length}</span>
                <span className="stat-label">Products</span>
              </div>
              <div className="stat">
                <span className="stat-value">{tables.length}</span>
                <span className="stat-label">Active Tables</span>
              </div>
            </div>
          </div>
        </div>
        <nav className="dashboard-nav">
          <button 
            className={activeTab === 'products' ? 'nav-btn active' : 'nav-btn'} 
            onClick={() => setActiveTab('products')}
          >
            <span>📦</span> Products
          </button>
          <button 
            className={activeTab === 'tables' ? 'nav-btn active' : 'nav-btn'} 
            onClick={() => setActiveTab('tables')}
          >
            <span>🍽️</span> Tables
          </button>
        </nav>
      </header>

      <main className="dashboard-main">
        {activeTab === 'products' && (
          <div className="products-section">
            <div className="section-header">
              <h2>Product Management</h2>
              <p>Add and manage your menu items</p>
            </div>
            
            <div className="dashboard-card">
              <h3>Add New Product</h3>
              <div className="form-grid">
                <div className="form-group">
                  <label>Product Name</label>
                  <input
                    type="text"
                    placeholder="e.g., Margherita Pizza"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Price ($)</label>
                  <input
                    type="number"
                    placeholder="0.00"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                    step="0.01"
                  />
                </div>
                <div className="form-group full-width">
                  <label>Product Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                  {imagePreview && (
                    <div className="image-preview">
                      <img src={imagePreview} alt="Preview" />
                    </div>
                  )}
                </div>
              </div>
              <button className="primary-btn" onClick={addProduct}>Add Product</button>
            </div>

            <div className="dashboard-card">
              <h3>Menu Items ({products.length})</h3>
              {products.length === 0 ? (
                <div className="empty-state">
                  <p>No products added yet. Add your first product above.</p>
                </div>
              ) : (
                <div className="products-grid">
                  {products.map(product => (
                    <div key={product.id} className="product-card">
                      <div className="product-image">
                        <img src={product.image || '/api/placeholder/200/200'} alt={product.name} />
                      </div>
                      <div className="product-info">
                        <h4>{product.name}</h4>
                        <p className="product-price">${product.price.toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'tables' && (
          <div className="tables-section">
            <div className="section-header">
              <div>
                <h2>Table Management</h2>
                <p>Manage customer orders and generate bills</p>
              </div>
              <button className="primary-btn" onClick={addTable}>
                + Add New Table
              </button>
            </div>

            {tables.length === 0 ? (
              <div className="dashboard-card">
                <div className="empty-state">
                  <h3>No tables created yet</h3>
                  <p>Add a table to start serving customers</p>
                  <button className="primary-btn" onClick={addTable}>
                    Create Your First Table
                  </button>
                </div>
              </div>
            ) : (
              <div className="tables-grid">
                {tables.map(table => (
                  <div key={table.id} className="dashboard-card table-card">
                    <div className="table-header">
                      <h3>{table.name}</h3>
                      <div className="table-actions">
                        <button 
                          className="secondary-btn"
                          onClick={() => printBill(table)}
                        >
                          Print Bill
                        </button>
                        <button 
                          className="warning-btn"
                          onClick={() => resetTable(table.id)}
                        >
                          Reset
                        </button>
                        <button 
                          className="danger-btn"
                          onClick={() => deleteTable(table.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>

                    <div className="table-content">
                      <div className="order-items">
                        <h4>Order Items</h4>
                        {table.items.length === 0 ? (
                          <p className="no-items">No items added to this table</p>
                        ) : (
                          <div className="items-list">
                            {table.items.map(item => (
                              <div key={item.id} className="order-item">
                                <div className="item-info">
                                  <span className="item-name">{item.name}</span>
                                  <span className="item-price">${item.price.toFixed(2)}</span>
                                </div>
                                <div className="item-controls">
                                  <button onClick={() => updateQuantity(table.id, item.id, item.quantity - 1)}>
                                    -
                                  </button>
                                  <span className="quantity">{item.quantity}</span>
                                  <button onClick={() => updateQuantity(table.id, item.id, item.quantity + 1)}>
                                    +
                                  </button>
                                  <button 
                                    className="remove-btn"
                                    onClick={() => removeFromTable(table.id, item.id)}
                                  >
                                    ×
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      <div className="table-total">
                        <div className="total-amount">
                          <span>Total:</span>
                          <span>${calculateTotal(table.items)}</span>
                        </div>
                      </div>

                      <div className="add-products">
                        <h4>Add Products</h4>
                        <div className="product-buttons">
                          {products.map(product => (
                            <button
                              key={product.id}
                              className="product-btn"
                              onClick={() => addToTable(table.id, product)}
                            >
                              <span className="product-btn-name">{product.name}</span>
                              <span className="product-btn-price">${product.price.toFixed(2)}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      <style jsx>{`
        .dashboard-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }
        
        .dashboard-header {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          padding: 1rem 2rem;
          color: white;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .header-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }
        
        .header-content h1 {
          margin: 0;
          font-size: 1.8rem;
          font-weight: 700;
        }
        
        .stats {
          display: flex;
          gap: 1.5rem;
        }
        
        .stat {
          text-align: center;
          background: rgba(255, 255, 255, 0.1);
          padding: 0.5rem 1rem;
          border-radius: 10px;
          display: flex;
          flex-direction: column;
        }
        
        .stat-value {
          font-size: 1.5rem;
          font-weight: bold;
        }
        
        .stat-label {
          font-size: 0.8rem;
          opacity: 0.8;
        }
        
        .dashboard-nav {
          display: flex;
          gap: 0.5rem;
        }
        
        .nav-btn {
          background: rgba(255, 255, 255, 0.1);
          border: none;
          color: white;
          padding: 0.75rem 1.5rem;
          border-radius: 8px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          transition: all 0.3s ease;
        }
        
        .nav-btn:hover {
          background: rgba(255, 255, 255, 0.2);
        }
        
        .nav-btn.active {
          background: rgba(255, 255, 255, 0.3);
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        }
        
        .dashboard-main {
          padding: 2rem;
          max-width: 1400px;
          margin: 0 auto;
        }
        
        .section-header {
          margin-bottom: 2rem;
          color: white;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .section-header h2 {
          margin: 0 0 0.5rem 0;
          font-size: 2rem;
        }
        
        .section-header p {
          margin: 0;
          opacity: 0.8;
        }
        
        .dashboard-card {
          background: white;
          border-radius: 12px;
          padding: 1.5rem;
          margin-bottom: 1.5rem;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        }
        
        .dashboard-card h3 {
          margin: 0 0 1.5rem 0;
          color: #2d3748;
          font-size: 1.3rem;
        }
        
        .form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }
        
        .form-group {
          display: flex;
          flex-direction: column;
        }
        
        .form-group.full-width {
          grid-column: span 2;
        }
        
        .form-group label {
          margin-bottom: 0.5rem;
          font-weight: 600;
          color: #4a5568;
        }
        
        .form-group input {
          padding: 0.75rem;
          border: 1px solid #e2e8f0;
          border-radius: 6px;
          font-size: 1rem;
        }
        
        .image-preview {
          margin-top: 0.5rem;
        }
        
        .image-preview img {
          width: 100px;
          height: 100px;
          object-fit: cover;
          border-radius: 8px;
          border: 2px solid #e2e8f0;
        }
        
        button {
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .primary-btn {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: 6px;
          font-weight: 600;
        }
        
        .primary-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
        }
        
        .secondary-btn {
          background: #48bb78;
          color: white;
          border: none;
          padding: 0.5rem 1rem;
          border-radius: 4px;
          font-size: 0.9rem;
        }
        
        .warning-btn {
          background: #ed8936;
          color: white;
          border: none;
          padding: 0.5rem 1rem;
          border-radius: 4px;
          font-size: 0.9rem;
        }
        
        .danger-btn {
          background: #f56565;
          color: white;
          border: none;
          padding: 0.5rem 1rem;
          border-radius: 4px;
          font-size: 0.9rem;
        }
        
        .products-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 1.5rem;
        }
        
        .product-card {
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          overflow: hidden;
          transition: transform 0.3s ease;
        }
        
        .product-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        }
        
        .product-image img {
          width: 100%;
          height: 150px;
          object-fit: cover;
        }
        
        .product-info {
          padding: 1rem;
        }
        
        .product-info h4 {
          margin: 0 0 0.5rem 0;
          color: #2d3748;
        }
        
        .product-price {
          margin: 0;
          color: #667eea;
          font-weight: bold;
          font-size: 1.1rem;
        }
        
        .empty-state {
          text-align: center;
          padding: 2rem;
          color: #718096;
        }
        
        .empty-state h3 {
          margin: 0 0 0.5rem 0;
          color: #4a5568;
        }
        
        .tables-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
          gap: 1.5rem;
        }
        
        .table-card {
          display: flex;
          flex-direction: column;
          height: 100%;
        }
        
        .table-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid #e2e8f0;
        }
        
        .table-header h3 {
          margin: 0;
          color: #2d3748;
        }
        
        .table-actions {
          display: flex;
          gap: 0.5rem;
        }
        
        .table-content {
          flex: 1;
          display: flex;
          flex-direction: column;
        }
        
        .order-items {
          flex: 1;
          margin-bottom: 1rem;
        }
        
        .order-items h4 {
          margin: 0 0 1rem 0;
          color: #4a5568;
        }
        
        .no-items {
          color: #a0aec0;
          font-style: italic;
          text-align: center;
          padding: 1rem;
        }
        
        .items-list {
          max-height: 200px;
          overflow-y: auto;
        }
        
        .order-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.75rem 0;
          border-bottom: 1px solid #f7fafc;
        }
        
        .item-info {
          display: flex;
          flex-direction: column;
        }
        
        .item-name {
          font-weight: 500;
          color: #2d3748;
        }
        
        .item-price {
          font-size: 0.9rem;
          color: #718096;
        }
        
        .item-controls {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        
        .item-controls button {
          background: #667eea;
          color: white;
          border: none;
          width: 28px;
          height: 28px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .quantity {
          font-weight: bold;
          min-width: 20px;
          text-align: center;
        }
        
        .remove-btn {
          background: #f56565 !important;
          margin-left: 0.5rem;
        }
        
        .table-total {
          margin: 1rem 0;
          padding: 1rem;
          background: #f7fafc;
          border-radius: 6px;
        }
        
        .total-amount {
          display: flex;
          justify-content: space-between;
          font-size: 1.2rem;
          font-weight: bold;
          color: #2d3748;
        }
        
        .add-products {
          margin-top: auto;
        }
        
        .add-products h4 {
          margin: 0 0 1rem 0;
          color: #4a5568;
        }
        
        .product-buttons {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
          gap: 0.5rem;
        }
        
        .product-btn {
          background: #edf2f7;
          border: none;
          padding: 0.5rem;
          border-radius: 6px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        
        .product-btn:hover {
          background: #e2e8f0;
        }
        
        .product-btn-name {
          font-size: 0.8rem;
          font-weight: 500;
          margin-bottom: 0.25rem;
        }
        
        .product-btn-price {
          font-size: 0.75rem;
          color: #667eea;
          font-weight: bold;
        }
      `}</style>

      <style jsx global>{`
        * {
          box-sizing: border-box;
        }
        
        body {
          margin: 0;
          padding: 0;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
            Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
          color: #2d3748;
        }
        
        /* Scrollbar styling */
        ::-webkit-scrollbar {
          width: 8px;
        }
        
        ::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb {
          background: #cbd5e0;
          border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: #a0aec0;
        }
      `}</style>
    </div>
  );
}