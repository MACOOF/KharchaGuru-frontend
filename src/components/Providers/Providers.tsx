"use client"
import React, { useEffect, useState } from "react"
import { ThemeProviders } from "./ThemeProvider"
import { SessionProviders } from "./SessionProvider"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { NextIntlClientProvider } from "next-intl"

export function Providers({ children,messages }: { children: React.ReactNode,messages:any }) {
  const [locale, setLocale] = useState('en');

  // Load stored locale from localStorage on client side
  useEffect(() => {
    const savedLocale = localStorage.getItem('locale');
    if (savedLocale && messages[savedLocale]) {
      setLocale(savedLocale);
    }
  }, []);

  const queryClient = new QueryClient();

  return (
    <SessionProviders>
      <QueryClientProvider client={queryClient}>
        <ThemeProviders
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NextIntlClientProvider locale={locale} messages={messages}>
            {children}
          </NextIntlClientProvider>
        </ThemeProviders>
      </QueryClientProvider>
    </SessionProviders>
  )
}