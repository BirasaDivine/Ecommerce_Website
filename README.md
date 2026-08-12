# E-Commerce Frontend Capstone

A React t frontend for an e-commerce platform.

Live demo: https://your-app-name.vercel.app 
Repo: https://github.com/BirasaDivine/Ecommerce_Website

# Features
- Product Listing : browse all products, search by name (keyword), and filter by maximum price
- Product Detail : full product info, category/subcategory, and all active variants with price and stock status (IN_STOCK, LOW_STOCK, OUT_OF_STOCK)
- Authentication : login page issuing a mock JWT; UI adapts based on decoded role (Public, User, Admin)
- Buying : logged-in Users can select a variant and buy it; the Buy button is disabled for out-of-stock variants
- Admin Management : Admins can create and edit products, including adding/editing/removing their variants
# Tech Stack
- React + TypeScript (via Vite)
- Tailwind CSS for styling
- React Router for routing
- Mocked service layer (src/services/) simulating async API calls with latency, backed by static mock data (src/mocks/)
# Getting Started
bash
```
git clone https://github.com/BirasaDivine/Ecommerce_Website

cd Ecommerce_Website

npm install

npm run dev
```
App runs at http://localhost:5173.

# Mock Accounts


- User	: user@example.com ,	password123
- Admin	: admin@example.com	, admin123

# Deployment

Deployed to Vercel, auto-building from the main branch.