import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_ROUTES } from "@/utils/api";

const addressSlice = createSlice({
  name: "address",
  initialState: { isLoading: false, address: [], error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(createAddress.pending, (s) => {
        s.isLoading = true;
        s.error = null;
      })
      .addCase(createAddress.fulfilled, (s, a) => {
        s.isLoading = false;

        s.address = [a.payload, ...s.address];
      })
      .addCase(createAddress.rejected, (s, a) => {
        s.isLoading = false;
        s.error = a.payload || "Create address failed";
      })

      .addCase(fetchAddress.pending, (s) => {
        s.isLoading = true;
        s.error = null;
      })
      .addCase(fetchAddress.fulfilled, (s, a) => {
        s.isLoading = false;
        s.address = a.payload;
      })
      .addCase(fetchAddress.rejected, (s, a) => {
        s.isLoading = false;
        s.error = a.payload || "Fetch address failed";
      });
  },
});

export const createAddress = createAsyncThunk(
  "address/create",
  async (addressPayload, { rejectWithValue }) => {
    try {
      const res = await fetch(`${API_ROUTES.ADDRESS}/add-address`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(addressPayload),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.error || "Create address failed");
      return data.address;
    } catch (err) {
      return rejectWithValue(err.message || "Create address failed");
    }
  }
);

export const fetchAddress = createAsyncThunk(
  "address/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(`${API_ROUTES.ADDRESS}/get-address`, {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.error || "Fetch address failed");
      return data.addresses || [];
    } catch (err) {
      return rejectWithValue(err.message || "Fetch address failed");
    }
  }
);

export const selectAddresses = (state) => state.address.address;
export const selectAddressLoading = (state) => state.address.isLoading;
export const selectAddressError = (state) => state.address.error;

export default addressSlice.reducer;
