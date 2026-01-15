import { useState, useEffect } from 'react';
import { postService } from '../services/postService';
import PostCard from '../components/PostCard';
import Pagination from '../components/Pagination';

const AllPosts = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadPosts(currentPage);
  }, [currentPage]);

  const loadPosts = async (page) => {
    try {
      setLoading(true);
      setError('');
      const data = await postService.getAllPosts(page, 10);
      setPosts(data.posts);
      setTotalPages(data.pagination.totalPages);
    } catch (err) {
      setError(err.error || 'Erro ao carregar posts');
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Todos os Posts</h1>

      {error && <div style={styles.error}>{error}</div>}

      {loading ? (
        <div style={styles.loading}>Carregando posts...</div>
      ) : posts.length === 0 ? (
        <div style={styles.empty}>
          Nenhum post encontrado. Seja o primeiro a criar um!
        </div>
      ) : (
        <>
          <div style={styles.postList}>
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>

          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </>
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '900px',
    margin: '0 auto',
    padding: '2rem 1rem'
  },
  title: {
    fontSize: '2rem',
    color: '#2c3e50',
    marginBottom: '2rem',
    textAlign: 'center'
  },
  postList: {
    marginBottom: '2rem'
  },
  loading: {
    textAlign: 'center',
    padding: '2rem',
    color: '#7f8c8d',
    fontSize: '1.1rem'
  },
  empty: {
    textAlign: 'center',
    padding: '3rem',
    color: '#95a5a6',
    fontSize: '1.1rem',
    backgroundColor: '#f8f9fa',
    borderRadius: '8px'
  },
  error: {
    backgroundColor: '#e74c3c',
    color: '#fff',
    padding: '1rem',
    borderRadius: '4px',
    marginBottom: '1rem',
    textAlign: 'center'
  }
};

export default AllPosts;
