import { useEffect, useState } from 'react';
import './App.css';
import NavMenu from "./Components/NavMenu.jsx";
import ProductLine from "./Components/ProductLine.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CartPopup from "./Components/CartPopup.jsx";
import CheckoutPage from "./Components/CheckoutPage.jsx";
import OrderDetailsPage from "./Components/OrderDetailsPage.jsx";
import SuccessPage from "./Components/SuccesPage.jsx";

// Подключаем Telegram WebApp SDK
const tg = window.Telegram?.WebApp;

function App() {
    const [user, setUser] = useState(null);
    const [theme, setTheme] = useState('light');

    useEffect(() => {
        if (tg) {
            tg.expand(); // Растягиваем WebView
            setUser(tg.initDataUnsafe.user); // Получаем данные пользователя
            setTheme(tg.colorScheme); // Определяем тему (light/dark)
        }
    }, []);

    return (
        <Router>
            <div className={`app-container ${theme}`}>
                <NavMenu />
                {user && <p>Привет, {user.first_name}!</p>} {/* Показываем имя Telegram-пользователя */}
                <Routes>
                    <Route path="/" element={<ProductLine />} />
                    <Route path="/checkout" element={<CheckoutPage />} />
                    <Route path="/order-details" element={<OrderDetailsPage />} />
                    <Route path="/success" element={<SuccessPage />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
