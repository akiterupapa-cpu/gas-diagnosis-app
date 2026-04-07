import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import LandingPage from './pages/LandingPage';
import DiagnosisMethod from './pages/DiagnosisMethod';
import DiagnosisUpload from './pages/DiagnosisUpload';
import DiagnosisManual from './pages/DiagnosisManual';
import Result from './pages/Result';
import ApplicationForm from './pages/ApplicationForm';
import SuccessPage from './pages/SuccessPage';

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/method" element={<DiagnosisMethod />} />
        <Route path="/upload" element={<DiagnosisUpload />} />
        <Route path="/manual" element={<DiagnosisManual />} />
        <Route path="/result" element={<Result />} />
        <Route path="/apply" element={<ApplicationForm />} />
        <Route path="/success" element={<SuccessPage />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AnimatedRoutes />
    </BrowserRouter>
  );
}

export default App;
