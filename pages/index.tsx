import type { NextPage } from "next";
import { useEffect } from "react";
import { useAccount, useContract, useProvider } from "wagmi";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { ABI } from "../blockchain/ABIS/Eventnexo";
import EventCard from "../components/cards/EventCard";
import Hero from "../components/Hero";
import AppLayout from "../components/layout/AppLayout";
import Meta from "../components/partials/Meta";
import { updateEventAction } from "../features/event";

const Home: NextPage = () => {
  const { datas } = useAppSelector((e) => e.event);
  const dispatch = useAppDispatch();

  // const fetchAllEvent = async () => {
  //   try {
  //     let events = [];
  //     const eventLength = await contract!.getEventLength();
  //     console.log(eventLength);
  //     for (let i: number = 0; i < eventLength; i++) {
  //       const e = await contract!.getEvent(i);

  //       console.log(e);
  //       events.push(e);
  //     }

  //     dispatch(fetchEventAction(events));
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  useEffect(() => {
    if (datas == null) {
      dispatch(updateEventAction());
    }
  });

  return (
    <AppLayout>
      <Meta title="Discover" />
      <Hero />
      <main className="w-full overflow-auto">
        <div
          className="max-w-7xl w-full py-0 px-[26px]"
          style={{
            margin: "60px auto 0",
          }}
        >
          <div className="mb-6 flex flex-row justify-between items-center font-black w-full px-2">
            <h3 className="text-lg">Event Near You</h3>
            <a href="#" className="text-md">
              See more
            </a>
          </div>
          <div className="flex flex-wrap w-full">
            {datas != null &&
              datas.length > 0 &&
              datas.map((data: any, index: number) => (
                <EventCard key={index} data={data} />
              ))}
          </div>
        </div>
      </main>
    </AppLayout>
  );
};

export default Home;
