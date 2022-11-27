import React from "react";
import AppLayout from "../components/layout/AppLayout";
import NotFound from "../components/NotFound";
import Meta from "../components/partials/Meta";

export default function Home() {
  return (
    <AppLayout>
      <Meta title="Page not found" />
      <NotFound />
    </AppLayout>
  );
}
