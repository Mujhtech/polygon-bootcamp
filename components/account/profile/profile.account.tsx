import { useRouter } from "next/router";
import React from "react";
import { useAccount, useDisconnect } from "wagmi";
import PrimaryButton from "../../btn/PrimaryButton";
import SecondaryButton from "../../btn/SecondaryButton";
import { Identicon } from "../../Identicon";

export default function ProfileAccount() {
  const { address } = useAccount();

  const { disconnect } = useDisconnect();
  const router = useRouter();

  const logout = async () => {
    try {
      disconnect();
      router.push("/");
    } catch (e) {}
  };
  return (
    <div className="flex flex-col items-center mx-auto">
      <Identicon address={address!} size={150} />
      <div className="my-6">
        <div
          className="w-[250px] flex flex-row justify-between bg-grey-background border border-grey-divider rounded-md overflow-hidden mt-2 cursor-pointer"
          title={address}
        >
          <div className="w-5/6 py-1 sm:py-2 px-2 text-md sm:text-sm text-support font-medium">
            {address}
          </div>

          <button
            onClick={function () {
              window.location.assign(
                `https://mumbai.polygonscan.com/address/${address}`
              );
            }}
            className="w-1/6 bg-white text-primary flex items-center justify-center px-2 border-l border-grey-divider text-support outline-none focus:outline-none transition-all"
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
                d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"
              />
            </svg>
          </button>
        </div>
      </div>
      <SecondaryButton title="Disconnet" onPressed={() => logout()}>
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
            d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
          />
        </svg>
      </SecondaryButton>
    </div>
  );
}
