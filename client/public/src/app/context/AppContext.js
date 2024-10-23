"use client";
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const globalUrl = "https://shop-y73n.onrender.com";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = React.useState([]);
  const [items, setItems] = React.useState([]);
  const [categoryItems, setCategoryItems] = React.useState([]);
  const [item, setItem] = React.useState({});
  const [cartItems, setCartItems] = React.useState([]);
  const [purchaseHistory, setPurchaseHistory] = React.useState([]);

  const getCategories = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${globalUrl}/api/categories/all`, {
        withCredentials: true,
      });
      setCategories(response.data);
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.error || error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  const getItemsByCategories = async (categoryId) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${globalUrl}/api/items/category/item/${categoryId}`,
        {
          withCredentials: true,
        }
      );
      setCategoryItems(response.data);
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.error || error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  const getItem = async (name) => {
    setLoading(true);
    try {
      const response = await axios.get(`${globalUrl}/api/items/item/${name}`, {
        withCredentials: true,
      });
      setItem(response.data);
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.error || error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  const getAllItems = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${globalUrl}/api/items/all`, {
        withCredentials: true,
      });
      setItems(response.data);
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.error || error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  const getCartItems = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${globalUrl}/api/cart/`, {
        withCredentials: true,
      });
      setCartItems(response.data);
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.error || error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  const addCartItem = async (name, size, price, color, quantity) => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${globalUrl}/api/cart/`,
        { name, size, price, color, quantity },
        {
          withCredentials: true,
        }
      );
      toast.success(`added ${quantity} item(s) to cart`);
      console.log(response);
      getAllItems();
      getCartItems();
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.error || error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  const reduceCartItem = async (name, size, price, color) => {
    setLoading(true);
    try {
      const response = await axios.patch(
        `${globalUrl}/api/cart/removeone`,
        { name, size, price, color },
        {
          withCredentials: true,
        }
      );
      toast.success(`reduced quantity by one`);
      console.log(response);
      getAllItems();
      getCartItems();
      getPurchaseHistory();
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.error || error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  const removeCartItem = async (name, size, price, color) => {
    setLoading(true);
    try {
      const response = await axios.patch(
        `${globalUrl}/api/cart/removeall`,
        { name, size, price, color },
        {
          withCredentials: true,
        }
      );
      toast.success(`item removed`);
      console.log(response);
      getAllItems();
      getCartItems();
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.error || error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  const getPurchaseHistory = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${globalUrl}/api/cart/purchasehistory`,
        {
          withCredentials: true,
        }
      );
      setPurchaseHistory(response.data);
      getAllItems();
      getCartItems();
      getPurchaseHistory();
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.error || error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  const purchaseCartItems = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${globalUrl}/api/cart/purchase`,
        {},
        {
          withCredentials: true,
        }
      );
      toast.success(`purchase succesful`);
      console.log(response);
      getAllItems();
      getCartItems();
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.error || error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  const checkSession = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${globalUrl}/api/users/me`, {
        withCredentials: true,
      });

      console.log(response.data);
      if (response.data) {
        setUser(response.data);
        getCategories();
      }
    } catch (error) {
      console.log("No active session", error);
    } finally {
      setLoading(false);
    }
  };

  // Function to log in
  const login = async (email, password) => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${globalUrl}/api/auth/user/signin`,
        { email, password },
        { withCredentials: true }
      );
      setUser(response.data.user); // Save the logged-in user data
      toast.success("Login successful");
      console.log(response);
      checkSession();
      if (user) {
        getAllItems();
        getCartItems();
        getPurchaseHistory();
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const signup = async (email, password) => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${globalUrl}/api/auth/user/signup`,
        { email, password },
        { withCredentials: true }
      );
      toast.success("Sign up successful", response.data);
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  // Function to log out
  const logout = async () => {
    try {
      await axios.get(`${globalUrl}/api/auth/logout`, {
        withCredentials: true,
      });
      setUser(null); // Clear the user from context
      toast.success("Logged out successfully");
    } catch (error) {
      console.log(error);
      toast.error("Logout failed");
    }
  };

  useEffect(() => {
    checkSession();
    getAllItems();
    getCartItems();
    getPurchaseHistory();
  }, []);

  return (
    <AppContext.Provider
      value={{
        user,
        login,
        signup,
        logout,
        loading,
        checkSession,
        categories,
        item,
        items,
        cartItems,
        categoryItems,
        purchaseHistory,
        getPurchaseHistory,
        getAllItems,
        getCartItems,
        getCategories,
        getItem,
        purchaseCartItems,
        addCartItem,
        reduceCartItem,
        removeCartItem,
        getItemsByCategories,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
