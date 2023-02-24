import React from 'react';
import styles from './Specification.module.scss';

const Specification = (props) => {
  const { spec } = props;
  const { spec_contorl, spec_info } = styles;
  return (
    <div className={`${spec_contorl} d-flex flex-column`}>
      <h3>產品規格</h3>
      <pre className={`${spec_info}`}>{spec}</pre>
    </div>
  );
};

export default Specification;
