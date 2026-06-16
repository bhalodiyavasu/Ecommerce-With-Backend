import './Loader.css';
import Loader from './Loader';

export default function LoadableContent({ isLoading, children }) {
  if (isLoading) {
    return (
      <div className="loadable-content-overlay">
        <Loader />
      </div>
    );
  }
  return children;
}
