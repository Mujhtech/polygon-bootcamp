import React from "react";
import { shortenAddress } from "../../utils/address";

type Props = {
  data: any;
};

export default function TicketCard({ data }: Props) {
  const style = { "var(--image-url)": data.image } as React.CSSProperties;

  return (
    <div className="w-full md:w-1/2 lg:w-1/3 flex-shrink-[0] group p-0 m-0">
      <div className="ticket !bg-primary">
        <div
          className={`brand-icon before:bg-cover before:bg-no-repeat before:bg-center before:bg-[image:var(--image-url)]`}
          style={style}
        >
          <div className="absolute w-full h-full bg-cover bg-no-repeat bg-center"></div>
        </div>
        <div className="vertical-row separator">
          <div className="round-cut-out !bg-white"></div>
          <div className="fill-parent"></div>
          <div className="round-cut-out !bg-white"></div>
        </div>
        <div className="round-cut-out adjust-right-cut-out !bg-white"></div>
        <div className="heading text-white">Hello,</div>
        <div className="booking-ticket">
          <div className="month">Ticket ID</div>
          <div className="date">{data.ticketId}</div>
        </div>
        <div className="brand-name">
          {shortenAddress(data.owner, true, true)}
        </div>
        <div className="subheading">
          thank you raza susan for the invitation
        </div>
        <div className="barcode-container">
          <img
            src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeD0iMC4wMDAwbW0iIHk9IjAuMDAwMG1tIiB3aWR0aD0iNTkuMjY3MG1tIiBoZWlnaHQ9IjI2LjQ1ODBtbSIgdmlld0JveD0iMC4wMDAwIDAuMDAwMCA1OS4yNjcwIDI2LjQ1ODAiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBzaGFwZS1yZW5kZXJpbmc9ImNyaXNwRWRnZXMiPgo8dGl0bGU+VEJhckNvZGUgLSAxMS4xMC4wLjE2MDE5PC90aXRsZT4KPGRlc2M+QmFyQ29kZSBsaWNlbnNlZCB0byBNRU06VEVDLUlUIERhdGVudmVyYXJiZWl0dW5nIEdtYkggSW50ZXJuYWwgTGljZW5zZTwvZGVzYz4KPGcgZmlsbD0icmdiKDAlLDAlLDAlKSI+CjwvZz4KPGcgZmlsbD0icmdiKDEwMCUsMTAwJSwxMDAlKSI+CjxyZWN0IHg9IjAuMDAwMCIgeT0iMC4wMDAwIiB3aWR0aD0iNTkuMjY3MCIgaGVpZ2h0PSIyNi40NTgwIiAvPgo8L2c+CjxnIGZpbGw9InJnYigwJSwwJSwwJSkiPgo8L2c+CjxnIGZpbGw9InJnYigwJSwwJSwwJSkiPgo8cmVjdCB4PSIwLjAwMDAiIHk9IjAuMDAwMCIgd2lkdGg9IjEuMDU4MyIgaGVpZ2h0PSIyMC4xODY0IiAvPgo8cmVjdCB4PSIxLjU4NzUiIHk9IjAuMDAwMCIgd2lkdGg9IjAuNTI5MiIgaGVpZ2h0PSIyMC4xODY0IiAvPgo8cmVjdCB4PSIzLjE3NTAiIHk9IjAuMDAwMCIgd2lkdGg9IjEuNTg3NSIgaGVpZ2h0PSIyMC4xODY0IiAvPgo8cmVjdCB4PSI1LjgyMDkiIHk9IjAuMDAwMCIgd2lkdGg9IjEuNTg3NSIgaGVpZ2h0PSIyMC4xODY0IiAvPgo8cmVjdCB4PSI4LjQ2NjciIHk9IjAuMDAwMCIgd2lkdGg9IjAuNTI5MiIgaGVpZ2h0PSIyMC4xODY0IiAvPgo8cmVjdCB4PSI5LjUyNTEiIHk9IjAuMDAwMCIgd2lkdGg9IjEuMDU4MyIgaGVpZ2h0PSIyMC4xODY0IiAvPgo8cmVjdCB4PSIxMS42NDE3IiB5PSIwLjAwMDAiIHdpZHRoPSIwLjUyOTIiIGhlaWdodD0iMjAuMTg2NCIgLz4KPHJlY3QgeD0iMTIuNzAwMSIgeT0iMC4wMDAwIiB3aWR0aD0iMS41ODc1IiBoZWlnaHQ9IjIwLjE4NjQiIC8+CjxyZWN0IHg9IjE1Ljg3NTEiIHk9IjAuMDAwMCIgd2lkdGg9IjEuMDU4MyIgaGVpZ2h0PSIyMC4xODY0IiAvPgo8cmVjdCB4PSIxNy40NjI2IiB5PSIwLjAwMDAiIHdpZHRoPSIwLjUyOTIiIGhlaWdodD0iMjAuMTg2NCIgLz4KPHJlY3QgeD0iMTkuNTc5MyIgeT0iMC4wMDAwIiB3aWR0aD0iMC41MjkyIiBoZWlnaHQ9IjIwLjE4NjQiIC8+CjxyZWN0IHg9IjIxLjE2NjgiIHk9IjAuMDAwMCIgd2lkdGg9IjEuMDU4MyIgaGVpZ2h0PSIyMC4xODY0IiAvPgo8cmVjdCB4PSIyMy4yODM1IiB5PSIwLjAwMDAiIHdpZHRoPSIxLjU4NzUiIGhlaWdodD0iMjAuMTg2NCIgLz4KPHJlY3QgeD0iMjUuNDAwMSIgeT0iMC4wMDAwIiB3aWR0aD0iMC41MjkyIiBoZWlnaHQ9IjIwLjE4NjQiIC8+CjxyZWN0IHg9IjI2LjQ1ODUiIHk9IjAuMDAwMCIgd2lkdGg9IjEuMDU4MyIgaGVpZ2h0PSIyMC4xODY0IiAvPgo8cmVjdCB4PSIyOS4xMDQzIiB5PSIwLjAwMDAiIHdpZHRoPSIxLjA1ODMiIGhlaWdodD0iMjAuMTg2NCIgLz4KPHJlY3QgeD0iMzAuNjkxOCIgeT0iMC4wMDAwIiB3aWR0aD0iMS4wNTgzIiBoZWlnaHQ9IjIwLjE4NjQiIC8+CjxyZWN0IHg9IjMyLjI3OTMiIHk9IjAuMDAwMCIgd2lkdGg9IjIuMTE2NyIgaGVpZ2h0PSIyMC4xODY0IiAvPgo8cmVjdCB4PSIzNC45MjUyIiB5PSIwLjAwMDAiIHdpZHRoPSIwLjUyOTIiIGhlaWdodD0iMjAuMTg2NCIgLz4KPHJlY3QgeD0iMzUuOTgzNSIgeT0iMC4wMDAwIiB3aWR0aD0iMC41MjkyIiBoZWlnaHQ9IjIwLjE4NjQiIC8+CjxyZWN0IHg9IjM4LjEwMDIiIHk9IjAuMDAwMCIgd2lkdGg9IjIuMTE2NyIgaGVpZ2h0PSIyMC4xODY0IiAvPgo8cmVjdCB4PSI0MC43NDYxIiB5PSIwLjAwMDAiIHdpZHRoPSIxLjU4NzUiIGhlaWdodD0iMjAuMTg2NCIgLz4KPHJlY3QgeD0iNDIuODYyNyIgeT0iMC4wMDAwIiB3aWR0aD0iMC41MjkyIiBoZWlnaHQ9IjIwLjE4NjQiIC8+CjxyZWN0IHg9IjQzLjkyMTEiIHk9IjAuMDAwMCIgd2lkdGg9IjEuMDU4MyIgaGVpZ2h0PSIyMC4xODY0IiAvPgo8cmVjdCB4PSI0Ni41NjY5IiB5PSIwLjAwMDAiIHdpZHRoPSIwLjUyOTIiIGhlaWdodD0iMjAuMTg2NCIgLz4KPHJlY3QgeD0iNDcuNjI1MyIgeT0iMC4wMDAwIiB3aWR0aD0iMi4xMTY3IiBoZWlnaHQ9IjIwLjE4NjQiIC8+CjxyZWN0IHg9IjUwLjgwMDMiIHk9IjAuMDAwMCIgd2lkdGg9IjAuNTI5MiIgaGVpZ2h0PSIyMC4xODY0IiAvPgo8cmVjdCB4PSI1Mi4zODc4IiB5PSIwLjAwMDAiIHdpZHRoPSIxLjA1ODMiIGhlaWdodD0iMjAuMTg2NCIgLz4KPHJlY3QgeD0iNTUuMDMzNiIgeT0iMC4wMDAwIiB3aWR0aD0iMS41ODc1IiBoZWlnaHQ9IjIwLjE4NjQiIC8+CjxyZWN0IHg9IjU3LjE1MDMiIHk9IjAuMDAwMCIgd2lkdGg9IjAuNTI5MiIgaGVpZ2h0PSIyMC4xODY0IiAvPgo8cmVjdCB4PSI1OC4yMDg3IiB5PSIwLjAwMDAiIHdpZHRoPSIxLjA1ODMiIGhlaWdodD0iMjAuMTg2NCIgLz4KPC9nPgo8ZyBmaWxsPSJyZ2IoMCUsMCUsMCUpIj4KPHRleHQgeD0iMjkuNjMzNSIgeT0iMjUuMjgyMSIgdHJhbnNmb3JtPSJyb3RhdGUoMzYwIDI5LjYzMzUsMjUuMjgyMSkiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSI1LjY0NDQiID4yNTQ2MDU1NDg5OTM1NDwvdGV4dD4KPC9nPgo8L3N2Zz4K"
            alt="barcode"
          />
        </div>
        <div className="ticket-count">x{data.quantity ?? 1}</div>
      </div>
    </div>
  );
}
