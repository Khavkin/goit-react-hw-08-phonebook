import { createAsyncThunk } from '@reduxjs/toolkit';
import * as mockapi from 'api/mockapi-api';

export const fetchContacts = createAsyncThunk(
  'contacts/fetchAll',
  async (_, thunkAPI) => {
    try {
      const response = await mockapi.getContacts();
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const addContact = createAsyncThunk(
  'contacts/addContact',
  async (newContact, thunkAPI) => {
    try {
      const response = await mockapi.addContact(newContact);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async (ContactID, thunkAPI) => {
    try {
      const response = await mockapi.delContact(ContactID);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
