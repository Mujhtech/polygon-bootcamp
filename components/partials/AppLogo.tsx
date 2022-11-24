import Link from "next/link";
import React from "react";

export default function AppLogo() {
  return (
    <div>
      <Link href="/" passHref>
        <h4 className="text-3xl font-black">
          <span className="text-black text-opacity-50">event</span>
          <span className="text-black">nexo</span>
        </h4>
      </Link>
    </div>
  );
}
