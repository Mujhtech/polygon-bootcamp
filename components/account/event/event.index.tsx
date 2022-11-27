import React, { useEffect, useState } from "react";
import PrimaryButton from "../../btn/PrimaryButton";

export default function EventList() {
  const [tab, setTab] = useState("list");
  return (
    <div className="flex flex-col">
      <div className="flex flex-row items-center justify-center space-x-10">
        <PrimaryButton
          title="My Events"
          background={tab == "list" ? "bg-primary" : "bg-black"}
          onPressed={() => setTab("list")}
        />
        <PrimaryButton
          title="Create new"
          background={tab == "create" ? "bg-primary" : "bg-black"}
          onPressed={() => setTab("create")}
        />
      </div>
      <div className="mt-4">{tab == "list" && <EventList />}</div>
    </div>
  );
}
