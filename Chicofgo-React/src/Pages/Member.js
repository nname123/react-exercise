import { Outlet, Navigate } from 'react-router-dom';
import { React, useContext } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import SideBar from './Account/Components/SideBar';
import memberBackground from './Account/Components/member_background.png';
import { useAuth } from '../Contexts/AuthContext';
function Member() {
  const { isLoggedIn, userRank } = useAuth();
  if (!isLoggedIn) return <Navigate to="/login" replace={true} />;
  if (userRank === '2') return <Navigate to="/businessOrder" replace={true} />;
  return (
    <>
      <Container
        fluid
        style={{
          backgroundImage: `url(${memberBackground})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <Row>
          <Col xs={12} md={2} className={`p-0`}>
            {/* <MemberSideBar /> */}
            <SideBar />
          </Col>
          <Col xs={12} md={10}>
            <Outlet />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Member;
