import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../../firebase/client";
import { collection, getDocs } from "firebase/firestore/lite";

export const fetchEventAction = createAction<any>("event/fetchEvent");

export const updateEventAction = createAsyncThunk(
  "event/updateEventAction",
  async () => {
    const res = await getDocs(collection(db, "events"));
    const datas = res.docs.map((u) => ({ ...u.data(), id: u.id }));
    return datas;
  }
);
