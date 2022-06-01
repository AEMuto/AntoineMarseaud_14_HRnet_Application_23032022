import { createAsyncThunk } from '@reduxjs/toolkit';
import * as localforage from 'localforage';
import { employeesData } from '../types/employeesData';
import {ErrorMessage} from "./appSlice";

export type getEmployeesPayload = {
  key: 'employees';
};

export type customError = {
  rejectValue: ErrorMessage;
};

export const getEmployees = createAsyncThunk<
  employeesData,
  getEmployeesPayload,
  customError
>('app/getEmployees', async (payload, { rejectWithValue }) => {
  // When we get an item with a key that doesn't exist in localforage
  // It returns null. So instead of using the try...catch syntax (as null is not an error)
  // we simply make an if statement to verify its return value.
  const { key } = payload;
  const employees = await localforage.getItem(key);
  if (employees) {
    return employees as employeesData;
  } else {
    return rejectWithValue({ message: `The key: ${key}, doesn't exists !`, status: true });
  }
});

export const setEmployees = createAsyncThunk<
  Boolean,
  employeesData,
  customError
>('app/setEmployees', async (payload, { rejectWithValue }) => {
  try {
    await localforage.setItem('employees', payload);
    return true;
  } catch (err) {
    if (err !== null) throw err;
    return rejectWithValue({
      message: `There was an error while sending to the database the employees data !`,
      status: true
    });
  }
});
