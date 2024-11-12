import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
import {
  addUserThunk,
  getSingleUserThunk,
  showMeThunk,
  updateUserDataThunk,
  getDoctorsThunk,
  getDefaultDoctorThunk,
  getAllUsersThunk,
  deleteUserThunk,
} from './userThunk';
import { set } from 'lodash';

const initialState = {
  user: null,
  doctors: [],
  selectedDoctor: null,
  defaultDoctor: [],
  loading: false,
  updatingUser: false,
  loadingDefaultDoctor: false,
  error: null,
  singleUser: null,
  onlineUsers: [],
};

export const addUser = createAsyncThunk(
  'user/addUser',
  async (user: {}, thunkAPI: any) => {
    return addUserThunk('/users/addUser', user, thunkAPI);
  }
);

export const getDoctors = createAsyncThunk(
  'user/getDoctors',
  async (thunkAPI) => {
    return getDoctorsThunk('/users/getDoctors', thunkAPI);
  }
);

export const getAllUsers = createAsyncThunk(
  'users/getAllUsers',
  async ({ page, limit }, thunkAPI) => {
    return getAllUsersThunk('/users/getAllUsers', { page, limit }, thunkAPI);
  }
);

export const getSingleUser = createAsyncThunk(
  '/users/getSingleUser',
  async (thunkAPI) => {
    //@ts-ignore
    return getSingleUserThunk('/users', thunkAPI);
  }
);

export const showMe = createAsyncThunk(
  '/users/showMe',
  async (email: {}, thunkAPI) => {
    return showMeThunk('/users/showMe', email, thunkAPI);
  }
);

export const updateUserData = createAsyncThunk(
  '/users/updateUser',
  async (thunkAPI) => {
    //@ts-ignore
    return updateUserDataThunk('/users/updateUser', thunkAPI);
  }
);

export const deleteUser = createAsyncThunk(
  '/users/deleteUser',
  async (userId: {}, thunkAPI) => {
    //@ts-ignore
    return deleteUserThunk('/users/deleteUser', userId, thunkAPI);
  }
);

export const getDefaultDoctor = createAsyncThunk(
  '/users/getDefaultDoctor',
  async (specialty: {}, thunkAPI) => {
    return getDefaultDoctorThunk('/users/sortDoctors', specialty, thunkAPI);
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    selectDoctor: (state, action) => {
      state.selectedDoctor = action.payload;
    },
    unselectDoctor: (state) => {
      state.selectedDoctor = null;
    },
    setOnlineUsers: (state, action) => {
      state.onlineUsers = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        const { user } = action.payload;
        state.loading = false;
        state.user = user;
      })
      .addCase(addUser.rejected, (state, { payload }) => {
        state.loading = false;
      })
      .addCase(getSingleUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(getSingleUser.fulfilled, (state, action) => {
        state.loading = false;
        state.singleUser = action.payload;
      })
      .addCase(getSingleUser.rejected, (state, { payload }) => {
        state.loading = false;
        alert(payload);
      })
      .addCase(showMe.pending, (state) => {
        state.loading = true;
      })
      .addCase(showMe.fulfilled, (state, action) => {
        const { user } = action.payload;
        state.loading = false;
        state.user = user;
      })
      .addCase(showMe.rejected, (state, { payload }) => {
        state.loading = false;
      })
      .addCase(updateUserData.pending, (state) => {
        state.updatingUser = true;
      })
      .addCase(updateUserData.fulfilled, (state, action) => {
        const { user } = action.payload;
        state.updatingUser = false;
        state.user = user;
        toast.success('Profile updated successfully!');
      })
      .addCase(updateUserData.rejected, (state, { payload }) => {
        state.updatingUser = false;
        alert(payload);
      })
      .addCase(getDoctors.pending, (state) => {
        state.loading = true;
      })
      .addCase(getDoctors.fulfilled, (state, action) => {
        const { doctors } = action.payload;
        state.doctors = doctors;
        state.loading = false;
      })
      .addCase(getDoctors.rejected, (state, { payload }) => {
        state.loading = false;
      })
      .addCase(getDefaultDoctor.pending, (state) => {
        state.loadingDefaultDoctor = true;
      })
      .addCase(getDefaultDoctor.fulfilled, (state, action) => {
        const { doctors } = action.payload;
        state.defaultDoctor = doctors;
        state.loadingDefaultDoctor = false;
      })
      .addCase(getDefaultDoctor.rejected, (state, { payload }) => {
        state.loadingDefaultDoctor = false;
      })
      .addCase(getAllUsers.pending, (state) => {
        state.loadingGetAllUsers = true;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        const { users, totalItems, totalPages, currentPage } = action.payload;
        state.getAllUsers = users;
        state.totalItems = totalItems;
        state.totalPages = totalPages;
        state.currentPage = currentPage;
        state.loadingGetAllUsers = false;
      })
      .addCase(getAllUsers.rejected, (state, { payload }) => {
        state.loadingGetAllUsers = false;
      })

      .addCase(deleteUser.pending, (state) => {
        state.loadingDeleteUser = true;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.deleteUser = action.payload;
        state.getAllUsers = state.getAllUsers.filter(
          (user) => user['_id'] !== action.payload?.userId
        );
        state.loadingDeleteUser = false;
      })
      .addCase(deleteUser.rejected, (state, { payload }) => {
        state.loadingDeleteUser = false;
      });
  },
});

export const { setUser, selectDoctor, unselectDoctor, setOnlineUsers } =
  userSlice.actions;
export default userSlice.reducer;
