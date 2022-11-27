import { useState, useEffect, PropsWithChildren } from "react";
import { useRouter } from "next/router";
import { useAccount } from "wagmi";

type Props = PropsWithChildren<{
  guard?: any;
}>;

export { PageRoute };

function PageRoute({ children }: Props) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  const { isConnected } = useAccount();

  useEffect(() => {
    // on initial load - run auth check
    authCheck();

    // on route change start - hide page content by setting authorized to false
    const hideContent = () => setAuthorized(false);
    router.events.on("routeChangeStart", hideContent);

    // on route change complete - run auth check
    router.events.on("routeChangeComplete", authCheck);

    // unsubscribe from events in useEffect return function
    return () => {
      router.events.off("routeChangeStart", hideContent);
      router.events.off("routeChangeComplete", authCheck);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function authCheck() {
    if (!isConnected) {
      setAuthorized(false);
      router.push({
        pathname: "/",
        query: { returnUrl: router.asPath },
      });
    } else {
      setAuthorized(true);
    }
  }

  return authorized ? <>{children}</> : <></>;
}
