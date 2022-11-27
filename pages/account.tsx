import { useRouter } from "next/router";
import React, { useState } from "react";
import { useDisconnect } from "wagmi";
import EventPage from "../components/account/event/event.index";
import ProfileAccount from "../components/account/profile/profile.account";
import PrimaryButton from "../components/btn/PrimaryButton";
import AppLayout from "../components/layout/AppLayout";
import { PageRoute } from "../components/PageRoute";
import Meta from "../components/partials/Meta";

export default function Home() {
  const [page, setPage] = useState("event");

  const { disconnect } = useDisconnect();
  const router = useRouter();

  const logout = async () => {
    try {
      disconnect();
      router.push("/");
    } catch (e) {}
  };

  return (
    <AppLayout>
      <PageRoute>
        <Meta title="Account" />
        <div className="w-full max-w-8xl flex my-0 mx-auto">
          <div
            className="w-[250px] border-r-2 border-r-black sticky top-[78px] flex-shrink-[0] overflow-y-auto"
            style={{
              height: `calc(100vh - 78px)`,
              padding: `60px 60px 60px 60px`,
            }}
          >
            <div className="w-full mb-6">
              <div className="flex flex-col space-y-6">
                <PrimaryButton
                  title="My Event"
                  background={page == "event" ? "bg-primary" : "bg-black"}
                  onPressed={() => setPage("event")}
                />
                <PrimaryButton
                  title="My Ticket"
                  background={page == "ticket" ? "bg-primary" : "bg-black"}
                  onPressed={() => setPage("ticket")}
                />
                <PrimaryButton
                  title="Account"
                  background={page == "account" ? "bg-primary" : "bg-black"}
                  onPressed={() => setPage("account")}
                />
                <PrimaryButton title="Disconnet" onPressed={() => logout()} />
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-between flex-1 pt-[60px]">
            {page == "event" && <EventPage />}
            {page == "account" && <ProfileAccount />}
          </div>
        </div>
      </PageRoute>
    </AppLayout>
  );
}
