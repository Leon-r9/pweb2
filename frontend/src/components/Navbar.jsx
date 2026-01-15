import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';

const Navbar = () => {
  const navigate = useNavigate();
  const isAuthenticated = authService.isAuthenticated();
  const currentUser = authService.getCurrentUser();

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };

  return (
    <nav style={styles.navbar}>
      <div style={styles.container}>
        <Link to="/" style={styles.logo}>
          📝 Meu Blog
        </Link>
        
        <div style={styles.menu}>
          <Link to="/" style={styles.link}>
            Todos os Posts
          </Link>
          
          {isAuthenticated ? (
            <>
              <Link to="/criar-post" style={styles.link}>
                Criar Post
              </Link>
              <span style={styles.username}>
                Olá, {currentUser?.username}
              </span>
              <button onClick={handleLogout} style={styles.button}>
                Sair
              </button>
            </>
          ) : (
            <>
              <Link to="/login" style={styles.link}>
                Login
              </Link>
              <Link to="/cadastro" style={styles.link}>
                Cadastro
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

const styles = {
  navbar: {
    backgroundColor: '#2c3e50',
    padding: '1rem 0',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 1rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  logo: {
    color: '#fff',
    fontSize: '1.5rem',
    fontWeight: 'bold',
    textDecoration: 'none'
  },
  menu: {
    display: 'flex',
    gap: '1.5rem',
    alignItems: 'center'
  },
  link: {
    color: '#ecf0f1',
    textDecoration: 'none',
    fontSize: '1rem',
    transition: 'color 0.3s'
  },
  username: {
    color: '#3498db',
    fontSize: '0.9rem',
    fontWeight: '500'
  },
  button: {
    backgroundColor: '#e74c3c',
    color: '#fff',
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '0.9rem',
    transition: 'background-color 0.3s'
  }
};

export default Navbar;
