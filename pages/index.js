import { useState, useEffect } from 'react';
import Head from 'next/head';

export default function ModernPOSDashboard() {
  const [activeTab, setActiveTab] = useState('tables');
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState(['Food', 'Drinks', 'Desserts']);
  const [tables, setTables] = useState([]);
  const [bills, setBills] = useState([]);
  const [newProduct, setNewProduct] = useState({ 
    name: '', 
    price: '', 
    category: '', 
    image: null 
  });
  const [editingProduct, setEditingProduct] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [newCategory, setNewCategory] = useState('');

  // Load data from localStorage on component mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedProducts = JSON.parse(localStorage.getItem('products')) || [];
      const savedTables = JSON.parse(localStorage.getItem('tables')) || [];
      const savedBills = JSON.parse(localStorage.getItem('bills')) || [];
      const savedCategories = JSON.parse(localStorage.getItem('categories')) || ['Food', 'Drinks', 'Desserts'];
      
      // Add sample products if none exist
      if (savedProducts.length === 0) {
        const sampleProducts = [
          { id: 1, name: 'Pizza Margherita', price: 12.99, category: 'Food', image: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMDAgMjAwIiBmaWxsPSIjZjM2NTY1Ij48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2ZmYzE3MyIvPjxjaXJjbGUgY3g9IjEwMCIgY3k9IjgwIiByPSI2MCIgZmlsbD0iI2Y1ZjVmNSIvPjxjaXJjbGUgY3g9IjcwIiBjeT0iNzAiIHI9IjEwIiBmaWxsPSIjZjM2NTY1Ii8+PGNpcmNsZSBjeD0iMTEwIiBjeT0iOTAiIHI9IjgiIGZpbGw9IiNmMzY1NjUiLz48Y2lyY2xlIGN4PSIxMzAiIGN5PSI3MCIgcj0iNyIgZmlsbD0iI2YzNjU2NSIvPjwvc3ZnPg==' },
          { id: 2, name: 'Caesar Salad', price: 8.99, category: 'Food', image: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMDAgMjAwIiBmaWxsPSIjNDhjYjYzIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2YwZmZmMCIvPjxyZWN0IHg9IjQwIiB5PSI3MCIgd2lkdGg9IjEyMCIgaGVpZ2h0PSI2MCIgZmlsbD0iI2QxZjFiZSIvPjxjaXJjbGUgY3g9IjgwIiBjeT0iMTAwIiByPSIxNSIgZmlsbD0iI2ZmYzE3MyIvPjxjaXJjbGUgY3g9IjEyMCIgY3k9IjEwMCIgcj0iMTIiIGZpbGw9IiM4YjY1MTMiLz48cmVjdCB4PSI2MCIgeT0iNTUiIHdpZHRoPSI4MCIgaGVpZ2h0PSIxMCIgZmlsbD0iIzhiNjUxMyIvPjwvc3ZnPg==' },
          { id: 3, name: 'Burger & Fries', price: 10.99, category: 'Food', image: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMDAgMjAwIiBmaWxsPSIjOGI2NTEzIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2ZmZjhhZCIvPjxyZWN0IHg9IjQwIiB5PSI2MCIgd2lkdGg9IjEyMCIgaGVpZ2h0PSI0MCIgZmlsbD0iIzhkNmEzMCIvPjxyZWN0IHg9IjQwIiB5PSIxMDAiIHdpZHRoPSIxMjAiIGhlaWdodD0iMjAiIGZpbGw9IiNmZmMxNzMiLz48cmVjdCB4PSI0MCIgeT0iMTIwIiB3aWR0aD0iMTIwIiBoZWlnaHQ9IjEwIiBmaWxsPSIjM2E1MjFlIi8+PHJlY3QgeD0iMjUiIHk9IjE1MCIgd2lkdGg9IjE1IiBoZWlnaHQ9IjQwIiBmaWxsPSIjZmY3YTJhIi8+PHJlY3QgeD0iNTAiIHk9IjE1MCIgd2lkdGg9IjE1IiBoZWlnaHQ9IjQwIiBmaWxsPSIjZmY3YTJhIi8+PHJlY3QgeD0iNzUiIHk9IjE1MCIgd2lkdGg9IjE1IiBoZWlnaHQ9IjQwIiBmaWxsPSIjZmY3YTJhIi8+PHJlY3QgeD0iMTAwIiB5PSIxNTAiIHdpZHRoPSIxNSIgaGVpZ2h0PSI0MCIgZmlsbD0iI2ZmN2EyYSIvPjxyZWN0IHg9IjEyNSIgeT0iMTUwIiB3aWR0aD0iMTUiIGhlaWdodD0iNDAiIGZpbGw9IiNmZjdhMmEiLz48cmVjdCB4PSIxNTAiIHk9IjE1MCIgd2lkdGg9IjE1IiBoZWlnaHQ9IjQwIiBmaWxsPSIjZmY3YTJhIi8+PHJlY3QgeD0iMTc1IiB5PSIxNTAiIHdpZHRoPSIxNSIgaGVpZ2h0PSI0MCIgZmlsbD0iI2ZmN2EyYSIvPjwvc3ZnPg==' },
          { id: 4, name: 'Coca Cola', price: 2.99, category: 'Drinks', image: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMDAgMjAwIiBmaWxsPSIjZWMwYTAwIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iIzMzMzMzMyIvPjxyZWN0IHg9IjUwIiB5PSIzMCIgd2lkdGg9IjEwMCIgaGVpZ2h0PSIxNDAiIGZpbGw9IiMzMzMzMzMiLz48cmVjdCB4PSI1NSIgeT0iMzUiIHdpZHRoPSI5MCIgaGVpZ2h0PSIxMzAiIGZpbGw9IiNmZmZmZmYiLz48cGF0aCBkPSJNNzAgNjAgQzg1IDUwIDEwNSA2MCAxMjAgNjAgQzEzNSA2MCAxNTAgNzAgMTM1IDgwIEMxMjAgOTAgMTA1IDkwIDkwIDkwIEM3NSA5MCA2NSA4MCA3MCA2MCBaIiBmaWxsPSIjZWMwYTAwIi8+PC9zdmc+' },
          { id: 5, name: 'Chocolate Cake', price: 6.99, category: 'Desserts', image: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMDAgMjAwIiBmaWxsPSIjN2IzNDFjIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2ZmZjhhZCIvPjxyZWN0IHg9IjQwIiB5PSI4MCIgd2lkdGg9IjEyMCIgaGVpZ2h0PSI2MCIgZmlsbD0iIzdiMzQxYyIvPjxyZWN0IHg9IjQwIiB5PSI3MCIgd2lkdGg9IjEyMCIgaGVpZ2h0PSIxMCIgZmlsbD0iI2ZmYzE3MyIvPjxyZWN0IHg9IjQwIiB5PSIxNDAiIHdpZHRoPSIxMjAiIGhlaWdodD0iMTAiIGZpbGw9IiM4YjY1MTMiLz48Y2lyY2xlIGN4PSI4MCIgY3k9IjExMCIgcj0iNSIgZmlsbD0iI2ZmZmZmZiIvPjxjaXJjbGUgY3g9IjEwMCIgY3k9IjExMCIgcj0iNSIgZmlsbD0iI2ZmZmZmZiIvPjxjaXJjbGUgY3g9IjEyMCIgY3k9IjExMCIgcj0iNSIgZmlsbD0iI2ZmZmZmZiIvPjwvc3ZnPg==' },
        ];
        setProducts(sampleProducts);
        localStorage.setItem('products', JSON.stringify(sampleProducts));
      } else {
        setProducts(savedProducts);
      }
      
      setTables(savedTables);
      setBills(savedBills);
      setCategories(savedCategories);
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

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('bills', JSON.stringify(bills));
    }
  }, [bills]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('categories', JSON.stringify(categories));
    }
  }, [categories]);

  // Handle product image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (editingProduct) {
          setEditingProduct({ ...editingProduct, image: reader.result });
        } else {
          setNewProduct({ ...newProduct, image: reader.result });
        }
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Add a new product
  const addProduct = () => {
    if (newProduct.name && newProduct.price && newProduct.category && newProduct.image) {
      const updatedProducts = [...products, { 
        id: Date.now(), 
        ...newProduct, 
        price: parseFloat(newProduct.price) 
      }];
      setProducts(updatedProducts);
      setNewProduct({ name: '', price: '', category: '', image: null });
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

  // Update a product
  const updateProduct = () => {
    if (editingProduct.name && editingProduct.price && editingProduct.category) {
      const updatedProducts = products.map(p => 
        p.id === editingProduct.id ? editingProduct : p
      );
      setProducts(updatedProducts);
      setEditingProduct(null);
      setImagePreview(null);
      
      // Force update localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('products', JSON.stringify(updatedProducts));
      }
      
      // Show success notification
      alert('Product updated successfully!');
    } else {
      alert('Please fill all fields');
    }
  };

  // Delete a product
  const deleteProduct = (id) => {
    if (confirm('Are you sure you want to delete this product?')) {
      const updatedProducts = products.filter(p => p.id !== id);
      setProducts(updatedProducts);
      
      // Force update localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('products', JSON.stringify(updatedProducts));
      }
      
      // Show success notification
      alert('Product deleted successfully!');
    }
  };

  // Add a new category
  const addCategory = () => {
    if (newCategory && !categories.includes(newCategory)) {
      const updatedCategories = [...categories, newCategory];
      setCategories(updatedCategories);
      setNewCategory('');
      
      // Force update localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('categories', JSON.stringify(updatedCategories));
      }
    }
  };

  // Delete a category
  const deleteCategory = (category) => {
    if (confirm(`Are you sure you want to delete the category "${category}"? Products in this category will be moved to "Uncategorized".`)) {
      // Move products to Uncategorized
      const updatedProducts = products.map(p => 
        p.category === category ? { ...p, category: 'Uncategorized' } : p
      );
      setProducts(updatedProducts);
      
      // Remove category
      const updatedCategories = categories.filter(c => c !== category);
      setCategories(updatedCategories);
      
      // Force update localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('products', JSON.stringify(updatedProducts));
        localStorage.setItem('categories', JSON.stringify(updatedCategories));
      }
    }
  };

  // Create a new table
  const addTable = () => {
    const tableId = Date.now();
    const updatedTables = [...tables, { 
      id: tableId, 
      name: `Table ${tables.length + 1}`, 
      items: [],
      status: 'available'
    }];
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
            ),
            status: 'occupied'
          };
        } else {
          return {
            ...table,
            items: [...table.items, { ...product, quantity: 1 }],
            status: 'occupied'
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
        const updatedItems = table.items.filter(item => item.id !== productId);
        return {
          ...table,
          items: updatedItems,
          status: updatedItems.length === 0 ? 'available' : 'occupied'
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
        table.id === tableId ? { ...table, items: [], status: 'available' } : table
      );
      setTables(updatedTables);
      
      // Force update localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('tables', JSON.stringify(updatedTables));
      }
    }
  };
  // here need to give spae 2 col for see active table stuts 

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

  // Generate bill and save it
  const generateBill = (table) => {
    const bill = {
      id: Date.now(),
      table: table.name,
      items: table.items,
      total: calculateTotal(table.items),
      date: new Date().toLocaleString(),
      status: 'paid'
    };
    
    const updatedBills = [bill, ...bills];
    setBills(updatedBills);
    
    // Reset the table
    const updatedTables = tables.map(t =>
      t.id === table.id ? { ...t, items: [], status: 'available' } : t
    );
    setTables(updatedTables);
    
    // Force update localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('bills', JSON.stringify(updatedBills));
      localStorage.setItem('tables', JSON.stringify(updatedTables));
    }
    
    // Print the bill
    printBill(bill);
  };

  // Print bill
  const printBill = (bill) => {
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head>
          <title>Bill #${bill.id}</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; max-width: 400px; margin: 0 auto; }
            .header { text-align: center; margin-bottom: 20px; border-bottom: 2px dashed #ccc; padding-bottom: 10px; }
            .bill-table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
            .bill-table th, .bill-table td { border-bottom: 1px dashed #eee; padding: 8px; text-align: left; }
            .bill-table th { background-color: #f2f2f2; }
            .total { font-weight: bold; font-size: 1.2em; text-align: right; margin-top: 10px; border-top: 2px solid #333; padding-top: 10px; }
            .thank-you { text-align: center; margin-top: 30px; font-style: italic; color: #666; }
            .footer { margin-top: 30px; text-align: center; font-size: 0.9em; color: #999; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>RESTAURANT BILL</h1>
            <p>Date: ${bill.date}</p>
            <p>Table: ${bill.table}</p>
            <p>Bill #: ${bill.id}</p>
          </div>
          <table class="bill-table">
            <thead>
              <tr>
                <th>Item</th>
                <th>Qty</th>
                <th>Price</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              ${bill.items.map(item => `
                <tr>
                  <td>${item.name}</td>
                  <td>${item.quantity}</td>
                  <td>$${item.price.toFixed(2)}</td>
                  <td>$${(item.price * item.quantity).toFixed(2)}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
          <div class="total">Total: $${bill.total}</div>
          <div class="thank-you">Thank you for your visit!</div>
          <div class="footer">
            <p>Generated by POS System</p>
          </div>
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

  // Get today's bills
  const getTodaysBills = () => {
    const today = new Date().toLocaleDateString();
    return bills.filter(bill => new Date(bill.date).toLocaleDateString() === today);
  };

  // Calculate today's revenue
  const calculateTodaysRevenue = () => {
    return getTodaysBills().reduce((total, bill) => total + parseFloat(bill.total), 0).toFixed(2);
  };

  return (
    <div className="dashboard-container">
      <Head>
        <title>Modern POS Dashboard</title>
        <meta name="description" content="Modern Point of Sale System with billing and inventory management" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="dashboard-header">
        <div className="header-content">
          <h1>💳 Modern POS System</h1>
          <div className="header-actions">
            <div className="stats">
              <div className="stat">
                <span className="stat-value">{products.length}</span>
                <span className="stat-label">Products</span>
              </div>
              <div className="stat">
                <span className="stat-value">{tables.filter(t => t.status === 'occupied').length}</span>
                <span className="stat-label">Occupied Tables</span>
              </div>
              <div className="stat">
                <span className="stat-value">${calculateTodaysRevenue()}</span>
                <span className="stat-label">Today's Revenue</span>
              </div>
            </div>
          </div>
        </div>
        <nav className="dashboard-nav">
          <button 
            className={activeTab === 'tables' ? 'nav-btn active' : 'nav-btn'} 
            onClick={() => setActiveTab('tables')}
          >
            <span>🍽️</span> Tables
          </button>
          <button 
            className={activeTab === 'products' ? 'nav-btn active' : 'nav-btn'} 
            onClick={() => setActiveTab('products')}
          >
            <span>📦</span> Products
          </button>
          <button 
            className={activeTab === 'bills' ? 'nav-btn active' : 'nav-btn'} 
            onClick={() => setActiveTab('bills')}
          >
            <span>🧾</span> Bills
          </button>
        </nav>
      </header>

      <main className="dashboard-main">
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
                  <div key={table.id} className={`dashboard-card table-card ${table.status}`}>
                    <div className="table-header">
                      <h3>
                        {table.name} 
                        <span className={`status-badge ${table.status}`}>
                          {table.status}
                        </span>
                      </h3>
                      <div className="table-actions">
                        <button 
                          className="success-btn"
                          onClick={() => generateBill(table)}
                          disabled={table.items.length === 0}
                        >
                          Generate Bill
                        </button>
                        <button 
                          className="warning-btn"
                          onClick={() => resetTable(table.id)}
                          disabled={table.items.length === 0}
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

                      {table.items.length > 0 && (
                        <div className="table-total">
                          <div className="total-amount">
                            <span>Total:</span>
                            <span>${calculateTotal(table.items)}</span>
                          </div>
                        </div>
                      )}

                      <div className="add-products">
                        <h4>Add Products</h4>
                        <div className="categories-tabs">
                          {categories.map(category => (
                            <div key={category} className="category-section">
                              <h5>{category}</h5>
                              <div className="product-buttons">
                                {products
                                  .filter(p => p.category === category)
                                  .map(product => (
                                    <button
                                      key={product.id}
                                      className="product-btn"
                                      onClick={() => addToTable(table.id, product)}
                                    >
                                      <span className="product-btn-name">{product.name}</span>
                                      <span className="product-btn-price">${product.price.toFixed(2)}</span>
                                    </button>
                                  ))
                                }
                              </div>
                            </div>
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

        {activeTab === 'products' && (
          <div className="products-section">
            <div className="section-header">
              <h2>Product Management</h2>
              <p>Add and manage your menu items and categories</p>
            </div>
            
            <div className="dashboard-card">
              <h3>{editingProduct ? 'Edit Product' : 'Add New Product'}</h3>
              <div className="form-grid">
                <div className="form-group">
                  <label>Product Name</label>
                  <input
                    type="text"
                    placeholder="e.g., Margherita Pizza"
                    value={editingProduct ? editingProduct.name : newProduct.name}
                    onChange={(e) => editingProduct 
                      ? setEditingProduct({ ...editingProduct, name: e.target.value })
                      : setNewProduct({ ...newProduct, name: e.target.value })
                    }
                  />
                </div>
                <div className="form-group">
                  <label>Price ($)</label>
                  <input
                    type="number"
                    placeholder="0.00"
                    value={editingProduct ? editingProduct.price : newProduct.price}
                    onChange={(e) => editingProduct 
                      ? setEditingProduct({ ...editingProduct, price: e.target.value })
                      : setNewProduct({ ...newProduct, price: e.target.value })
                    }
                    step="0.01"
                  />
                </div>
                <div className="form-group">
                  <label>Category</label>
                  <select
                    value={editingProduct ? editingProduct.category : newProduct.category}
                    onChange={(e) => editingProduct 
                      ? setEditingProduct({ ...editingProduct, category: e.target.value })
                      : setNewProduct({ ...newProduct, category: e.target.value })
                    }
                  >
                    <option value="">Select Category</option>
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
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
              {editingProduct ? (
                <div className="form-actions">
                  <button className="primary-btn" onClick={updateProduct}>Update Product</button>
                  <button className="secondary-btn" onClick={() => { setEditingProduct(null); setImagePreview(null); }}>Cancel</button>
                </div>
              ) : (
                <button className="primary-btn" onClick={addProduct}>Add Product</button>
              )}
            </div>

            <div className="dashboard-card">
              <h3>Categories</h3>
              <div className="category-management">
                <div className="add-category">
                  <input
                    type="text"
                    placeholder="New category name"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                  />
                  <button className="primary-btn" onClick={addCategory}>Add Category</button>
                </div>
                <div className="categories-list">
                  {categories.map(category => (
                    <div key={category} className="category-item">
                      <span>{category}</span>
                      <button 
                        className="danger-btn"
                        onClick={() => deleteCategory(category)}
                        disabled={category === 'Uncategorized'}
                      >
                        Delete
                      </button>
                    </div>
                  ))}
                </div>
              </div>
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
                        <span className="product-category">{product.category}</span>
                      </div>
                      <div className="product-info">
                        <h4>{product.name}</h4>
                        <p className="product-price">${product.price.toFixed(2)}</p>
                        <div className="product-actions">
                          <button 
                            className="secondary-btn"
                            onClick={() => { setEditingProduct(product); setImagePreview(product.image); }}
                          >
                            Edit
                          </button>
                          <button 
                            className="danger-btn"
                            onClick={() => deleteProduct(product.id)}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'bills' && (
          <div className="bills-section">
            <div className="section-header">
              <h2>Billing History</h2>
              <p>View and manage all generated bills</p>
            </div>

            <div className="dashboard-card">
              <h3>Today's Bills (${calculateTodaysRevenue()})</h3>
              {getTodaysBills().length === 0 ? (
                <div className="empty-state">
                  <p>No bills generated today</p>
                </div>
              ) : (
                <div className="bills-list">
                  {getTodaysBills().map(bill => (
                    <div key={bill.id} className="bill-item">
                      <div className="bill-info">
                        <div className="bill-header">
                          <h4>Bill #{bill.id}</h4>
                          <span className="bill-date">{bill.date}</span>
                        </div>
                        <p>Table: {bill.table} | Items: {bill.items.reduce((total, item) => total + item.quantity, 0)} | Total: ${bill.total}</p>
                      </div>
                      <div className="bill-actions">
                        <button 
                          className="secondary-btn"
                          onClick={() => printBill(bill)}
                        >
                          Reprint
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="dashboard-card">
              <h3>All Bills</h3>
              {bills.length === 0 ? (
                <div className="empty-state">
                  <p>No bills generated yet</p>
                </div>
              ) : (
                <div className="bills-list">
                  {bills.map(bill => (
                    <div key={bill.id} className="bill-item">
                      <div className="bill-info">
                        <div className="bill-header">
                          <h4>Bill #{bill.id}</h4>
                          <span className="bill-date">{bill.date}</span>
                        </div>
                        <p>Table: {bill.table} | Items: {bill.items.reduce((total, item) => total + item.quantity, 0)} | Total: ${bill.total}</p>
                      </div>
                      <div className="bill-actions">
                        <button 
                          className="secondary-btn"
                          onClick={() => printBill(bill)}
                        >
                          Reprint
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
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
          max-width: 1600px;
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
        
        .form-group input, .form-group select {
          padding: 0.75rem;
          border: 1px solid #e2e8f0;
          border-radius: 6px;
          font-size: 1rem;
        }
        
        .form-actions {
          display: flex;
          gap: 1rem;
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
          border: none;
        }
        
        button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        
        .primary-btn {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 0.75rem 1.5rem;
          border-radius: 6px;
          font-weight: 600;
        }
        
        .primary-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
        }
        
        .secondary-btn {
          background: #48bb78;
          color: white;
          padding: 0.5rem 1rem;
          border-radius: 4px;
          font-size: 0.9rem;
        }
        
        .success-btn {
          background: #48bb78;
          color: white;
          padding: 0.5rem 1rem;
          border-radius: 4px;
          font-size: 0.9rem;
        }
        
        .warning-btn {
          background: #ed8936;
          color: white;
          padding: 0.5rem 1rem;
          border-radius: 4px;
          font-size: 0.9rem;
        }
        
        .danger-btn {
          background: #f56565;
          color: white;
          padding: 0.5rem 1rem;
          border-radius: 4px;
          font-size: 0.9rem;
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
          grid-template-columns: repeat(auto-fill, minmax(450px, 1fr));
          gap: 1.5rem;
        }
        
        .table-card {
          display: flex;
          flex-direction: column;
          height: 100%;
        }
        
        .table-card.available {
          border-left: 5px solid #48bb78;
        }
        
        .table-card.occupied {
          border-left: 5px solid #f56565;
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
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        
        .status-badge {
          padding: 0.25rem 0.5rem;
          border-radius: 20px;
          font-size: 0.7rem;
          font-weight: bold;
        }
        
        .status-badge.available {
          background: #c6f6d5;
          color: #22543d;
        }
        
        .status-badge.occupied {
          background: #fed7d7;
          color: #742a2a;
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
        
        .categories-tabs {
          max-height: 300px;
          overflow-y: auto;
        }
        
        .category-section {
          margin-bottom: 1rem;
        }
        
        .category-section h5 {
          margin: 0 0 0.5rem 0;
          color: #4a5568;
          padding: 0.5rem;
          background: #f7fafc;
          border-radius: 4px;
        }
        
        .product-buttons {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
          gap: 0.5rem;
          margin-bottom: 1rem;
        }
        
        .product-btn {
          background: #edf2f7;
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
        
        .products-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
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
        
        .product-image {
          position: relative;
        }
        
        .product-image img {
          width: 100%;
          height: 150px;
          object-fit: cover;
        }
        
        .product-category {
          position: absolute;
          top: 0.5rem;
          right: 0.5rem;
          background: rgba(102, 126, 234, 0.8);
          color: white;
          padding: 0.25rem 0.5rem;
          border-radius: 4px;
          font-size: 0.7rem;
        }
        
        .product-info {
          padding: 1rem;
        }
        
        .product-info h4 {
          margin: 0 0 0.5rem 0;
          color: #2d3748;
        }
        
        .product-price {
          margin: 0 0 1rem 0;
          color: #667eea;
          font-weight: bold;
          font-size: 1.1rem;
        }
        
        .product-actions {
          display: flex;
          gap: 0.5rem;
        }
        
        .category-management {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        
        .add-category {
          display: flex;
          gap: 0.5rem;
        }
        
        .add-category input {
          flex: 1;
          padding: 0.75rem;
          border: 1px solid #e2e8f0;
          border-radius: 6px;
          font-size: 1rem;
        }
        
        .categories-list {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        
        .category-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.75rem;
          background: #f7fafc;
          border-radius: 6px;
        }
        
        .bills-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        
        .bill-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
        }
        
        .bill-info {
          flex: 1;
        }
        
        .bill-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.5rem;
        }
        
        .bill-header h4 {
          margin: 0;
          color: #2d3748;
        }
        
        .bill-date {
          color: #718096;
          font-size: 0.9rem;
        }
        
        .bill-actions {
          display: flex;
          gap: 0.5rem;
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