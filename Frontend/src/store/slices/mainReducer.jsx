import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000/";



export const getUser = createAsyncThunk(
  "main/user/get",
  async (body,{ getState, rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/auth/user/`, {
        headers: {
          Authorization: `Bearer ${getState()?.auth?.token}`,
        },
      });
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
export const getSuppliers = createAsyncThunk(
  "main/suppliers/get",
  async (body,{ getState, rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/api/suppliers/`, {
        headers: {
          Authorization: `Bearer ${getState()?.auth?.token}`,
        },
      });
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
export const editProfile = createAsyncThunk(
  "main/profileedit/patch",
  async (data, {getState, rejectWithValue }) => {
   
    try {
      const response = await axios.patch(`${BASE_URL}/auth/user/`, data, {
        headers: {
          Authorization: `Bearer ${getState()?.auth?.token}`,
        },
      });
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
export const editSupplierPrices = createAsyncThunk(
  "main/pricesedit/patch",
  async (data, {getState, rejectWithValue }) => {
   
    try {
      const response = await axios.patch(`${BASE_URL}/api/prices/update/${data?.id}/`, data, {
        headers: {
          Authorization: `Bearer ${getState()?.auth?.token}`,
        },
      });
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const getOrders = createAsyncThunk(
  "main/orders/get",
  async (body,{ getState, rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/admin/orders/`, {
        headers: {
          Authorization: `Bearer ${getState()?.auth?.token}`,
        },
      });
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
export const getCustomers = createAsyncThunk(
  "main/customers/get",
  async (body,{ getState, rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/admin/customers/`, {
        headers: {
          Authorization: `Bearer ${getState()?.auth?.token}`,
        },
      });
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
export const getMessages = createAsyncThunk(
  "main/messages/get",
  async (body,{ getState, rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/admin/messages/`, {
        headers: {
          Authorization: `Bearer ${getState()?.auth?.token}`,
        },
      });
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
export const getSales = createAsyncThunk(
  "main/sales/get",
  async (body,{ getState, rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/api/hotsales/`, {
        headers: {
          Authorization: `Bearer ${getState()?.auth?.token}`,
        },
      });
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const addSale = createAsyncThunk(
  "main/sales/post",
  async (body, {getState, rejectWithValue }) => {
    
    try {
      const response = await axios.post(`${BASE_URL}/api/hotsales/`, body, {
        headers: {
          Authorization: `Bearer ${getState()?.auth?.token}`,
        },
      });
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
export const createOrder = createAsyncThunk(
  "main/order/post",
  async (data, {getState, rejectWithValue }) => {
    
    try {
      const response = await axios.post(`${BASE_URL}/api/orders/create/`, data, {
        headers: {
          Authorization: `Bearer ${getState()?.auth?.token}`,
        },
      });
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
export const editOrder = createAsyncThunk(
  "main/order/patch",
  async (data, {getState, rejectWithValue }) => {
    
    try {
      const response = await axios.patch(`${BASE_URL}/api/orders/update/${data?.id}/`, data, {
        headers: {
          Authorization: `Bearer ${getState()?.auth?.token}`,
        },
      });
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
export const deleteOrder = createAsyncThunk(
  "main/order/delete",
  async (id, {getState, rejectWithValue }) => {
    try {
      const response = await axios.delete(`${BASE_URL}/api/orders/${id}/delete/`,{
        headers: {
          Authorization: `Bearer ${getState()?.auth?.token}`,
        },
      });
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
export const adminDeleteOrder = createAsyncThunk(
  "main/adminorder/delete",
  async (id, {getState, rejectWithValue }) => {
    try {
      const response = await axios.delete(`${BASE_URL}/admin/orders/${id}/delete/`,{
        headers: {
          Authorization: `Bearer ${getState()?.auth?.token}`,
        },
      });
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
export const deleteCustomer = createAsyncThunk(
  "main/customer/delete",
  async (id, {getState, rejectWithValue }) => {
    try {
      const response = await axios.delete(`${BASE_URL}/auth/user/${id}/delete/`,{
        headers: {
          Authorization: `Bearer ${getState()?.auth?.token}`,
        },
      });
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
export const deleteMessage = createAsyncThunk(
  "main/messgae/delete",
  async (id, {getState, rejectWithValue }) => {
    try {
      const response = await axios.delete(`${BASE_URL}/admin/messages/${id}/delete/`,{
        headers: {
          Authorization: `Bearer ${getState()?.auth?.token}`,
        },
      });
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const createReview = createAsyncThunk(
  "main/review/post",
  async (data, {getState, rejectWithValue }) => {
    
    try {
      const response = await axios.post(`${BASE_URL}/api/reviews/create/`, data, {
        headers: {
          Authorization: `Bearer ${getState()?.auth?.token}`,
        },
      });
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);



  
  export const mainSlice = createSlice({
    name: 'auth',
    initialState: {
        token: localStorage.getItem('token') || null,
        isAuth: localStorage.getItem('token') ? true : false,
        userData:null,
        userLoading:false,
        userError:false,
        editProfileLoading:false,
        editProfileError:false,
        editSupplierPricesLoading:false,
        editSupplierPricesError:false,
        suppliersLoading:false,
        suppliersError:false,
        suppliersData:null,
        ordersLoading:false,
        ordersError:false,
        ordersData:null,
        orderCreateLoading:false,
        orderCreateError:false,
        orderCreateData:null,
        deleteOrderLoading:false,
        deleteOrderError:false,
        editOrderLoading:false,
        editOrderError:false,
        customersLoading:false,
        customersError:false,
        customersData:null,
        messagesLoading:false,
        messagesError:false,
        messagesData:null,
        deleteCustomerLoading:false,
        deleteCustomerError:false,
        deleteMessageLoading:false,
        deleteMessageError:false,
        adminDeleteOrderLoading:false,
        adminDeleteOrderError:false,
        salesLoading:false,
        salesError:false,
        salesData:null,
        addSaleLoading:false,
        addSaleError:false,
        addReviewLoading:false,
        addReviewError:false
    },
    reducers: {},
    extraReducers: (builder) => {
          builder.addCase(getUser.pending, (state) => {
            state.userLoading = true;
            state.userError = false;
          });
          builder.addCase(getUser.fulfilled, (state, action) => {
            state.userLoading = false;
            state.userError = false;
            state.userData = action.payload;
          });
          builder.addCase(getUser.rejected, (state, action) => {
            state.userLoading = false;
            state.userError = action.payload;
          });
          builder.addCase(editProfile.pending, (state) => {
            state.editProfileLoading = true;
            state.editProfileError = false;
          });
          builder.addCase(editProfile.fulfilled, (state, action) => {
            state.editProfileLoading = false;
            state.editProfileError = false;
          });
          builder.addCase(editProfile.rejected, (state, action) => {
            state.editProfileLoading = false;
            state.editProfileError = action.payload;
          });
          builder.addCase(editSupplierPrices.pending, (state) => {
            state.editSupplierPricesLoading = true;
            state.editSupplierPricesError = false;
          });
          builder.addCase(editSupplierPrices.fulfilled, (state, action) => {
            state.editSupplierPricesLoading = false;
            state.editSupplierPricesError = false;
          });
          builder.addCase(editSupplierPrices.rejected, (state, action) => {
            state.editSupplierPricesLoading = false;
            state.editSupplierPricesError = action.payload;
          });
          builder.addCase(getSuppliers.pending, (state) => {
            state.suppliersLoading = true;
            state.suppliersError = false;
          });
          builder.addCase(getSuppliers.fulfilled, (state, action) => {
            state.suppliersLoading = false;
            state.suppliersError = false;
            state.suppliersData = action.payload;
          });
          builder.addCase(getSuppliers.rejected, (state, action) => {
            state.suppliersLoading = false;
            state.suppliersError = action.payload;
          });
          builder.addCase(getCustomers.pending, (state) => {
            state.customersLoading = true;
            state.customersError = false;
          });
          builder.addCase(getCustomers.fulfilled, (state, action) => {
            state.customersLoading = false;
            state.customersError = false;
            state.customersData = action.payload;
          });
          builder.addCase(getCustomers.rejected, (state, action) => {
            state.customersLoading = false;
            state.customersError = action.payload;
          });
          builder.addCase(getMessages.pending, (state) => {
            state.messagesLoading = true;
            state.messagesError = false;
          });
          builder.addCase(getMessages.fulfilled, (state, action) => {
            state.messagesLoading = false;
            state.messagesError = false;
            state.messagesData = action.payload;
          });
          builder.addCase(getMessages.rejected, (state, action) => {
            state.messagesLoading = false;
            state.messagesError = action.payload;
          });
          builder.addCase(getSales.pending, (state) => {
            state.salesLoading = true;
            state.salesError = false;
          });
          builder.addCase(getSales.fulfilled, (state, action) => {
            state.salesLoading = false;
            state.salesError = false;
            state.salesData = action.payload;
          });
          builder.addCase(getSales.rejected, (state, action) => {
            state.salesLoading = false;
            state.salesError = action.payload;
          });
          builder.addCase(addSale.pending, (state) => {
            state.addSaleLoading = true;
            state.addSaleError = false;
          });
          builder.addCase(addSale.fulfilled, (state, action) => {
            state.addSaleLoading = false;
            state.addSaleError = false;
          });
          builder.addCase(addSale.rejected, (state, action) => {
            state.addSaleLoading = false;
            state.addSaleError = action.payload;
          });
          builder.addCase(getOrders.pending, (state) => {
            state.ordersLoading = true;
            state.ordersError = false;
          });
          builder.addCase(getOrders.fulfilled, (state, action) => {
            state.ordersLoading = false;
            state.ordersError = false;
            state.ordersData = action.payload;
          });
          builder.addCase(getOrders.rejected, (state, action) => {
            state.ordersLoading = false;
            state.ordersError = action.payload;
          });
          builder.addCase(createOrder.pending, (state) => {
            state.orderCreateLoading = true;
            state.orderCreateError = false;
          });
          builder.addCase(createOrder.fulfilled, (state, action) => {
            state.orderCreateLoading = false;
            state.orderCreateError = false;
            state.orderCreateData = action.payload;
          });
          builder.addCase(createOrder.rejected, (state, action) => {
            state.deleteOrderLoading = false;
            state.deleteOrderError = action.payload;
          });
          builder.addCase(editOrder.pending, (state) => {
            state.editOrderLoading = true;
            state.editOrderError = false;
          });
          builder.addCase(editOrder.fulfilled, (state, action) => {
            state.editOrderLoading = false;
            state.editOrderError = false;
          });
          builder.addCase(editOrder.rejected, (state, action) => {
            state.editOrderLoading = false;
            state.editOrderError = action.payload;
          });
          builder.addCase(deleteOrder.pending, (state) => {
            state.deleteOrderLoading = true;
            state.deleteOrderError = false;
          });
          builder.addCase(deleteOrder.fulfilled, (state, action) => {
            state.deleteOrderLoading = false;
            state.deleteOrderError = false;
          });
          builder.addCase(deleteOrder.rejected, (state, action) => {
            state.deleteOrderLoading = false;
            state.deleteOrderError = action.payload;
          });
          builder.addCase(adminDeleteOrder.pending, (state) => {
            state.adminDeleteOrderLoading = true;
            state.adminDeleteOrderError = false;
          });
          builder.addCase(adminDeleteOrder.fulfilled, (state, action) => {
            state.adminDeleteOrderLoading = false;
            state.adminDeleteOrderError = false;
          });
          builder.addCase(adminDeleteOrder.rejected, (state, action) => {
            state.adminDeleteOrderLoading = false;
            state.adminDeleteOrderError = action.payload;
          });
          builder.addCase(deleteCustomer.pending, (state) => {
            state.deleteOrderLoading = true;
            state.deleteOrderError = false;
          });
          builder.addCase(deleteCustomer.fulfilled, (state, action) => {
            state.deleteCustomerLoading = false;
            state.deleteCustomerError = false;
          });
          builder.addCase(deleteCustomer.rejected, (state, action) => {
            state.deleteCustomerLoading = false;
            state.deleteCustomerError = action.payload;
          });
          builder.addCase(deleteMessage.pending, (state) => {
            state.deleteMessageLoading = true;
            state.deleteMessageError = false;
          });
          builder.addCase(deleteMessage.fulfilled, (state, action) => {
            state.deleteMessageLoading = false;
            state.deleteMessageError = false;
          });
          builder.addCase(deleteMessage.rejected, (state, action) => {
            state.deleteMessageLoading = false;
            state.deleteMessageError = action.payload;
          });
          builder.addCase(createReview.pending, (state) => {
            state.addReviewLoading = true;
            state.addReviewError = false;
          });
          builder.addCase(createReview.fulfilled, (state, action) => {
            state.addReviewLoading = false;
            state.addReviewError = false;
          });
          builder.addCase(createReview.rejected, (state, action) => {
            state.addReviewLoading = false;
            state.addReviewError = action.payload;
          });
      
  
      },
})

export const mainReducer = mainSlice.reducer;