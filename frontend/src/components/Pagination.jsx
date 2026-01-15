const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pages = [];
  
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <div style={styles.container}>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        style={{
          ...styles.button,
          ...(currentPage === 1 ? styles.buttonDisabled : {})
        }}
      >
        ← Anterior
      </button>

      <div style={styles.pages}>
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            style={{
              ...styles.pageButton,
              ...(page === currentPage ? styles.pageButtonActive : {})
            }}
          >
            {page}
          </button>
        ))}
      </div>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        style={{
          ...styles.button,
          ...(currentPage === totalPages ? styles.buttonDisabled : {})
        }}
      >
        Próxima →
      </button>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '1rem',
    marginTop: '2rem'
  },
  button: {
    padding: '0.5rem 1rem',
    backgroundColor: '#3498db',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '0.9rem',
    transition: 'background-color 0.3s'
  },
  buttonDisabled: {
    backgroundColor: '#bdc3c7',
    cursor: 'not-allowed'
  },
  pages: {
    display: 'flex',
    gap: '0.5rem'
  },
  pageButton: {
    padding: '0.5rem 0.75rem',
    backgroundColor: '#ecf0f1',
    color: '#2c3e50',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '0.9rem',
    transition: 'background-color 0.3s'
  },
  pageButtonActive: {
    backgroundColor: '#3498db',
    color: '#fff'
  }
};

export default Pagination;
