import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import authService from "./authService"
import { RegisterForm, LoginForm} from '../../model'

//get user from localstorage
const user = JSON.parse(localStorage.getItem('user') || 'null');

type InitialState = {
    user: any,
    isError: boolean,
    isSuccess: boolean,
    isLoading: boolean,
    message: string
}

const initialState: InitialState = {
    user: user ? user : null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

// Register a new user

    export const register = createAsyncThunk(
        'auth/register',
        async (user: RegisterForm, thunkAPI) => {
            try {
                return await authService.register(user)
            } catch (error: any) {
                const message =
                (error.response &&
                error.response.data &&
                error.response.data.message) ||
                error.message ||
                error.toString();
            return await thunkAPI.rejectWithValue(message);
            }
        }
    )

    // Login a user
    export const login: any = createAsyncThunk(
        'auth/login',
        async (user: LoginForm, thunkAPI) => {
            try {
                return await authService.login(user)
            } catch (error: any) {
                const message =
                (error.response &&
                error.response.data &&
                error.response.data.message) ||
                error.message ||
                error.toString();
            return await thunkAPI.rejectWithValue(message);
            }
        }
    )

    // Logout a user
    export const logout = createAsyncThunk(
        'auth/logout',
        async (user, thunkAPI) => {
            try {
                return await authService.logout()
            } catch (error: any) {
                const message =
                (error.response &&
                error.response.data &&
                error.response.data.message) ||
                error.message ||
                error.toString();
            return await thunkAPI.rejectWithValue(message);
            }
        }
    )

    export const authSlice = createSlice({
        name: 'auth',
        initialState,
        reducers: {
            reset: (state) => {
                state.isError = false;
                state.isSuccess = false;
                state.isLoading = false;
                state.message = '';
            },
        },
        extraReducers: (builder) => {
            builder
            .addCase(register.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(register.fulfilled, (state, action: PayloadAction<any>) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.message = action.payload;
            })
            .addCase(register.rejected, (state, action: PayloadAction<any>) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
            state.user = null;
      })
            .addCase(login.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(login.fulfilled, (state, action: PayloadAction<any>) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload;
            })
            .addCase(login.rejected, (state, action: PayloadAction<any>) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                state.user = null;
            })
            .addCase(logout.fulfilled, (state) => {
                state.user = null;
            });
        }
    })

    export const { reset } = authSlice.actions;
    export default authSlice.reducer;