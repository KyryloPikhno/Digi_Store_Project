import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

import { accountService, authService } from "../../services"

const initialState = {
  account: false,
  loading: false,
  error: null,
}

const getByAccess = createAsyncThunk("accountSlice/getByAccess", async (_, { rejectWithValue }) => {
  try {
    const access = authService.getAccessToken()

    if (access) {
      const { data } = await accountService.getByAccess()
      return data
    }
    return false
  } catch (e) {
    return rejectWithValue(e.response.data)
  }
})

const logoutAll = createAsyncThunk(
  "accountSlice/logoutAll",
  async ({ _id }, { rejectWithValue }) => {
    try {
      await accountService.logoutAll(_id)
      return false
    } catch (e) {
      return rejectWithValue(e.response.data)
    }
  },
)

const accountSlice = createSlice({
  name: "accountSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(getByAccess.fulfilled, (state, action) => {
        state.account = action.payload
        state.error = null
        state.loading = false
      })
      .addCase(getByAccess.rejected, (state, action) => {
        state.account = false
        state.error = action.payload
        state.loading = false
      })
      .addCase(getByAccess.pending, (state) => {
        state.account = false
        state.loading = true
        state.error = null
      })
      .addCase(logoutAll.fulfilled, (state, action) => {
        state.account = action.payload
        state.loading = false
        state.login = false
      })
      .addCase(logoutAll.rejected, (state, action) => {
        state.account = false
        state.error = action.payload
        state.loading = false
      })
      .addCase(logoutAll.pending, (state) => {
        state.account = false
        state.loading = true
        state.error = null
      }),
})

const { reducer: accountReducer } = accountSlice

const accountActions = {
  getByAccess,
  logoutAll,
}

export { accountReducer, accountActions }
