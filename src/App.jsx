import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { LeadProvider } from './lead-context.jsx'
import Layout from './components/Layout.jsx'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Courses from './pages/Courses.jsx'
import Guide from './pages/Guide.jsx'
import ExamsInfo from './pages/ExamsInfo.jsx'
import PapersHub from './pages/PapersHub.jsx'
import ExamPapers from './pages/ExamPapers.jsx'
import Quiz from './pages/Quiz.jsx'
import Results from './pages/Results.jsx'
import Contact from './pages/Contact.jsx'
import Privacy from './pages/Privacy.jsx'
import Terms from './pages/Terms.jsx'
import Admin from './pages/Admin.jsx'
import { CmsProvider } from './cms.jsx'

export default function App() {
  const { pathname } = useLocation()
  if (pathname === '/admin' || pathname.startsWith('/admin/')) {
    return <CmsProvider><Routes><Route path="/admin" element={<Admin />} /><Route path="*" element={<Navigate to="/admin" replace />} /></Routes></CmsProvider>
  }
  return (
    <CmsProvider><LeadProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/guide" element={<Guide />} />
          <Route path="/exams" element={<ExamsInfo />} />
          <Route path="/papers" element={<PapersHub />} />
          <Route path="/papers/:examId" element={<ExamPapers />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/results" element={<Results />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </LeadProvider></CmsProvider>
  )
}
