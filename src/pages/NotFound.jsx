import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="page-container">
      <div className="not-found-container">
        <h1>404</h1>
        <h2>Page Not Found</h2>
        <p>The page you are looking for does not exist.</p>
        <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
          <Link to="/" className="btn btn-primary">
            Back to Home
          </Link>
          <Link to="/dashboard" className="btn btn-success">
            Go to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
