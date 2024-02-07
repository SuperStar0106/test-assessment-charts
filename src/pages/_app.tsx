import { type AppType } from "next/app";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import { ThemeProvider } from "~/components/ThemeProvider";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark">
    <Component {...pageProps} />;
    </ThemeProvider>
  )
};

export default api.withTRPC(MyApp);
