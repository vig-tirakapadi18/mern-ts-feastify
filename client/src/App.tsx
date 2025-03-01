import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./layouts/Layout";
import Home from "./pages/Home";

// components
import AuthCallback from "./pages/AuthCallback";
import UserProfile from "./pages/UserProfile";
import ProtectedRoutes from "./auth/ProtectedRoutes";
import ManageRestaurant from "./pages/ManageRestaurant";
import SearchRestaurants from "./pages/SearchRestaurants";
import RestaurantDetail from "./pages/RestaurantDetail";
import OrderStatus from "./pages/OrderStatus";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout showHero>
            <Home />
          </Layout>
        }
      />
      <Route path="/auth-callback" element={<AuthCallback />} />
      <Route
        path="/search/:city"
        element={
          <Layout showHero={false}>
            <SearchRestaurants />
          </Layout>
        }
      />
      <Route
        path="/detail/:restaurantId"
        element={
          <Layout showHero={false}>
            <RestaurantDetail />
          </Layout>
        }
      />
      <Route element={<ProtectedRoutes />}>
        <Route
          path="/profile"
          element={
            <Layout>
              <UserProfile />
            </Layout>
          }
        />
      </Route>
      <Route element={<ProtectedRoutes />}>
        <Route
          path="/manage-restaurant"
          element={
            <Layout>
              <ManageRestaurant />
            </Layout>
          }
        />
      </Route>
      <Route element={<ProtectedRoutes />}>
        <Route
          path="/order-status"
          element={
            <Layout>
              <OrderStatus />
            </Layout>
          }
        />
      </Route>
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
