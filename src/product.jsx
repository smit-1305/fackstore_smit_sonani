import React, { useState, useEffect } from "react";
import "./product.css";

function Product() {
  const [products, setProducts] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState(null);

  const [newProduct, setNewProduct] = useState({
    title: "",
    price: "",
  });

  const [errors, setErrors] = useState({});

  // Fetch Products
  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");

        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.log(error);
      }
    };

    getProducts();
  }, []);

  // Add Product
  const addProduct = () => {
    let newErrors = {};

    if (!newProduct.title.trim()) {
      newErrors.title = "Product title is required";
    }

    if (!newProduct.price) {
      newErrors.price = "Product price is required";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    const newId =
      products.length > 0
        ? Math.max(...products.map((item) => item.id)) + 1
        : 1;

    const product = {
      id: newId,
      title: newProduct.title,
      price: Number(newProduct.price),
      category: "men's clothing",
      image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_t.png",
    };

    setProducts([...products, product]);

    setNewProduct({
      title: "",
      price: "",
    });

    setErrors({});
  };

  // Delete Product
  const deleteProduct = (id) => {
    const updatedProducts = products.filter((item) => item.id !== id);

    setProducts(updatedProducts);
  };

  // Edit Product
  const handleEdit = (item) => {
    setErrors({});

    setNewProduct({
      title: item.title,
      price: item.price,
    });

    setEditId(item.id);
    setIsEdit(true);
  };

  // Update Product
  const updateProduct = () => {
    let newErrors = {};

    if (!newProduct.title.trim()) {
      newErrors.title = "Product title is required";
    }

    if (!newProduct.price) {
      newErrors.price = "Product price is required";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    const updatedProducts = products.map((item) =>
      item.id === editId
        ? {
            ...item,
            title: newProduct.title,
            price: Number(newProduct.price),
          }
        : item,
    );

    setProducts(updatedProducts);

    setNewProduct({
      title: "",
      price: "",
    });

    setEditId(null);
    setIsEdit(false);
    setErrors({});
  };

  return (
    <div className="container-fluid crud pt-5">
      <h1 className="heading text-center mb-4">React CRUD Example</h1>

      {/* Form */}
      <div className="add-product mx-5">
        <div className="row text-center">
          <div className="col-lg-5 col-md-4 mt-2">
            <input
              type="text"
              className="form-control"
              placeholder="Enter Product Title"
              value={newProduct.title}
              onChange={(e) =>
                setNewProduct({
                  ...newProduct,
                  title: e.target.value,
                })
              }
            />

            {errors.title && (
              <p className="text-danger text-start mt-1">{errors.title}</p>
            )}
          </div>

          <div className="col-lg-5 col-md-4 mt-2">
            <input
              type="number"
              min="0"
              className="form-control"
              placeholder="Enter Product Price"
              value={newProduct.price}
              onChange={(e) =>
                setNewProduct({
                  ...newProduct,
                  price: e.target.value,
                })
              }
            />

            {errors.price && (
              <p className="text-danger text-start mt-1">{errors.price}</p>
            )}
          </div>

          <div className="col-lg-2 col-md-4 mt-2">
            <button
              className="btn btn-primary"
              onClick={isEdit ? updateProduct : addProduct}
            >
              {isEdit ? "Update Product" : "Add Product"}
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <table className="read-table table-bordered border rounded">
        <thead>
          <tr>
            <th>ID</th>
            <th>Image</th>
            <th>Product</th>
            <th>Price</th>
            <th>Category</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {products.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>

              <td>
                <img src={item.image} alt={item.title} width="60" height="60" />
              </td>

              <td>{item.title}</td>

              <td>${item.price}</td>

              <td>{item.category}</td>

              <td className="crud-btns">
                <button className="update" onClick={() => handleEdit(item)}>
                  Update
                </button>

                <button
                  className="delete"
                  onClick={() => deleteProduct(item.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Product;
