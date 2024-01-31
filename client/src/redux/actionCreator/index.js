import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchDataUser = createAsyncThunk(
  "user/fetchDataUser",
  async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/user/${id}`);
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error("failed to fetch data");
    }
  }
);

export const changeImageUser = createAsyncThunk(
  "user/changeImageUser",
  async (data, userId) => {
    if (!userId) return;
    try {
      const response = await fetch("http://localhost:5000/api/user/upload", {
        method: "POST",
        body: data,
      });
      const responses = await response.json();
      if (responses.error) {
        return responses;
      }
      if (responses.message) {
        const newRequest = await fetch(`http://localhost:5000/api/user/${id}`, {
          method: "GET",
        });
        const results = await newRequest.json();
        return results;
      }
    } catch (error) {
      throw new Error("failed to change image try later.");
    }
  }
);

