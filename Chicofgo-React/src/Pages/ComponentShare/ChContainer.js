import { Container, Row, Col } from 'react-bootstrap';
import Path from '../../Layout/Item/Path/Path';
import PropTypes from 'prop-types';
import './ChContainer.scss'

function Layout(props) {
  return (
    <Container className='rwd'>
      <Row className={`justify-content-center`}>
        <Col
          xs={12} md={10}
          style={{
            marginBottom: '110px',
            minHeight: '100vh',
            padding: '5px'
          }}
        >
          <Path
            pathObj={{ path: [props.breadCrumb] }}
            fontStyle="chicofgo_white_font chicofgo-font-700"
          />
          <Row
            className={`${props.ChClass} rounded-5 justify-content-center `}
            style={{
              backgroundColor: 'rgb(250, 250, 250)',
              border: props.ChBorder,
            }}
          >
            {props.children}
          </Row>
        </Col>
      </Row>
    </Container>
  );
}
Layout.defaultProps = {
  breadCrumb: '',
  ChClass: '',
  ChBorder: '5px solid transparent',
  //   border border-5
};

Layout.propTypes = {
  breadCrumb: PropTypes.string,
  ChClass: PropTypes.string,
  ChBorder: PropTypes.string,
};

export default Layout;
