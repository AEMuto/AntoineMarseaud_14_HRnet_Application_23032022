import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { employees } from '../mocks/employees_50';
import { Employee } from '../types/employee';

const initialState = {
  employees,
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    addEmployee: (state, action: PayloadAction<Employee>) => {
      state.employees = [...state.employees, action.payload];
    },
  },
});

export const { addEmployee } = appSlice.actions;
