import { useMemo, Fragment } from 'react';
import './Btn.scss';

export default function Btn({
  style = {},
  children,
  type = 'button',
  width = '',
  backgroundColor = '',
  color = '',
  className = '',
  ...allEvent
}) {
  const buttonStyle = useMemo(() => {
    return { width, backgroundColor, color, ...style };
  }, [width, backgroundColor, color, style]);
  return (
    <Fragment>
      <button
        type={type}
        className={`infoBtn ${className}`}
        style={buttonStyle}
        {...allEvent}
      >
        {children}
      </button>
    </Fragment>
  );
}
