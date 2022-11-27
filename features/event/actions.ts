import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../../firebase/client";
import { collection, getDocs, orderBy, query } from "firebase/firestore/lite";

export const fetchEventAction = createAction<any>("event/fetchEvent");

export const updateEventAction = createAsyncThunk(
  "event/updateEventAction",
  async () => {
    const ref = collection(db, "events");
    const q = query(ref, orderBy("eventStartOn", "desc"));
    const res = await getDocs(q);
    const datas = res.docs.map((u) => ({ ...u.data(), id: u.id }));
    return datas;
  }
);
