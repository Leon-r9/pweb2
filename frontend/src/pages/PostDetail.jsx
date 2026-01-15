import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { postService } from '../services/postService';
import { commentService } from '../services/commentService';
import { authService } from '../services/authService';
import CommentCard from '../components/CommentCard';

const PostDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [commentError, setCommentError] = useState('');
  const isAuthenticated = authService.isAuthenticated();

  useEffect(() => {
    loadPostAndComments();
  }, [id]);

  const loadPostAndComments = async () => {
    try {
      setLoading(true);
      setError('');
      const [postData, commentsData] = await Promise.all([
        postService.getPostById(id),
        commentService.getCommentsByPostId(id)
      ]);
      setPost(postData);
      setComments(commentsData);
    } catch (err) {
      setError(err.error || 'Erro ao carregar post');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitComment = async (e) => {
    e.preventDefault();

    if (!newComment.trim()) {
      setCommentError('O comentário não pode estar vazio');
      return;
    }

    try {
      setSubmitting(true);
      setCommentError('');
      const response = await commentService.createComment(newComment, id);
      setComments([...comments, response.comment]);
      setNewComment('');
    } catch (err) {
      setCommentError(err.error || 'Erro ao criar comentário');
    } finally {
      setSubmitting(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  if (loading) {
    return (
      <div style={styles.container}>
        <div style={styles.loading}>Carregando post...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.container}>
        <div style={styles.errorAlert}>{error}</div>
        <button onClick={() => navigate('/')} style={styles.backButton}>
          Voltar para todos os posts
        </button>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <button onClick={() => navigate('/')} style={styles.backButton}>
        ← Voltar
      </button>

      <article style={styles.postCard}>
        <h1 style={styles.postTitle}>{post.titulo}</h1>
        <div style={styles.postMeta}>
          <span style={styles.author}>Por: {post.user?.username}</span>
          <span style={styles.date}>{formatDate(post.createdAt)}</span>
        </div>
        <div style={styles.postContent}>{post.texto}</div>
      </article>

      <section style={styles.commentsSection}>
        <h2 style={styles.commentsTitle}>
          Comentários ({comments.length})
        </h2>

        {isAuthenticated ? (
          <form onSubmit={handleSubmitComment} style={styles.commentForm}>
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Escreva seu comentário..."
              style={styles.commentInput}
              rows="4"
            />
            {commentError && (
              <div style={styles.errorText}>{commentError}</div>
            )}
            <button
              type="submit"
              disabled={submitting}
              style={{
                ...styles.submitButton,
                ...(submitting ? styles.buttonDisabled : {})
              }}
            >
              {submitting ? 'Enviando...' : 'Comentar'}
            </button>
          </form>
        ) : (
          <div style={styles.loginPrompt}>
            Você precisa estar logado para comentar.{' '}
            <span
              onClick={() => navigate('/login')}
              style={styles.loginLink}
            >
              Fazer login
            </span>
          </div>
        )}

        <div style={styles.commentsList}>
          {comments.length === 0 ? (
            <div style={styles.noComments}>
              Nenhum comentário ainda. Seja o primeiro a comentar!
            </div>
          ) : (
            comments.map((comment) => (
              <CommentCard key={comment.id} comment={comment} />
            ))
          )}
        </div>
      </section>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '900px',
    margin: '0 auto',
    padding: '2rem 1rem'
  },
  loading: {
    textAlign: 'center',
    padding: '3rem',
    color: '#7f8c8d',
    fontSize: '1.1rem'
  },
  errorAlert: {
    backgroundColor: '#e74c3c',
    color: '#fff',
    padding: '1rem',
    borderRadius: '4px',
    marginBottom: '1rem',
    textAlign: 'center'
  },
  backButton: {
    backgroundColor: '#3498db',
    color: '#fff',
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '0.9rem',
    marginBottom: '1.5rem'
  },
  postCard: {
    backgroundColor: '#fff',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    marginBottom: '2rem'
  },
  postTitle: {
    fontSize: '2.5rem',
    color: '#2c3e50',
    marginBottom: '1rem'
  },
  postMeta: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: '1rem',
    marginBottom: '1.5rem',
    borderBottom: '2px solid #ecf0f1'
  },
  author: {
    color: '#3498db',
    fontSize: '1rem',
    fontWeight: '600'
  },
  date: {
    color: '#95a5a6',
    fontSize: '0.9rem'
  },
  postContent: {
    color: '#34495e',
    fontSize: '1.1rem',
    lineHeight: '1.8',
    whiteSpace: 'pre-wrap'
  },
  commentsSection: {
    backgroundColor: '#fff',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
  },
  commentsTitle: {
    fontSize: '1.5rem',
    color: '#2c3e50',
    marginBottom: '1.5rem'
  },
  commentForm: {
    marginBottom: '2rem'
  },
  commentInput: {
    width: '100%',
    padding: '0.75rem',
    fontSize: '1rem',
    border: '1px solid #ddd',
    borderRadius: '4px',
    boxSizing: 'border-box',
    fontFamily: 'inherit',
    resize: 'vertical',
    marginBottom: '0.75rem'
  },
  submitButton: {
    padding: '0.75rem 1.5rem',
    backgroundColor: '#3498db',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '1rem'
  },
  buttonDisabled: {
    backgroundColor: '#bdc3c7',
    cursor: 'not-allowed'
  },
  errorText: {
    color: '#e74c3c',
    fontSize: '0.85rem',
    marginBottom: '0.5rem'
  },
  loginPrompt: {
    backgroundColor: '#f8f9fa',
    padding: '1rem',
    borderRadius: '4px',
    textAlign: 'center',
    marginBottom: '2rem',
    color: '#7f8c8d'
  },
  loginLink: {
    color: '#3498db',
    cursor: 'pointer',
    textDecoration: 'underline'
  },
  commentsList: {
    marginTop: '1.5rem'
  },
  noComments: {
    textAlign: 'center',
    padding: '2rem',
    color: '#95a5a6',
    backgroundColor: '#f8f9fa',
    borderRadius: '4px'
  }
};

export default PostDetail;
