
import React from "react";
import { Link } from "react-router";

function Home() {
  return (
    <div className="page">
      <section className="hero">
        <div className="hero-icon">🤖</div>

        <h1>Robot Navigator</h1>

        <p>
          Інтерактивна система візуалізації маршруту робота
          у середовищі зі змінними перешкодами.
        </p>

        <Link to="/simulator" className="btn btn-primary">
          Запустити симулятор →
        </Link>
      </section>

      <section className="features">
        <div className="feature-card">
          <div className="feature-icon">🧭</div>
          <h3>Пошук маршруту</h3>
          <p>
            Автоматичне визначення найкоротшого шляху
            за допомогою алгоритму BFS.
          </p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">🧱</div>
          <h3>Змінні перешкоди</h3>
          <p>
            Додавайте й видаляйте перешкоди та
            спостерігайте за перебудовою маршруту.
          </p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">⚙️</div>
          <h3>Керування роботом</h3>
          <p>
            Налаштовуйте швидкість руху та
            кількість перешкод на полі.
          </p>
        </div>
      </section>
    </div>
  );
}

export default Home;
