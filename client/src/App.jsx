
import { useEffect, useMemo, useRef, useState } from "react";
import "./App.css";

const categories = [
  { name: "All", emoji: "🍽️" },
  { name: "Biryani", emoji: "🍛" },
  { name: "Pizza", emoji: "🍕" },
  { name: "Burgers", emoji: "🍔" },
  { name: "Chinese", emoji: "🥡" },
  { name: "Desserts", emoji: "🍰" },
];

function App() {
  
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");

  const exploreRef = useRef(null);

const [foods, setFoods] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState("");

const handleSearch = (event) => {
  if (event.key === "Enter") {
    event.preventDefault();

    console.log("Enter key pressed");
    console.log("Explore section:", exploreRef.current);

    exploreRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
};

useEffect(() => {
  async function fetchFoods() {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/foods`
      );

      if (!response.ok) {
        throw new Error("Could not load the food menu.");
      }

      const result = await response.json();

console.log("API response:", result);
console.log("Fetched food items:", result.data);

setFoods(result.data);
    } catch (err) {
      console.error("Food menu error:", err);
      setError("Unable to load the menu. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  fetchFoods();
}, []);

  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);

  const visibleFoods = useMemo(() => {
    const query = search.trim().toLowerCase();

    return foods.filter((food) => {
      const matchesCategory =
        activeCategory === "All" ||
        food.category === activeCategory;

      const matchesSearch =
        !query ||
        food.name.toLowerCase().includes(query) ||
        food.restaurant.toLowerCase().includes(query) ||
        food.category.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, search, foods]);

  console.log("Search query:", search);
console.log("Total foods:", foods.length);
console.log("Filtered foods:", visibleFoods.length);

  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const cartTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  
function addToCart(food) {
  setCart((currentCart) => {
    const existing = currentCart.find(
      (item) => item._id === food._id
    );

    if (existing) {
      return currentCart.map((item) =>
        item._id === food._id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    }

    return [...currentCart, { ...food, quantity: 1 }];
  });

  setCartOpen(true);
}


  
function changeQuantity(id, amount) {
  setCart((currentCart) =>
    currentCart
      .map((item) =>
        item._id === id
          ? { ...item, quantity: item.quantity + amount }
          : item
      )
      .filter((item) => item.quantity > 0)
  );
}


  return (
    <div className="app-shell">
      <div className="announcement">
        <span>✦</span> Good food, great mood.
        <span className="announcement-right">
          Deliciousness delivered to your door
        </span>
      </div>

      <header className="navbar">
        <a className="brand" href="#home" aria-label="FoodCart home">
          <span className="brand-icon">f.</span>
          <span>food<span className="brand-accent">cart</span></span>
        </a>

        <a className="delivery-location" href="#menu">
          <span className="location-icon">⌖</span>
          <span>
            <small>DELIVERING TO</small>
            <strong>Kolkata, India ▾</strong>
          </span>
        </a>

        <label className="nav-search">
          <span>⌕</span>
          <input
  value={search}
  onChange={(event) => setSearch(event.target.value)}
  onKeyDown={handleSearch}
  placeholder="Search dishes, restaurants..."
  aria-label="Search food"
/>
          {search && (
  <button
    type="button"
    className="clear-search"
    onClick={() => {
      setSearch("");
      setActiveCategory("All");
    }}
    aria-label="Clear search"
  >
    ×
  </button>
)}
        </label>

        <button
          className="cart-button"
          onClick={() => setCartOpen(!cartOpen)}
        >
          <span>♧</span> My cart
          <span className="cart-count">{cartCount}</span>
        </button>
      </header>

      <main id="home">
        <section className="hero">
          <div className="hero-copy">
            <div className="eyebrow">
              <span className="eyebrow-dot" />
              YOUR DAILY DOSE OF DELICIOUS
            </div>

            <h1>
              Good food.
              <br />
              <span>Good mood.</span>
            </h1>

            <p>
              From your favourite comfort food to new cravings,
              find something delicious for every moment.
            </p>

            <a className="hero-cta" href="#menu">
              Explore the menu <span>↗</span>
            </a>

            <div className="hero-trust">
              <div className="avatar-stack">
                <span>👨🏽</span>
                <span>👩🏻</span>
                <span>👨🏻</span>
              </div>
              <div>
                <strong>Made for food lovers</strong>
                <small>Every bite, a little happier.</small>
              </div>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-orbit orbit-one" />
            <div className="hero-orbit orbit-two" />
            <img
              className="hero-food"
              src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=1000&q=90"
              alt="Freshly baked pizza topped with vegetables"
            />
            <div className="floating-card delivery-card">
              <span className="floating-icon">🛵</span>
              <span>
                <strong>At your doorstep</strong>
                <small>Freshness on the way</small>
              </span>
            </div>
            <div className="floating-card rating-card">
              <span className="rating-star">★</span>
              <span>
                <strong>4.8 / 5</strong>
                <small>Food lovers' rating</small>
              </span>
            </div>
            <div className="hero-sparkle sparkle-one">✳</div>
            <div className="hero-sparkle sparkle-two">✦</div>
          </div>
        </section>

        <section className="benefits">
          <div>
            <span className="benefit-icon">⚡</span>
            <span><strong>Quick delivery</strong><small>Good food, less waiting</small></span>
          </div>
          <div>
            <span className="benefit-icon">🥬</span>
            <span><strong>Fresh ingredients</strong><small>Made with care</small></span>
          </div>
          <div>
            <span className="benefit-icon">♡</span>
            <span><strong>Made for you</strong><small>Cravings worth sharing</small></span>
          </div>
        </section>

        <section className="menu-section" id="menu" ref={exploreRef}>
          <div className="section-heading">
            <div>
              <div className="eyebrow">A LITTLE SOMETHING FOR EVERYONE</div>
              <h2>What are you craving?</h2>
              <p>Explore the menu and find your next favourite.</p>
            </div>
            <span className="menu-note">Good things are cooking <span>✳</span></span>
          </div>

          <div className="category-list" aria-label="Food categories">
            {categories.map((category) => (
              <button
                key={category.name}
                className={`category-chip ${
                  activeCategory === category.name ? "active" : ""
                }`}
                onClick={() => setActiveCategory(category.name)}
              >
                <span>{category.emoji}</span>
                {category.name}
              </button>
            ))}
          </div>

          <div className="results-line">
            <strong>
              {activeCategory === "All" ? "Popular right now" : activeCategory}
            </strong>
            <span>{visibleFoods.length} delicious choices</span>
          </div>
            
{loading && (
  <p role="status">Loading delicious food...</p>
)}

{error && (
  <p role="alert">{error}</p>
)}

          <div className="food-grid">
            {visibleFoods.map((food) => (
              <article className="food-card" key={food._id}>
                <div className="food-image-wrap">
                  <img
                    src={food.image}
                    alt={food.name}
                    className="food-image"
                    loading="lazy"
                  />
                  <span className="food-tag">{food.tag}</span>
                  <button
                    className="quick-add"
                    onClick={() => addToCart(food)}
                    aria-label={`Add ${food.name} to cart`}
                  >
                    +
                  </button>
                </div>
                <div className="food-details">
                  <div className="food-name-row">
                    <h3>{food.name}</h3>
                    <span className="food-rating">★ {food.rating}</span>
                  </div>
                  <p className="restaurant-name">{food.restaurant}</p>
                  <div className="food-meta">
                    <strong>₹{food.price}</strong>
                    <span>◷ {food.time}</span>
                  </div>
                  <button
                    className="add-button"
                    onClick={() => addToCart(food)}
                  >
                    Add to cart <span>+</span>
                  </button>
                </div>
              </article>
            ))}
          </div>

          {!loading && !error && visibleFoods.length === 0 && (
            <div className="empty-results">
              <span>🍽️</span>
              <h3>No dishes found</h3>
              <p>Try another search or choose a different category.</p>
              <button
                className="hero-cta"
                onClick={() => {
                  setSearch("");
                  setActiveCategory("All");
                }}
              >
                Show all dishes
              </button>
            </div>
          )}
        </section>

        <section className="closing-banner">
          <div>
            <span className="eyebrow">YOUR NEXT FAVOURITE IS WAITING</span>
            <h2>Life's too short for boring food.</h2>
            <p>Find your happy plate with FoodCart.</p>
          </div>
          <a href="#menu">Find your flavour ↗</a>
          <span className="banner-decoration">✳</span>
        </section>
      </main>

      <footer className="footer">
        <a className="brand footer-brand" href="#home">
          <span className="brand-icon">f.</span>
          <span>food<span className="brand-accent">cart</span></span>
        </a>
        <p>Made with ♡ for people who love good food.</p>
        <span>© {new Date().getFullYear()} FoodCart · Portfolio project</span>
      </footer>

      {cartOpen && (
        <div className="drawer-backdrop" onClick={() => setCartOpen(false)}>
          <aside
            className="cart-drawer"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="drawer-heading">
              <div>
                <span className="eyebrow">YOUR ORDER</span>
                <h2>Your cart ({cartCount})</h2>
              </div>
              <button
                className="drawer-close"
                onClick={() => setCartOpen(false)}
                aria-label="Close cart"
              >
                ×
              </button>
            </div>

            {cart.length === 0 ? (
              <div className="empty-cart">
                <span>🛍️</span>
                <h3>Your cart is hungry!</h3>
                <p>Add something delicious from the menu.</p>
                <button
                  className="hero-cta"
                  onClick={() => {
                    setCartOpen(false);
                    document.getElementById("menu")?.scrollIntoView({
                      behavior: "smooth",
                    });
                  }}
                >
                  Explore food
                </button>
              </div>
            ) : (
              <>
                
<div className="cart-items">
  {cart.map((item) => (
    <div className="cart-item" key={item._id}>
      <img src={item.image} alt={item.name} />

      <div className="cart-item-info">
        <strong>{item.name}</strong>
        <span>₹{item.price} each</span>

        <div className="quantity-controls">
          <button onClick={() => changeQuantity(item._id, -1)}>
            −
          </button>

          <span>{item.quantity}</span>

          <button onClick={() => changeQuantity(item._id, 1)}>
            +
          </button>
        </div>
      </div>

      <strong>₹{item.price * item.quantity}</strong>
    </div>
  ))}
</div>

                <div className="cart-summary">
                  <div><span>Subtotal</span><strong>₹{cartTotal}</strong></div>
                  <div><span>Delivery fee</span><strong>Calculated at checkout</strong></div>
                  <p>Checkout and payment will be connected in a later milestone.</p>
                  <button
                    className="add-button"
                    onClick={() => {
                      setCartOpen(false);
                      alert("Your cart is working! Checkout is coming in the next milestone.");
                    }}
                  >
                    Continue to checkout <span>→</span>
                  </button>
                </div>
              </>
            )}
          </aside>
        </div>
      )}
    </div>
  );
}

export default App;
