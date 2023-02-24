import React from 'react';
import Container from 'react-bootstrap/Container';
import Carousels from './Component/EventCarousels';
import style from './Event.module.scss';

function Event() {
  return (
    <Container fluid>
      <Carousels
        className={`${style.event}`}
        showImg={['Event1-1.png', 'Event1-2.png', 'Event1-3.png']}
        srcollTo={0}
        changeDelay={2000}
        fade={true}
      />
      <Carousels
        showImg={['Event2-1.png', 'Event2-2.png', 'Event2-3.png']}
        srcollTo={window.innerHeight - 66}
        changeDelay={2000}
        fade={true}
      />
      <Carousels
        showImg={['Event3-1.png', 'Event3-2.png', 'Event3-3.png']}
        srcollTo={2 * window.innerHeight - 132}
        changeDelay={2000}
        fade={true}
      />
      <Carousels
        showImg={['Event4-1.png', 'Event4-2.png']}
        srcollTo={3 * window.innerHeight - 198}
        changeDelay={2000}
        fade={true}
      />
    </Container>
  );
}

export default Event;
