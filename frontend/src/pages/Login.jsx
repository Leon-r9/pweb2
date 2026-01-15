import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authService } from '../services/authService';

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!username.trim()) {
      newErrors.username = 'O username é obrigatório';
    }

    if (!password) {
      newErrors.password = 'A senha é obrigatória';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);
      setError('');
      await authService.login(username, password);
      navigate('/');
    } catch (err) {
      setError(err.error || 'Erro ao fazer login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.formCard}>
        <h1 style={styles.title}>Login</h1>

        {error && <div style={styles.errorAlert}>{error}</div>}

        <form onSubmit={handleSubmit}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={{
                ...styles.input,
                ...(errors.username ? styles.inputError : {})
              }}
              placeholder="Digite seu username"
            />
            {errors.username && (
              <span style={styles.errorText}>{errors.username}</span>
            )}
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Senha</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                ...styles.input,
                ...(errors.password ? styles.inputError : {})
              }}
              placeholder="Digite sua senha"
            />
            {errors.password && (
              <span style={styles.errorText}>{errors.password}</span>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              ...styles.submitButton,
              ...(loading ? styles.buttonDisabled : {})
            }}
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>

        <div style={styles.footer}>
          Não tem uma conta?{' '}
          <Link to="/cadastro" style={styles.link}>
            Cadastre-se
          </Link>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '450px',
    margin: '0 auto',
    padding: '2rem 1rem',
    minHeight: 'calc(100vh - 200px)',
    display: 'flex',
    alignItems: 'center'
  },
  formCard: {
    width: '100%',
    backgroundColor: '#fff',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
  },
  title: {
    fontSize: '2rem',
    color: '#2c3e50',
    marginBottom: '1.5rem',
    textAlign: 'center'
  },
  errorAlert: {
    backgroundColor: '#e74c3c',
    color: '#fff',
    padding: '1rem',
    borderRadius: '4px',
    marginBottom: '1rem',
    textAlign: 'center',
    fontSize: '0.9rem'
  },
  formGroup: {
    marginBottom: '1.5rem'
  },
  label: {
    display: 'block',
    color: '#2c3e50',
    fontWeight: '600',
    marginBottom: '0.5rem'
  },
  input: {
    width: '100%',
    padding: '0.75rem',
    fontSize: '1rem',
    border: '1px solid #ddd',
    borderRadius: '4px',
    boxSizing: 'border-box'
  },
  inputError: {
    borderColor: '#e74c3c'
  },
  errorText: {
    color: '#e74c3c',
    fontSize: '0.85rem',
    marginTop: '0.25rem',
    display: 'block'
  },
  submitButton: {
    width: '100%',
    padding: '0.75rem',
    backgroundColor: '#3498db',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: '600',
    transition: 'background-color 0.3s'
  },
  buttonDisabled: {
    backgroundColor: '#bdc3c7',
    cursor: 'not-allowed'
  },
  footer: {
    marginTop: '1.5rem',
    textAlign: 'center',
    color: '#7f8c8d'
  },
  link: {
    color: '#3498db',
    textDecoration: 'none',
    fontWeight: '600'
  }
};

export default Login;
