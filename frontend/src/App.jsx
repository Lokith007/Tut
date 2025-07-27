import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Layout from "@/components/Layout"
import Home from "@/pages/Home"
import Analytics from "@/pages/Analytics"

// Placeholder components for other pages
const Traceability = () => (
  <div className="min-h-screen bg-black animated-bg flex items-center justify-center">
    <div className="text-center">
      <h1 className="text-4xl font-black text-white mb-4 uppercase">BLOCKCHAIN TRACEABILITY</h1>
      <p className="text-gray-300">Coming Soon...</p>
    </div>
  </div>
)

const Hygiene = () => (
  <div className="min-h-screen bg-black animated-bg flex items-center justify-center">
    <div className="text-center">
      <h1 className="text-4xl font-black text-white mb-4 uppercase">AI HYGIENE SCANNER</h1>
      <p className="text-gray-300">Coming Soon...</p>
    </div>
  </div>
)

const Voice = () => (
  <div className="min-h-screen bg-black animated-bg flex items-center justify-center">
    <div className="text-center">
      <h1 className="text-4xl font-black text-white mb-4 uppercase">VOICE ASSISTANT</h1>
      <p className="text-gray-300">Coming Soon...</p>
    </div>
  </div>
)

const Directory = () => (
  <div className="min-h-screen bg-black animated-bg flex items-center justify-center">
    <div className="text-center">
      <h1 className="text-4xl font-black text-white mb-4 uppercase">MANUFACTURER DIRECTORY</h1>
      <p className="text-gray-300">Coming Soon...</p>
    </div>
  </div>
)

const Wrapped = () => (
  <div className="min-h-screen bg-black animated-bg flex items-center justify-center">
    <div className="text-center">
      <h1 className="text-4xl font-black text-white mb-4 uppercase">STREET WRAPPED</h1>
      <p className="text-gray-300">Coming Soon...</p>
    </div>
  </div>
)

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/traceability" element={<Traceability />} />
          <Route path="/hygiene" element={<Hygiene />} />
          <Route path="/voice" element={<Voice />} />
          <Route path="/directory" element={<Directory />} />
          <Route path="/wrapped" element={<Wrapped />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
