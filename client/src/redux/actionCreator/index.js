import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchDataUser = createAsyncThunk(
  'user/fetchDataUser',
  async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/user/${id}`);
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error('failed to fetch data');
    }
  }
);

export const changeImageUser = createAsyncThunk(
  'user/changeImageUser',
  async (data) => {
    try {
      const response = await fetch(`http://localhost:5000/api/upload`, {
        method: 'POST',
        body: data,
      });
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error('failed to change image try later.');
    }
  }
);