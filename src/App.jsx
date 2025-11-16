import { LanguageProvider } from './contexts/LanguageContext'
import ScrollToTop from './components/ScrollToTop'
import AppRoutes from './router/routes'

function App() {
  return (
    <LanguageProvider>
      <div className="App">
        <ScrollToTop />
        <AppRoutes />
      </div>
    </LanguageProvider>
  )
}

export default App
