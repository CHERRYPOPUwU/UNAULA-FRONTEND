import '../styles/components/Button.css';

export function Button({ onClick, children, icon, type = '', style = ''}) {
    return (
      <button
        className={`btn --${type} ${style}`}
        onClick={onClick}
        type=''
      >
        {icon ? icon : children}
      </button>
    );
  }

