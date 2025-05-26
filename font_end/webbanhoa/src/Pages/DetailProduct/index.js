import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './DetailProduct.css';

const DetailProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    // Lấy dữ liệu sản phẩm từ localStorage
    const storedProduct = localStorage.getItem('selectedProduct');
    if (storedProduct) {
      try {
        const productData = JSON.parse(storedProduct);
        console.log('Loaded product data:', productData);
        setProduct(productData);
      } catch (error) {
        console.error('Error parsing product data:', error);
        setError('Lỗi khi đọc dữ liệu sản phẩm');
      }
    } else {
      setError('Không tìm thấy thông tin sản phẩm');
    }
    setLoading(false);
  }, [id]);

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (value > 0 && value <= product?.SoLuongTon) {
      setQuantity(value);
    }
  };

  const handleAddToCart = () => {
    if (!product) return;
    
    try {
      const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
      const existingItem = cartItems.find(item => item.MaSanPham === product.MaSanPham);
      
      if (existingItem) {
        existingItem.quantity = (existingItem.quantity || 1) + quantity;
      } else {
        cartItems.push({ ...product, quantity });
      }
      
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      alert('Đã thêm vào giỏ hàng!');
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Có lỗi xảy ra khi thêm vào giỏ hàng');
    }
  };

  const handleBuyNow = () => {
    if (!product) return;
    
    try {
      const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
      cartItems.push({ ...product, quantity });
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      navigate('/cart');
    } catch (error) {
      console.error('Error in buy now:', error);
      alert('Có lỗi xảy ra khi xử lý đơn hàng');
    }
  };

  if (loading) {
    return (
      <div className="container text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3">Đang tải thông tin sản phẩm...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container text-center py-5">
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
        <button 
          className="btn btn-primary mt-3"
          onClick={() => navigate('/')}
        >
          Quay lại trang chủ
        </button>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container text-center py-5">
        <div className="alert alert-warning" role="alert">
          Không tìm thấy thông tin sản phẩm
        </div>
        <button 
          className="btn btn-primary mt-3"
          onClick={() => navigate('/')}
        >
          Quay lại trang chủ
        </button>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-md-6">
          <div className="product-image-container">
            <img
              src={product.HinhAnh ? `http://localhost:8080/${product.HinhAnh}` : 'https://via.placeholder.com/400'}
              alt={product.TenHoa}
              className="img-fluid rounded product-image"
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="product-details">
            <h1 className="product-title mb-3">{product.TenHoa}</h1>
            <div className="product-price mb-4">
              <span className="current-price">
                {Number(product.GiaBan).toLocaleString('vi-VN')} VNĐ
              </span>
            </div>
            <div className="product-description mb-4">
              <h5>Mô tả sản phẩm:</h5>
              <p>{product.MoTa}</p>
            </div>
            <div className="product-stock mb-4">
              <h5>Số lượng còn lại:</h5>
              <p className="text-success">{product.SoLuongTon} sản phẩm</p>
            </div>
            <div className="quantity-selector mb-4">
              <h5>Số lượng:</h5>
              <div className="input-group" style={{ width: '150px' }}>
                <button 
                  className="btn btn-outline-secondary" 
                  type="button"
                  onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                >
                  -
                </button>
                <input
                  type="number"
                  className="form-control text-center"
                  value={quantity}
                  onChange={(e) => {
                    const value = parseInt(e.target.value);
                    if (value > 0 && value <= product.SoLuongTon) {
                      setQuantity(value);
                    }
                  }}
                  min="1"
                  max={product.SoLuongTon}
                />
                <button 
                  className="btn btn-outline-secondary" 
                  type="button"
                  onClick={() => quantity < product.SoLuongTon && setQuantity(quantity + 1)}
                >
                  +
                </button>
              </div>
            </div>
            <div className="action-buttons">
              <button 
                className="btn btn-primary btn-lg me-3"
                onClick={() => {
                  const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
                  const existingItem = cartItems.find(item => item.MaSanPham === product.MaSanPham);
                  
                  if (existingItem) {
                    existingItem.quantity = (existingItem.quantity || 1) + quantity;
                  } else {
                    cartItems.push({ ...product, quantity });
                  }
                  
                  localStorage.setItem('cartItems', JSON.stringify(cartItems));
                  alert('Đã thêm vào giỏ hàng!');
                }}
              >
                <i className="fas fa-cart-plus me-2"></i>
                Thêm vào giỏ hàng
              </button>
              <button 
                className="btn btn-success btn-lg"
                onClick={() => {
                  const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
                  cartItems.push({ ...product, quantity });
                  localStorage.setItem('cartItems', JSON.stringify(cartItems));
                  navigate('/cart');
                }}
              >
                <i className="fas fa-bolt me-2"></i>
                Mua ngay
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailProduct;
