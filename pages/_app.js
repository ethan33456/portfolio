import '../styles/globals.css'

import Layout from './layout'
import { QueryClient, QueryClientProvider } from 'react-query'
import { useRouter } from 'next/router'

const queryClient = new QueryClient()

export default function App({ Component, pageProps }) {
  const router = useRouter()
  const isValentinePage = router.pathname === '/will-you-be-my-valentine'

  return (
    <QueryClientProvider client={queryClient}>
      {isValentinePage ? (
        <Component {...pageProps} />
      ) : (
        <Layout>
          <Component {...pageProps} />
        </Layout>
      )}
    </QueryClientProvider>
  )
}
