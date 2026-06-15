import './Button.css';
import { Link } from 'react-router-dom';

export default function Button({
  children,
  variant = 'solid',
  layout = 'center',
  fullWidth = false,
  type = 'button',
  to,
  className = '',
  ...props
}) {
  const classes = [
    'app-button',
    `app-button--${variant}`,
    layout === 'split' ? 'app-button--split' : '',
    fullWidth ? 'app-button--full' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} {...props}>
      {children}
    </button>
  );
}
