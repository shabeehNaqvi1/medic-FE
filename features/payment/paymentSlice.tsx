import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import { createPaymentThunk } from './paymentThunk';


const initialState = {
    clientSecret: '',
    errorMessage: '',
    paymentsData: [],
    loading: false,
    selectedOption: null,
    };


export const createPayment: any = createAsyncThunk('payment/createPayment', async(data : {}, thunkAPI : any) => {
    return createPaymentThunk('/payments/createPayment', data, thunkAPI)
});


export const paymentSlice = createSlice({
    name: 'payment',
    initialState,
    reducers: {
        setClientSecret: (state, action) => {
            state.clientSecret = action.payload;
        },
        setErrorMessage: (state, action) => {
            state.errorMessage = action.payload;
        },
        setSelectedOption: (state, action) => {
            state.selectedOption = action.payload;
        },
        
    },
    extraReducers : (builder) => {
        builder
        .addCase(createPayment.pending, (state) => {
        state.loading = true;
        })
        .addCase(createPayment.fulfilled, (state, action) => {
        const { payment } = action.payload;
        state.loading = false;
        state.paymentsData = payment;
        })
        .addCase(createPayment.rejected, (state, { payload }) => {
        state.loading = false;
        alert(payload);
        });
    }
});

export const { setClientSecret, setErrorMessage, setSelectedOption } = paymentSlice.actions;
export default paymentSlice.reducer;