// import { ClerkProvider } from "@clerk/nextjs";
import "~/styles/globals.css";

import { headers } from "next/headers";
import { Roboto_Mono } from "next/font/google";

import { TRPCReactProvider } from "~/trpc/react";
import Header from "~/components/header";

const robotoMono = Roboto_Mono({ subsets: ["latin"] });

export const metadata = {
  title: "A Good First",
  description: "An application to find and manage open source contributions.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // <ClerkProvider>
    <html lang="en">
      <body className={robotoMono.className}>
        <TRPCReactProvider headers={headers()}>
          <Header />
          {children}
        </TRPCReactProvider>
      </body>
    </html>
    // </ClerkProvider>
  );
}
