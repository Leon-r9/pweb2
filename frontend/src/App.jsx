import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';
import AllPosts from './pages/AllPosts';
import CreatePost from './pages/CreatePost';
import PostDetail from './pages/PostDetail';
import Register from './pages/Register';
import Login from './pages/Login';

function App() {
  return (
    <Router>
      <div style={styles.app}>
        <Navbar />
        <main style={styles.main}>
          <Routes>
            <Route path="/" element={<AllPosts />} />
            <Route path="/post/:id" element={<PostDetail />} />
            <Route path="/cadastro" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/criar-post"
              element={
                <PrivateRoute>
                  <CreatePost />
                </PrivateRoute>
              }
            />
          </Routes>
        </main>
        <footer style={styles.footer}>
          <p>© 2026 Meu Blog - Todos os direitos reservados</p>
        </footer>
      </div>
    </Router>
  );
}

const styles = {
  app: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#f5f6fa'
  },
  main: {
    flex: 1,
    paddingBottom: '2rem'
  },
  footer: {
    backgroundColor: '#2c3e50',
    color: '#ecf0f1',
    textAlign: 'center',
    padding: '1.5rem',
    marginTop: 'auto'
  }
};

export default App;
