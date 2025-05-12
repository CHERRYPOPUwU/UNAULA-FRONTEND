import '../styles/components/Button.css';

export function Button({ onClick, children, type = '' }) {
    return (
      <button
        className={`btn --${type}`}
        onClick={onClick}
        type=''
      >
        {children}
      </button>
    );
  }

