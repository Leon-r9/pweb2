import { useNavigate } from 'react-router-dom';

const PostCard = ({ post }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/post/${post.id}`);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <div style={styles.card} onClick={handleClick}>
      <h2 style={styles.title}>{post.titulo}</h2>
      <p style={styles.excerpt}>
        {post.texto.substring(0, 150)}
        {post.texto.length > 150 ? '...' : ''}
      </p>
      <div style={styles.footer}>
        <span style={styles.author}>Por: {post.user?.username}</span>
        <span style={styles.date}>{formatDate(post.createdAt)}</span>
      </div>
    </div>
  );
};

const styles = {
  card: {
    backgroundColor: '#fff',
    padding: '1.5rem',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    cursor: 'pointer',
    transition: 'transform 0.2s, box-shadow 0.2s',
    marginBottom: '1rem'
  },
  title: {
    fontSize: '1.5rem',
    color: '#2c3e50',
    marginBottom: '0.5rem'
  },
  excerpt: {
    color: '#7f8c8d',
    lineHeight: '1.6',
    marginBottom: '1rem'
  },
  footer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTop: '1px solid #ecf0f1',
    paddingTop: '0.75rem'
  },
  author: {
    color: '#3498db',
    fontSize: '0.9rem',
    fontWeight: '500'
  },
  date: {
    color: '#95a5a6',
    fontSize: '0.85rem'
  }
};

export default PostCard;
