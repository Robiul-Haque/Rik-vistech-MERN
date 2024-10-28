import './App.css'
import { Outlet } from 'react-router'
import { Provider } from 'react-redux'
import store from './redux/store'
import DefaultFetch from './Components/Layout/DefaultFetch'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'react-hot-toast'

const queryClient = new QueryClient()
function App() {
  return <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <DefaultFetch />
      <Outlet />
    </QueryClientProvider>
  </Provider>
}

export default App
