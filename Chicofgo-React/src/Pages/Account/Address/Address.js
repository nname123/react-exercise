import { Row, Col } from 'react-bootstrap';
import MemberBar from '../Components/MemberBar';
import ChContainer from '../../ComponentShare/ChContainer';
import AddressDetail from './AddressDetail';

function Address() {
  return (
    <ChContainer
      ChClass={'chicofgo-font-700 border border-5'}
      breadCrumb={'地址'}
    >
      <MemberBar />
      <Row className="d-flex justify-content-center">
        <Col sm={9} className="pt-3 pb-4 px-0 px-md-5 mb-md-5 mb-3 mt-3 ">
          <AddressDetail />
        </Col>
      </Row>
    </ChContainer>
  );
}

export default Address;
