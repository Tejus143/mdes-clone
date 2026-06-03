import ErrorBoundary from './components/common/ErrorBoundary/ErrorBoundary'
import AppRoutes from './routes/AppRoutes'

const App = () => {
  return (
    <ErrorBoundary>
      <AppRoutes />
    </ErrorBoundary>
  )
}

export default App
