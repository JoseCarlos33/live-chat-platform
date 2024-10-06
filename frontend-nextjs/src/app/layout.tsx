"use client";
import { baselightTheme } from "@/config/theme/DefaultColors";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { store } from "@/redux/store";
import { ToastContainer } from "react-toastify";
import { Provider, useDispatch } from "react-redux";
import { ReactNode, useEffect, useState } from "react";
import { showCustomToast } from "@/utils/toastConfig";
import { useSelector } from "react-redux";
import { showToast } from "@/redux/toast/toastSlice";

interface RootLayoutProps {
  children: ReactNode;
}

const ToastWrapper = ({ children }: RootLayoutProps) => {
  const {
    toast: { message, type },
  } = useSelector((state: any) => state);

  const [isClient, setIsClient] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    setIsClient(true);
    if (message && type) {
      showCustomToast({ message, type });
      dispatch(showToast({ message: "", type: "default" }));
    }
  }, [message, type]);
  if (!isClient) {
    return null;
  }

  return (
    <div>
      {children}
      <ToastContainer />
    </div>
  );
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Sora:wght@100;200;300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <ThemeProvider theme={baselightTheme}>
          <CssBaseline />
          <Provider store={store}>
            <ToastWrapper>{children}</ToastWrapper>
          </Provider>
        </ThemeProvider>
      </body>
    </html>
  );
}
