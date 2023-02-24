import React from 'react';
import styles from './EvaluateArea.module.scss';
import Form from 'react-bootstrap/Form';
import { filterRating } from '../../../../Config/ProductConfig';
import { filterYear } from '../../../../Config/ProductConfig';

const EvaluateArea = () => {
  const { eva_contorl, filter_area, rating_area, year_area } = styles;
  return (
    <div className={`${eva_contorl}`}>
      <div className={`${filter_area} d-flex flex-column align-items-center`}>
        <h4 className="mb-5">篩選查詢</h4>
        <div className={`${rating_area} form-check d-flex align-items-center`}>
          評價星數
          <Form className="mx-5">
            {['radio'].map((type) => (
              <div key={`inline-${type}`}>
                {filterRating.map((rating) => {
                  return (
                    <Form.Check
                      className="mx-3"
                      inline
                      label={rating.name}
                      name="group1"
                      type={type}
                      id={`inline-${type}-1`}
                    />
                  );
                })}
              </div>
            ))}
          </Form>
        </div>
        <div
          className={`${year_area} form-check d-flex align-items-center mt-3`}
        >
          留言時間
          <Form className="mx-5">
            {['radio'].map((type) => (
              <div key={`inline-${type}`}>
                {filterYear.map((year) => {
                  return (
                    <Form.Check
                      className="mx-3"
                      inline
                      label={year.name}
                      name="group2"
                      type={type}
                      id={`inline-${type}-1`}
                    />
                  );
                })}
              </div>
            ))}
          </Form>
        </div>
      </div>
    </div>
  );
};

export default EvaluateArea;
