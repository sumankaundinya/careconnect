import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_ROUTES } from "@/utils/api";

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const res = await fetch(`${API_ROUTES.AUTH}/login`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.error || "Login Error");
      return data.user;
    } catch (err) {
      return rejectWithValue(err.message || "Login Error");
    }
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async ({ name, email, password, role }, { rejectWithValue }) => {
    try {
      const res = await fetch(`${API_ROUTES.AUTH}/register`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, role }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.error || "Registration Failed");
      return data.userId;
    } catch (err) {
      return rejectWithValue(err.message || "Registration Error");
    }
  }
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(`${API_ROUTES.AUTH}/logout`, {
        method: "POST",
        credentials: "include",
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || "Logout Error");
      }
      return true;
    } catch (err) {
      return rejectWithValue(err.message || "Logout Error");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: { user: null, isLoading: false, error: null },
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (s) => {
        s.isLoading = true;
        s.error = null;
      })
      .addCase(register.fulfilled, (s) => {
        s.isLoading = false;
      })
      .addCase(register.rejected, (s, a) => {
        s.isLoading = false;
        s.error = a.payload || "Registration Error";
      });

    builder
      .addCase(login.pending, (s) => {
        s.isLoading = true;
        s.error = null;
      })
      .addCase(login.fulfilled, (s, a) => {
        s.isLoading = false;
        s.user = a.payload;
      })
      .addCase(login.rejected, (s, a) => {
        s.isLoading = false;
        s.error = a.payload || "Login Error";
      });

    builder
      .addCase(logout.pending, (s) => {
        s.isLoading = true;
        s.error = null;
      })
      .addCase(logout.fulfilled, (s) => {
        s.isLoading = false;
        s.user = null;
      })
      .addCase(logout.rejected, (s, a) => {
        s.isLoading = false;
        s.error = a.payload || "Logout Error";
      });
  },
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;
