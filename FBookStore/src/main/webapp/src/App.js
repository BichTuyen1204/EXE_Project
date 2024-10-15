import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout.js";
import { ProductCard } from "./pages/ProductCard.js";
import { Home } from "./pages/Home.js";
import { Contact } from "./pages/Contact.js";
import { About } from "./pages/About.js";
import { Product } from "./pages/Product.js";
import { Login } from "./pages/Login.js";
import { Signup } from "./pages/Signup.js";
import { ForgotPassword } from "./pages/ForgotPassword.js";
import { OTP } from "./pages/OTP.js";
import { ResetPassword } from "./pages/ResetPassword.js";
import { ProductDetail } from "./pages/ProductDetail.js";
import { Cart } from "./pages/Cart.js";
import { CheckOut } from "./pages/CheckOut.js";
import { Popup } from "./pages/Popup.js";
import { Product2 } from "./admin/product/Product2.js";
import AddProduct from "./admin/product/AddProduct.js";
import EditProduct from "./admin/product/EditProduct.js";
import DeleteProduct from "./admin/product/DeleteProduct.js";
import { ShowProductBooked } from "./admin/product/ShowProductBooked.js";
import { ViewDetail } from "./admin/product/ViewDetail.js";
import { HistoryInvoice } from "./pages/HistoryInvoice.js";
import { Bill } from "./pages/Bill.js";
import AddBanner from "./admin/product/AddBanner.js";
import { Banner } from "./admin/product/Banner.js";
import { Profile } from "./pages/Profile.js";
import { EditPassword } from "./pages/EditPassword.js";
import { EditProfile } from "./pages/EditProfile.js";
import { OrderSuccess } from "./pages/OrderSuccess.js";
import AddCategory from "./admin/product/AddCategory.js";
import { Category } from "./admin/product/Category.js";
import { Customer } from "./admin/product/Customer.js";
import Edit_Category from "./admin/product/Edit_Category.js";
function App() {
  return (

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="About" element={<About />} />
          <Route path="ProductCard" element={<ProductCard />} />
          <Route path="Contact" element={<Contact />} />
          <Route path="product/:searchInputTranfer" element={<Product />} />
          <Route path="product" element={<Product />} />
          <Route path="Login" element={<Login />} />
          <Route path="Signup" element={<Signup />} />
          <Route path="ResetPassword/:email" element={<ResetPassword />} />
          <Route path="ForgotPassword" element={<ForgotPassword />} />
          <Route path="OTP" element={<OTP />} />
          <Route path="ResetPassword" element={<ResetPassword />} />
          <Route path="productDetail/:idBook" element={<ProductDetail />} />
          <Route path="productDetail" element={<ProductDetail />} />
          <Route path="Cart" element={<Cart />} />
          <Route path="Cart/:idBook" element={<Cart />} />
          <Route path="CheckOut" element={<CheckOut />} />
          <Route path="Popup" element={<Popup />} />
          <Route path="Product2" element={<Product2 />} />
          <Route path="Addproduct" element={<AddProduct />} />
          <Route path="Editproduct/:idBook" element={<EditProduct />} />
          <Route path="DeleteProduct" element={<DeleteProduct />} />
          <Route path="ShowProductBooked" element={<ShowProductBooked />} />
          <Route path="ViewDetail" element={<ViewDetail />} />
          <Route path="HistoryInvoice/:email" element={<HistoryInvoice />} />
          <Route path="Bill/:invoiceId" element={<Bill />} />
          <Route path="AddBanner" element={<AddBanner />} />
          <Route path="Banner" element={<Banner />} />
          <Route path="Profile" element={<Profile />} />
          <Route path="EditPassword" element={<EditPassword />} />
          <Route path="EditProfile" element={<EditProfile />} />
          <Route path="OrderSuccess/:invoiceId" element={<OrderSuccess />} />
          <Route path="AddCategory" element={<AddCategory />} />
          <Route path="Category" element={<Category />} />
          <Route path="Customer" element={<Customer />} />
          <Route path="Edit_Category/:idCategory" element={<Edit_Category />} />
        </Route>
      </Routes>
    </BrowserRouter>

  );
}

export default App;
