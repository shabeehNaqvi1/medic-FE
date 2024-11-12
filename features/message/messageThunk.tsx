import customFetch from "../../utils/axios";
import { imageFetch } from "../../utils/axios";

export const sendMessageThunk = async (
  url: string,
  { data, id }: any,
  thunkAPI: any
) => {
  try {
    const resp = await customFetch.post(`${url}/${id}`, data);
    return resp.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};

export const getMessagesThunk = async (
  url: string,
  { data, id, page }: any,
  thunkAPI: any
) => {
  try {
    const resp = await customFetch.post(`${url}/${id}?page=${page}`, data);
    return resp.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};

export const uploadImageThunk = async (
  url: any,
  formData: any,
  thunkAPI: any
) => {
  try {
    const resp = await imageFetch.post(url, formData);
    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};
