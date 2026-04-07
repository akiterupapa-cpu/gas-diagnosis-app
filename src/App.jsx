import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import DiagnosisMethod from './pages/DiagnosisMethod';
import DiagnosisUpload from './pages/DiagnosisUpload';
import DiagnosisManual from './pages/DiagnosisManual';
import Result from './pages/Result';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/method" element={<DiagnosisMethod />} />
        <Route path="/upload" element={<DiagnosisUpload />} />
        <Route path="/manual" element={<DiagnosisManual />} />
        <Route path="/result" element={<Result />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
