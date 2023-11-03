import "~/styles/globals.css";

import { headers } from "next/headers";

import { TRPCReactProvider } from "~/trpc/react";

export const metadata = {
  title: "A Good First",
  description: "An application to find new and manage open source contributions.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <TRPCReactProvider headers={headers()}>{children}</TRPCReactProvider>
      </body>
    </html>
  );
}
