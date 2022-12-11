import SnackbarWrapper from "@/components/layout/Snackbar/SnackbarWrapper"
import { myTrpc } from "@/hooks/trpc/myTrpc"
import {
  CacheProvider as EmotionCacheProvider,
  EmotionCache,
} from "@emotion/react"
import DateAdapter from "@mui/lab/AdapterLuxon"
import LocalizationProvider from "@mui/lab/LocalizationProvider"
import CssBaseline from "@mui/material/CssBaseline"
import { ThemeProvider } from "@mui/material/styles"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Session } from "next-auth"
import { SessionProvider } from "next-auth/react"
import { AppProps } from "next/app"
import Head from "next/head"
import createEmotionCache from "../createEmotionCache"
import theme from "../theme"
import "./global.css"

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache()

interface MyAppProps
  extends AppProps<{
    session: Session
  }> {
  emotionCache?: EmotionCache
}

function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props

  const queryClient = new QueryClient()

  return (
    <SessionProvider session={props.pageProps.session}>
      <QueryClientProvider client={queryClient}>
        <EmotionCacheProvider value={emotionCache}>
          <Head>
            <meta
              name="viewport"
              content="initial-scale=1, width=device-width"
            />
          </Head>
          <ThemeProvider theme={theme}>
            <LocalizationProvider dateAdapter={DateAdapter}>
              {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
              <CssBaseline />
              <Component {...pageProps} />
              <SnackbarWrapper />
            </LocalizationProvider>
          </ThemeProvider>
        </EmotionCacheProvider>
      </QueryClientProvider>
    </SessionProvider>
  )
}

export default myTrpc.withTRPC(MyApp)
