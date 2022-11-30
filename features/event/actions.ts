import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { AppThunk } from "../../app/store";
import { db } from "../../firebase/client";
import {
  collection,
  getDocs,
  orderBy,
  query,
  getDoc,
  doc,
  updateDoc,
} from "firebase/firestore/lite";

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

export const updateEventDataAction =
  (arg: any): AppThunk =>
  async (dispatch, getState) => {
    const eventRef = doc(db, "events", arg.id);
    const eventRes = await getDoc(eventRef);

    await updateDoc(eventRef, {
      totalTicketBought: eventRes.data()!.totalTicketBought + 1,
    });

    dispatch(updateEventAction());
  };
