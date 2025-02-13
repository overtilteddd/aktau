import React, { useEffect, useState } from "react";
import "./css/PopUp.css";

const PopUp = ({ onClose, productId, onAddToCart }) => {
    const [product, setProduct] = useState(null);
    const [flavors, setFlavors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [selectedFlavor, setSelectedFlavor] = useState(null);
    const [maxCount, setMaxCount] = useState(1);

    useEffect(() => {
        fetch(`http://localhost:5000/api/getProduct/${productId}`)
            .then(response => response.json())
            .then(data => {
                setProduct(data);
                setLoading(false);
            })
            .catch(error => {
                setError(error.message);
                setLoading(false);
            });
    }, [productId]);

    useEffect(() => {
        fetch(`http://localhost:5000/api/getFlavors/${productId}`)
            .then(response => response.json())
            .then(data => {
                if (Array.isArray(data) && data.length > 0) {
                    setFlavors(data);
                    setSelectedFlavor(data[0].name);
                    setMaxCount(data[0].count);
                } else {
                    setFlavors([]);
                    setSelectedFlavor(null);
                }
            })
            .catch(error => console.error("Ошибка загрузки вкусов:", error));
    }, [productId]);

    const handleAddToCart = () => {
        if (!selectedFlavor) return;
        onAddToCart({ product, quantity, flavor: selectedFlavor });

        onClose(); // Закрываем popup после добавления
    };

    if (loading) return <div className="popup active"><div className="popup-content">Загрузка...</div></div>;
    if (error) return <div className="popup active"><div className="popup-content">Ошибка: {error}</div></div>;
    if (!product) return null;

    return (
        <div className="popup active">
            <div className="popup-content">
                <button className="popup-close" onClick={onClose}>×</button>
                <img className="card_image" src={product.imgUrl} alt={product.name} />
                <div className="popup-text">
                    <h2>{product.name}</h2>
                    {flavors.length > 0 ? (
                        <select
                            className="dropdown"
                            value={selectedFlavor}
                            onChange={(e) => {
                                const selected = flavors.find(f => f.name === e.target.value);
                                setSelectedFlavor(selected.name);
                                setMaxCount(selected.count);
                                setQuantity(1);
                            }}
                        >
                            {flavors.map(flavor => (
                                <option key={flavor.id} value={flavor.name}>
                                    {flavor.name} ({flavor.count} шт.)
                                </option>
                            ))}
                        </select>
                    ) : (
                        <p className="no-flavors">Нет доступных вкусов</p>
                    )}
                    <p>{product.description}</p>
                </div>
                <div className="quantity-container">
                    <button onClick={() => setQuantity(q => Math.max(1, q - 1))}>−</button>
                    <span>{quantity}</span>
                    <button onClick={() => setQuantity(q => Math.min(maxCount, q + 1))}>+</button>
                </div>
                <button className="add-to-cart" onClick={handleAddToCart}>
                    Добавить {product.price * quantity} Т
                </button>
            </div>
        </div>
    );
};

export default PopUp;
