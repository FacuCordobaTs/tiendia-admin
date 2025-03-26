import { Route, Routes } from "react-router"
import { ProductProvider } from "./context/ProductContext"
import AuthProvider from "./context/AuthContext"
import AdminDashboard from "./pages/AdminDashboard"
import { Toaster } from "react-hot-toast"
import PrivateRoute from "./components/PrivateRoute"
import { OrderProvider } from "./context/OrderContext"
import Orders from "./pages/Orders"
import Order from "./pages/Order"
import SettingsPage from "./pages/SettingsPage"
import SetupPage from "./pages/SetupPage"
import LandingPage from "./pages/LandingPage"
import RegisterPage from "./pages/RegisterPage"
import LoginPage from "./pages/LoginPage"
import PlanSelector from "./pages/PlanSelector"
import PaymentProvider from "./context/PaymentContext"
import LoadingMP from "./pages/LoadingMP"
import DefineBusinessHours from "./pages/DefineBusinessHours"
import Profile from "./pages/Profile"
import Notifications from "./pages/Notifications"
import MpConnect from "./pages/MpConnect"
import CompleteProfilePage from "./pages/CompleteProfilePage"
import InventoryPage from "./pages/InventoryPage"

function App() {
  return (
    <>
    <Toaster/>
    <AuthProvider>
      <ProductProvider>
        <OrderProvider>
          <PaymentProvider> 
            <Routes>
              <Route path="/" element={<LandingPage/>}/>
              <Route path="/home" element={
                <PrivateRoute>
                  <AdminDashboard/>
                </PrivateRoute>
              } />
              <Route path="/register" element={<RegisterPage/>} />
              <Route path="/signin" element={<LoginPage/>} />
              <Route path="/setup" element={<SetupPage/>} />
              <Route path="/plan" element={<PlanSelector/>} />
              <Route path="/loadingmp" element={<LoadingMP/>} />
              <Route path="/inventory" element={<InventoryPage />} />
              <Route path="/admin/orders" element={
                <PrivateRoute>
                  <Orders/>
                </PrivateRoute>} />
              <Route path="/admin/orders/:id" element={
                <PrivateRoute>
                  <Order/>
                </PrivateRoute>} />
              <Route path="/settings" element={
                <PrivateRoute>
                  <SettingsPage/>
                </PrivateRoute>} />
              <Route path="/settings/businesshours" element={
                <PrivateRoute>
                  <DefineBusinessHours/>
                </PrivateRoute>} />
              <Route path="/settings/profile" element={
                <PrivateRoute>
                  <Profile/>
                </PrivateRoute>} />
              <Route path="/settings/notifications" element={
                <PrivateRoute>
                  <Notifications/>
                </PrivateRoute>} />
              <Route path="/settings/mpconnect" element={
                <PrivateRoute>
                  <MpConnect/>
                </PrivateRoute>} />
              <Route path="/completeProfile" element={
                <PrivateRoute>
                  <CompleteProfilePage/>
                </PrivateRoute>} />
            </Routes>
          </PaymentProvider>
        </OrderProvider>
      </ProductProvider>
    </AuthProvider>
    </>
  )
}

export default App
