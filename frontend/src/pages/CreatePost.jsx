import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { postService } from '../services/postService';

const CreatePost = () => {
  const navigate = useNavigate();
  const [titulo, setTitulo] = useState('');
  const [texto, setTexto] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!titulo.trim()) {
      newErrors.titulo = 'O título é obrigatório';
    } else if (titulo.trim().length < 3) {
      newErrors.titulo = 'O título deve ter pelo menos 3 caracteres';
    }

    if (!texto.trim()) {
      newErrors.texto = 'O texto é obrigatório';
    } else if (texto.trim().length < 10) {
      newErrors.texto = 'O texto deve ter pelo menos 10 caracteres';
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
      await postService.createPost(titulo, texto);
      navigate('/');
    } catch (err) {
      setError(err.error || 'Erro ao criar post');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.formCard}>
        <h1 style={styles.title}>Criar Novo Post</h1>

        {error && <div style={styles.errorAlert}>{error}</div>}

        <form onSubmit={handleSubmit}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Título *</label>
            <input
              type="text"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              style={{
                ...styles.input,
                ...(errors.titulo ? styles.inputError : {})
              }}
              placeholder="Digite o título do post"
            />
            {errors.titulo && (
              <span style={styles.errorText}>{errors.titulo}</span>
            )}
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Texto *</label>
            <textarea
              value={texto}
              onChange={(e) => setTexto(e.target.value)}
              style={{
                ...styles.textarea,
                ...(errors.texto ? styles.inputError : {})
              }}
              placeholder="Escreva o conteúdo do seu post"
              rows="10"
            />
            {errors.texto && (
              <span style={styles.errorText}>{errors.texto}</span>
            )}
          </div>

          <div style={styles.buttonGroup}>
            <button
              type="button"
              onClick={() => navigate('/')}
              style={styles.cancelButton}
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              style={{
                ...styles.submitButton,
                ...(loading ? styles.buttonDisabled : {})
              }}
            >
              {loading ? 'Criando...' : 'Criar Post'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '2rem 1rem'
  },
  formCard: {
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
    textAlign: 'center'
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
  textarea: {
    width: '100%',
    padding: '0.75rem',
    fontSize: '1rem',
    border: '1px solid #ddd',
    borderRadius: '4px',
    boxSizing: 'border-box',
    fontFamily: 'inherit',
    resize: 'vertical'
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
  buttonGroup: {
    display: 'flex',
    gap: '1rem',
    justifyContent: 'flex-end'
  },
  cancelButton: {
    padding: '0.75rem 1.5rem',
    backgroundColor: '#95a5a6',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '1rem',
    transition: 'background-color 0.3s'
  },
  submitButton: {
    padding: '0.75rem 1.5rem',
    backgroundColor: '#3498db',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '1rem',
    transition: 'background-color 0.3s'
  },
  buttonDisabled: {
    backgroundColor: '#bdc3c7',
    cursor: 'not-allowed'
  }
};

export default CreatePost;
