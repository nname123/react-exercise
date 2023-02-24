import { Container, Row, Col, Form, Button, Image } from 'react-bootstrap';
import BusinessSiderbar from '../Components/BusinessSiderbar';
import ProductsList from './Components/ProductsList';

function BusinessProductsDetail() {
  return (
    <Container>
      <Row className="">
        <BusinessSiderbar />
        <Col sm={9}></Col>
      </Row>
    </Container>
  );
}

export default BusinessProductsDetail;
