import React from 'react';
import styles from './Path.module.scss';
import { v4 } from 'uuid';
import { Link } from 'react-router-dom';

const Path = ({ pathObj, backgroundColor, fontStyle, url = [] }) => {
  const newUrl = url.length;
  const { Path_font, Path_wrap, Path } = styles;
  let setFontStyle = fontStyle || 'chicofgo_brown_font';

  return (
    <div className={` ${Path}`}>
      <div className={`${Path_font} ${Path_wrap} d-flex align-items-center`}>
        <Link to="/">
          <span className={`${setFontStyle}`}>首頁</span>
        </Link>
        {pathObj.path.map((path, i) => {
          return (
            <Link
              to={url && i === newUrl - 1 ? url[newUrl - 1] : '#'}
              key={v4()}
            >
              <span className={`${setFontStyle}`}>&nbsp;/&nbsp;{path}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Path;
