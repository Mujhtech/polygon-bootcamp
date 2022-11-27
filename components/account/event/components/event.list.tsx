import React, { useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { updateEventAction } from "../../../../features/event";
import EventCard from "../../../cards/EventCard";

export default function EventList() {
  const { datas } = useAppSelector((s) => s.event);
  const dispatch = useAppDispatch();

  const [selectedExpense, setSelectedExpense] = useState(null);
  const [filter, setFilter] = useState<any>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;
  const totalRecords = datas != null ? datas.length : 0;
  const [pageSize, setPageSize] = useState(
    datas != null ? Math.ceil(datas.length / limit) : 0
  );

  const currentData = useMemo(() => {
    if (datas === null || datas.length <= 0) {
      return [];
    }

    let data;

    if (filter !== null && filter !== "") {
      data = datas.filter((e: any) =>
        e.title.toLowerCase().includes(filter.toLowerCase())
      );
    } else {
      data = datas;
    }

    setPageSize(Math.ceil(data.length / limit));

    const firstPageIndex = (currentPage - 1) * limit;
    const lastPageIndex = firstPageIndex + limit;
    return data.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, datas, filter]);

  useEffect(() => {
    if (datas == null) {
      dispatch(updateEventAction());
    }
  });

  return (
    <div className="grid grid-cols-3">
      {currentData.length > 0 ? (
        currentData.map((data: any, index: number) => (
          <EventCard data={data} key={index} />
        ))
      ) : (
        <></>
      )}
    </div>
  );
}