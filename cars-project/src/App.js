import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Register } from "./components/auth/register/Register";
import { CustomerList } from "./components/customers/customersList/CustomersList";
import { NonAuthenticatedGuard } from "./utils/guards/NonAuthenticatedGuard";
import { Login } from "./components/auth/login/Login";
import { AuthenticatedRoute } from "./utils/guards/AuthenticatedRoute";
import { Layout } from "./components/layout/Layout";
import { CustomerForm } from "./components/customers/customerForm/CustomerForm";
import { Customer } from "./components/customers/customer/Customer";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route
          exact
          path="/register"
          element={
            <NonAuthenticatedGuard>
              <Register />
            </NonAuthenticatedGuard>
          }
        />
        <Route
          exact
          path="/login"
          element={
            <NonAuthenticatedGuard>
              <Login />
            </NonAuthenticatedGuard>
          }
        />
        <Route
          exact
          path="/"
          element={
            <AuthenticatedRoute>
              <Layout />
            </AuthenticatedRoute>
          }
        ></Route>
        <Route path="/customer/:id" element={<Customer />} />
        <Route path="/customer-list" element={<CustomerList />} />
        <Route path="/customer/create" element={<CustomerForm />} />
        <Route path="/customer/edit/:id" element={<CustomerForm />} />
      </Routes>
    </div>
  );
}

export default App;
