"use client";

import React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import { GoogleOAuthProvider } from '@react-oauth/google';
export default function Provider({
  children,
}: {
  children: React.ReactNode;
}) {
  const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
  return (
   
    <ConvexProvider client={convex}>
      <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}>
        <NextThemesProvider>
      {children}
    </NextThemesProvider>
    </GoogleOAuthProvider>
    </ConvexProvider>
  );
}
