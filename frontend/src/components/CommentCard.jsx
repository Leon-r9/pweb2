const CommentCard = ({ comment }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div style={styles.card}>
      <div style={styles.header}>
        <span style={styles.author}>{comment.user?.username}</span>
        <span style={styles.date}>{formatDate(comment.createdAt)}</span>
      </div>
      <p style={styles.text}>{comment.texto}</p>
    </div>
  );
};

const styles = {
  card: {
    backgroundColor: '#f8f9fa',
    padding: '1rem',
    borderRadius: '6px',
    marginBottom: '0.75rem',
    borderLeft: '3px solid #3498db'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '0.5rem'
  },
  author: {
    color: '#2c3e50',
    fontSize: '0.9rem',
    fontWeight: '600'
  },
  date: {
    color: '#95a5a6',
    fontSize: '0.8rem'
  },
  text: {
    color: '#34495e',
    lineHeight: '1.5',
    margin: 0
  }
};

export default CommentCard;
