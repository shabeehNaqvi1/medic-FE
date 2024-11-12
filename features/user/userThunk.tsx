import customFetch from '../../utils/axios';
import { imageFetch } from '../../utils/axios';

export const addUserThunk = async (url: string, user: {}, thunkAPI: any) => {
  try {
    const resp = await customFetch.post(url, user);
    return resp.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};

export const deleteUserThunk = async (
  url: string,
  { userId }: any,
  thunkAPI: any
) => {
  try {
    const resp = await customFetch.delete(`${url}/${userId}`);
    return { response: resp.data, userId };
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};

export const getDoctorsThunk = async (url: string, thunkAPI: any) => {
  try {
    const resp = await customFetch.get(url);
    return resp.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};

export const getSingleUserThunk = async (
  url: string,
  { id }: any,
  thunkAPI: any
) => {
  try {
    const resp = await customFetch.get(`${url}/${id}`);
    return resp.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};

export const showMeThunk = async (url: string, email: {}, thunkAPI: any) => {
  try {
    const resp = await customFetch.post(url, email);
    return resp.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};

export const updateUserDataThunk = async (
  url: string,
  { user, id }: any,
  thunkAPI: any
) => {
  try {
    const resp = await customFetch.patch(`${url}/${id}`, user);
    return resp.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};

export const getDefaultDoctorThunk = async (
  url: string,
  { specialty }: any,
  thunkAPI: any
) => {
  try {
    const resp = await customFetch.get(`${url}/?specialty=${specialty}`);
    return resp.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};

export const getAllUsersThunk = async (
  url: string,
  { page, limit }: { page: number; limit: number },
  thunkAPI: any
) => {
  try {
    const resp = await customFetch.get(url, {
      params: { page, limit },
    });

    return resp.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};
