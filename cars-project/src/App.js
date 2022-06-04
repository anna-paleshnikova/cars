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
import { CarList } from "./components/cars/carList/CarList";
import { CarForm } from "./components/cars/carForm/CarForm";
import { RentCar } from "./components/cars/rentForm/RentForm";
import { CustomerRentedCars } from "./components/customers/customerRentedCars/CustomerRentedCars";

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
        <Route
          path="/customer/:id"
          element={
            <Layout>
              <Customer />
            </Layout>
          }
        />
        <Route
          path="/customer-list"
          element={
            <Layout>
              <CustomerList />
            </Layout>
          }
        />
        <Route
          path="/customer/create"
          element={
            <Layout>
              <CustomerForm />
            </Layout>
          }
        />
        <Route
          path="/customer/edit/:id"
          element={
            <Layout>
              <CustomerForm />
            </Layout>
          }
        />
        <Route
          path="/cars-list"
          element={
            <Layout>
              <CarList />
            </Layout>
          }
        />
        <Route
          path="/car/create"
          element={
            <Layout>
              <CarForm />{" "}
            </Layout>
          }
        />
        <Route
          path="/car/edit/:id"
          element={
            <Layout>
              <CarForm />
            </Layout>
          }
        />
        <Route
          path="/car/rent/:id"
          element={
            <Layout>
              <RentCar />
            </Layout>
          }
        />
        <Route
          path="/customer/rented-cars"
          element={
            <Layout>
              <CustomerRentedCars />
            </Layout>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
