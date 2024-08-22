import './App.css';
import Homepage from "./pages/Homepage/Homepage";
import Layout from "./components/Layout/Layout";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Homepage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
