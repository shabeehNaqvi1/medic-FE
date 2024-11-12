import customFetch from "../../utils/axios";


export const createPaymentThunk = async(url : string, data : {}, thunkAPI : any) => {
    try {
        const resp = await customFetch.post(url, data);
        return resp.data;
    } catch (error: any) {
        return thunkAPI.rejectWithValue(error.response.data.msg);
    }
}