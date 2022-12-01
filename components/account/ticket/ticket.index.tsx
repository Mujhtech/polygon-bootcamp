import React, { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import { useAccount, useContract, useSigner } from "wagmi";
import { CONTRACT_ADDRESS } from "../../../app/constant";
import { ABI } from "../../../blockchain/ABIS/Eventnexo";
import TicketCard from "../../cards/TicketCard";

export default function TicketList() {
  const { data: signedData } = useSigner();
  const contract = useContract({
    address: CONTRACT_ADDRESS,
    abi: ABI.abi,
    signerOrProvider: signedData,
  });

  const { address } = useAccount();

  const [tickets, setTicket] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const filterTickets =
    tickets != null ? tickets.filter((e: any) => e.owner == address) : [];

  const fetchNftMeta = async (ipfsUrl: string) => {
    try {
      if (!ipfsUrl.includes(".json")) return { image: ipfsUrl };
      const fetch_meta = await fetch(ipfsUrl);
      const meta = await fetch_meta.json();
      return meta;
    } catch (e) {
      console.log({ e });
    }
  };

  const fetchTicket = async () => {
    try {
      setLoading(true);
      const _tickets = [];
      const ticketLength = await contract!.getTicketLength();
      for (let i = 1; i <= Number(ticketLength); i++) {
        const _ticket = new Promise(async (resolve) => {
          try {
            const ticket = await contract!.getTicket(i);
            const tokenURI = await contract!.tokenURI(i);
            const tokenData = await fetchNftMeta(tokenURI);
            resolve({
              ticketId: i,
              quantity: ticket.quantity.toNumber(),
              eventId: ticket.eventId,
              owner: ticket.owner,
              image: tokenData.image,
            });
          } catch (e) {
            //console.log(e);
          }
        });
        _tickets.push(_ticket);
      }
      const allTicket = await Promise.all(_tickets);
      setTicket(allTicket);
      setLoading(false);
    } catch (e) {
      setLoading(false);
      //console.log(e);
    }
  };

  useEffect(() => {
    if (tickets == null) {
      fetchTicket();
    }
  });

  return (
    <div className="mt-4 mx-3 flex flex-wrap w-full">
      {loading ? (
        <div className="mt-10 w-full flex flex-col items-center justify-center">
          <ClipLoader color="#7B3FE4" size={20} />
          <h1 className="text-sm font-black">Loading, Please wait...</h1>
        </div>
      ) : (
        <>
          {filterTickets.length > 0 ? (
            filterTickets.map((data: any, index: number) => (
              <TicketCard data={data} key={index} />
            ))
          ) : (
            <div className="mt-10 w-full flex items-center justify-center">
              <h1 className="text-center text-2xl md:text-3xl font-medium">
                No tickets found
              </h1>
            </div>
          )}
        </>
      )}
    </div>
  );
}
