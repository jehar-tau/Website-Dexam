import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { LeadProvider } from "./lead-context.jsx";
import Layout from "./components/Layout.jsx";
import {
  Home,
  About,
  Courses,
  Guide,
  Exams,
  ExamGuide,
  Papers,
  PaperArchive,
  Careers,
  Resources,
  Article,
  Pune,
  MockTests,
  StudentAccess,
  NotFound,
  Results,
  Contact,
} from "./site/Pages.jsx";
import Quiz from "./pages/Quiz.jsx";
import Privacy from "./pages/Privacy.jsx";
import Terms from "./pages/Terms.jsx";
import Admin from "./pages/Admin.jsx";
import { CmsProvider } from "./cms.jsx";

export default function App() {
  const { pathname } = useLocation();
  if (pathname.replace(/\/$/, "") === "/quiz") return <Quiz />;
  if (pathname === "/admin" || pathname.startsWith("/admin/")) {
    return (
      <CmsProvider>
        <Routes>
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<Navigate to="/admin" replace />} />
        </Routes>
      </CmsProvider>
    );
  }
  return (
    <CmsProvider>
      <LeadProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/guide" element={<Guide />} />
            <Route path="/exams" element={<Exams />} />
            <Route path="/exams/:examId" element={<ExamGuide />} />
            <Route path="/papers" element={<Papers />} />
            <Route path="/papers/:examId" element={<PaperArchive />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/resources/:slug" element={<Article />} />
            <Route path="/design-careers" element={<Careers />} />
            <Route path="/design-coaching-pune" element={<Pune />} />
            <Route path="/mock-tests" element={<MockTests />} />
            <Route path="/student-access" element={<StudentAccess />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/results" element={<Results />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </LeadProvider>
    </CmsProvider>
  );
}
