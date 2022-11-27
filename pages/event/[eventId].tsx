import moment from "moment";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useAccount, useContract, useProvider } from "wagmi";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { ABI } from "../../blockchain/ABIS/Eventnexo";
import PrimaryButton from "../../components/btn/PrimaryButton";
import SecondaryButton from "../../components/btn/SecondaryButton";
import AppLayout from "../../components/layout/AppLayout";
import NotFound from "../../components/NotFound";
import Meta from "../../components/partials/Meta";
import { updateEventAction } from "../../features/event";

export default function Home() {
  const router = useRouter();
  const { eventId } = router.query;
  const { datas } = useAppSelector((e) => e.event);
  const dispatch = useAppDispatch();

  const provider = useProvider();
  const contract = useContract({
    address: "0xf8e81D47203A594245E36C48e151709F0C19fBe8",
    abi: ABI,
    signerOrProvider: provider,
  });

  const { isConnected } = useAccount();

  const event =
    datas != null && datas.length > 0
      ? datas.find((e: any) => e.id == eventId)
      : null;

  useEffect(() => {
    if (datas == null) {
      dispatch(updateEventAction());
    }
  });

  return (
    <AppLayout>
      {event != null ? (
        <>
          <Meta title={event.title} />
          <section className="max-w-8xl flex flex-col md:flex-row items-start space-y-3 md:space-y-0 md:items-center md:justify-between my-0 mx-auto py-12 px-6 md:px-20 lg:px-28">
            <div className="">
              <h3 className="text-4xl font-black">{event.title}</h3>
              <div className="flex flex-row items-center space-x-3">
                <div className="my-2 flex items-center space-x-1">
                  <Image src="/polygon.png" width="15" height="15" />
                  <h6 className="text-sm font-black">{event.amount}MATIC</h6>
                </div>
                <div className="my-2 flex items-center space-x-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                    />
                  </svg>

                  <h6 className="text-sm font-black">
                    {event.location.toUpperCase()}
                  </h6>
                </div>
                <div className="my-2 flex items-center space-x-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
                    />
                  </svg>
                  <h6 className="text-sm font-black">
                    {moment(event.eventStartOn).format("d MMMM, yyyy hh:ss")}
                  </h6>
                </div>
              </div>
            </div>
            <div>
              <PrimaryButton title="Checkout" onPressed={() => console.log(0)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z"
                  />
                </svg>
              </PrimaryButton>
            </div>
          </section>
          <section className="border-t-2 border-t-black flex">
            <div className="w-full max-w-8xl flex flex-col md:flex-row my-0 mx-auto">
              <div className="flex flex-col justify-between flex-1 pt-[60px]">
                <div className="mx-14">
                  <div className="flex items-center justify-center">
                    <Image
                      src={event.image}
                      width="300"
                      height="300"
                      className="border-2 border-black"
                    />
                  </div>
                  <p className="mt-4">{event.content}</p>
                </div>
              </div>
              <div
                className="md:w-[400px] lg:w-[500px] border-l-2 md:border-l-black md:sticky top-[78px] flex-shrink-[0] overflow-y-auto"
                style={{
                  height: `calc(100vh - 78px)`,
                  padding: `60px 120px 60px 60px`,
                }}
              >
                <div className="w-full mb-6">
                  <div className="w-full mb-6">
                    <h3 className="text-2xl font-black">
                      Tickets{" "}
                      <span className="text-md">
                        ({event.totalTicketBought}/{event.maxTickets})
                      </span>
                    </h3>
                  </div>
                  <div className="border-2 border-black rounded-[8px] mb-8 py-2 px-3 lg:px-8">
                    {event.totalTicketBought < event.maxTickets && (
                      <div className="flex items-start justify-start flex-col w-full">
                        <p className="md:text-md lg:text-lg font-black">Event start:</p>
                        <div className="flex w-full justify-between mt-6 py-0 px-6 font-black">
                          <div className="flex flex-col items-center justify-center">
                            <span className="md:text-2xl lg:text-4xl">00</span>
                            <i className="mt-2 not-italic text-xs">Days</i>
                          </div>
                          <div className="flex flex-col items-center justify-center">
                            <span className="md:text-2xl lg:text-4xl">00</span>
                            <i className="mt-2 not-italic text-xs">Hours</i>
                          </div>
                          <div className="flex flex-col items-center justify-center">
                            <span className="md:text-2xl lg:text-4xl">00</span>
                            <i className="mt-2 not-italic text-xs">Minutes</i>
                          </div>
                          <div className="flex flex-col items-center justify-center">
                            <span className="md:text-2xl lg:text-4xl">00</span>
                            <i className="mt-2 not-italic text-xs">Seconds</i>
                          </div>
                        </div>
                      </div>
                    )}
                    {event.totalTicketBought == event.maxTickets && (
                      <div className="flex items-center justify-center flex-col w-full py-8">
                        <p className="text-3xl lg:text-4xl font-black">Sold out</p>
                      </div>
                    )}
                  </div>

                  <div className="border-2 border-black rounded-[8px] mb-8">
                    <div className="py-2 px-3 lg:px-8">
                      <div className="flex justify-between items-center py-6 border-b-2 border-b-black">
                        <h3 className="text-md font-black">Token</h3>
                        <div className="my-2 flex items-center space-x-1">
                          <Image
                            src="/polygon.png"
                            width="15"
                            height="15"
                            className="border-2 border-black rounded-full"
                          />
                          <h6 className="text-md font-black">
                            {event.amount}MATIC
                          </h6>
                        </div>
                      </div>
                      <div className="flex justify-between items-center py-6">
                        <h3 className="text-md font-black">CO2 Offset 🌱</h3>
                        <div className="my-2 flex items-center space-x-1">
                          {/* <Image
                        src="/polygon.png"
                        width="15"
                        height="15"
                        className="border-2 border-black rounded-full"
                      /> */}
                          <h6 className="text-md font-black">Coming soon...</h6>
                        </div>
                      </div>
                      <div className="flex items-center justify-center pt-2 pb-5 flex-row space-x-2">
                        <h6 className="text-md font-black">Powered by:</h6>
                        <Image
                          src="/polygon.png"
                          width="15"
                          height="15"
                          className="border-2 border-black rounded-full"
                        />
                        <span className="font-black">Polygon</span>
                      </div>
                    </div>
                  </div>
                  <div
                    className="m-0"
                    style={{
                      padding: "4px 0px 0px 4px",
                    }}
                  >
                    <SecondaryButton
                      height={50}
                      title="Get Ticket"
                      foreground="bg-primary"
                      onPressed={() => {
                        if (isConnected) {
                        } else {
                          alert("Please connect to continue");
                        }
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z"
                        />
                      </svg>
                    </SecondaryButton>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      ) : (
        <NotFound />
      )}
    </AppLayout>
  );
}
