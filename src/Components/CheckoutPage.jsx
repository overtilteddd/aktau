import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./css/CheckoutPage.css";

const CheckoutPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const items = location.state?.items || [];
    const totalPrice = items.reduce((total, item) => total + item.product.price * item.quantity, 0);

    const handleConfirmOrder = () => {
        navigate("/order-details", { state: { items, totalPrice } }); // Переход на следующую страницу
    };

    return (
        <div className="checkout-container">
            <div className="checkout-box">
                <h2 className="checkout-title">Оформление заказа</h2>
                {items.length === 0 ? (
                    <p className="empty-cart">Корзина пуста</p>
                ) : (
                    <ul className="checkout-list">
                        {items.map((item, index) => (
                            <li key={index} className="checkout-item">
                                <img src={item.product.image} alt={item.product.name} className="checkout-image"/>
                                <div className="checkout-details">
                                    <span className="checkout-name">{item.product.name}</span>
                                    <span className="checkout-flavor">{item.flavor}</span>
                                    <span className="checkout-quantity">Количество: {item.quantity}</span>
                                    <span className="checkout-price">Цена: {item.product.price * item.quantity} Т</span>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
                <div className="checkout-footer">
                    <h3 className="checkout-total">Итого: {totalPrice} Т</h3>
                    <button className="checkout-button" onClick={handleConfirmOrder}>Подтвердить заказ</button>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;
