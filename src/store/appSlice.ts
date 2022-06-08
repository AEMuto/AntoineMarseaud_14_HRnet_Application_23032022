import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Employee } from '../types/employee';
import { getEmployees, setEmployees } from './appThunks';

export type ErrorMessage = {
  message: string;
  status: boolean;
}

export type AppState = {
  employees: any[],
  isLoading: boolean,
  dbLoaded: boolean,
  employeesNeedUpdate: boolean,
  dbError: ErrorMessage
}

const initialState:AppState = {
  employees: [],
  isLoading: false,
  dbLoaded: false,
  employeesNeedUpdate: false,
  dbError: {
    message: '',
    status: false
  },
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    addEmployee: (state, action: PayloadAction<Employee>) => {
      state.employees = [...state.employees, action.payload];
      state.dbError = initialState.dbError
      state.employeesNeedUpdate = true;
    },
  },
  extraReducers: (builder) => {
    // Getting the employees' data from the indexedDB
    builder.addCase(getEmployees.fulfilled, (state, action) => {
      if (action.payload) state.employees = action.payload;
      state.dbLoaded = true;
      state.employeesNeedUpdate = false;
      state.isLoading = false;
    });
    builder.addCase(getEmployees.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getEmployees.rejected, (state, action) => {
      if (action.payload) state.dbError = action.payload;
      state.isLoading = false;
      state.dbLoaded = false;
    });

    // Setting the employees' data in the indexedDB
    builder.addCase(setEmployees.fulfilled, (state) => {
      state.employeesNeedUpdate = true;
      state.dbError = initialState.dbError
      state.isLoading = false;
    });
    builder.addCase(setEmployees.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(setEmployees.rejected, (state, action) => {
      if (action.payload) state.dbError = action.payload;
      state.isLoading = false;
    });
  },
});

export const { addEmployee } = appSlice.actions;
