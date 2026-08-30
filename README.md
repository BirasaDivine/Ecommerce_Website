# E-Commerce Frontend Capstone

A React frontend for an e-commerce platform.

Live demo: https://ecommerce-website-git-dev-birasadivines-projects.vercel.app/
Repo: https://github.com/BirasaDivine/Ecommerce_Website

# Features
- Product Listing : browse all products, search by name (keyword), and filter by maximum price
- Product Detail : full product info, category/subcategory, and all active variants with price and stock status (IN_STOCK, LOW_STOCK, OUT_OF_STOCK)
- Authentication : login page issuing a mock JWT; UI adapts based on decoded role (Public, User, Admin)
- Buying : logged-in Users can select a variant and buy it; the Buy button is disabled for out-of-stock variants
- Admin Management : Admins can create and edit products, including adding/editing/removing their variants

# Data Model
- `Product` and `Variant` are separate, linked entities (`Variant.productId` references `Product._id`), each product owning one or more size/price/stock variants
- `User` carries a `Role` (`PUBLIC` | `USER` | `ADMIN`) decoded from the JWT to drive role-based UI

# Tech Stack
- React + TypeScript (via Vite)
- Tailwind CSS for styling
- React Router for routing
- Mocked service layer (`src/services/`) simulating async API calls with latency, backed by static mock data (`src/mocks/`)
  - `productService` : list products (name/max-price filtering), get by id, get variants for a product
  - `authService` : mock login issuing a real-shaped JWT (header/payload/signature)
# Getting Started

```bash
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