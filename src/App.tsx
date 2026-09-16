import { Route, Routes } from 'react-router'

import { Layout } from './components/Layout'
import HomePage from './pages/HomePage'
import NotFoundPage from './pages/NotFoundPage'
import ServicesPage from './pages/ServicesPage'

/**
 * Both languages are real URLs rather than a client-side switch, so each one
 * gets prerendered and indexed. The routes mirror src/routes.ts.
 */
export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/servicios/" element={<ServicesPage />} />
        <Route path="/en/" element={<HomePage />} />
        <Route path="/en/services/" element={<ServicesPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}
