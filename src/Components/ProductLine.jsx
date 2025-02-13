import React, { useEffect, useState } from 'react';
import ProductCard from "./ProductCard.jsx";
import CartPopup from "./CartPopup.jsx"; // Подключаем popup корзины
import './css/ProductCard.css';

const ProductLine = () => {
    const [productsByCategory, setProductsByCategory] = useState({});
    const [isLoaded, setIsLoaded] = useState(false);
    const [categories, setCategories] = useState({});
    const [cartItems, setCartItems] = useState([]); // Храним товары в корзине
    const [isCartVisible, setIsCartVisible] = useState(false); // Контролируем видимость pop-up корзины

    useEffect(() => {
        fetch('http://localhost:5000/api/categories')
            .then(response => response.json())
            .then(categoriesData => {
                const categoriesMap = categoriesData.reduce((acc, category) => {
                    acc[category.id] = category.name;
                    return acc;
                }, {});
                setCategories(categoriesMap);
            });

        fetch('http://localhost:5000/api/getAll')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                const grouped = data.reduce((acc, product) => {
                    if (!acc[product.categoryId]) {
                        acc[product.categoryId] = [];
                    }
                    acc[product.categoryId].push(product);
                    return acc;
                }, {});

                setProductsByCategory(grouped);
                setIsLoaded(true);
            });
    }, []);

    const handleAddToCart = (productData) => {
        setCartItems(prev => [...prev, productData]); // Добавляем товар в корзину
        setIsCartVisible(true); // Показываем popup корзины
    };

    if (!isLoaded) {
        return <div>Загрузка...</div>;
    }

    return (
        <div className="productLine-container">
            {Object.entries(productsByCategory).map(([categoryId, products]) => (
                <div key={categoryId} className="category-section">
                    <h3 className="category-title">
                        {categories[categoryId] || `Категория ${categoryId}`}
                    </h3>
                    <div className="productLine">
                        {products.map(item => (
                            <ProductCard
                                id={item.id}
                                name={item.name}
                                price={item.price}
                                imageUrl={item.imgUrl}
                                key={item.id}
                                onAddToCart={handleAddToCart} // Передаем обработчик добавления
                            />
                        ))}
                    </div>
                </div>
            ))}

            {/* Popup корзины */}
            {isCartVisible && <CartPopup items={cartItems} onClose={() => setIsCartVisible(false)} />}
        </div>
    );
};

export default ProductLine;
