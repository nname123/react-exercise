import Button from 'react-bootstrap/Button';
import React, { useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import style from './MessagesCard.module.scss';
import { BsFillBagCheckFill } from 'react-icons/bs';
import { RiTruckLine } from 'react-icons/ri';
import { GiTicket } from 'react-icons/gi';
import { MdOutlineImageNotSupported } from 'react-icons/md';

function SetIconColor(props) {
  return (
    <div className={`${style.messageIcon} ${props.setColorClass} text-center `}>
      <h1 className={`chicofgo_white_font`}>{props.setIcon}</h1>
    </div>
  );
}

function MessagesCard(props) {
  const MessageType = props.msgType;
  function CheckTypeSetIcon(props) {
    if (MessageType === 'order') {
      return (
        <SetIconColor
          setColorClass="chicofgo_brown pt-2"
          setIcon={<BsFillBagCheckFill />}
        />
      );
    } else if (MessageType === 'coupon') {
      return (
        <SetIconColor
          setColorClass="chicofgo_green pt-2"
          setIcon={<GiTicket />}
        />
      );
    } else if (MessageType === 'delivery') {
      return (
        <SetIconColor
          setColorClass="chicofgo_brown pt-2"
          setIcon={<RiTruckLine />}
        />
      );
    } else {
      return (
        <SetIconColor
          setColorClass="chicofgo_gray pt-2"
          setIcon={<MdOutlineImageNotSupported />}
        />
      );
    }
  }

  return (
    <Container fluid className={`${style.messageContent} my-1 `}>
      <Row
        className={`${style.messageAll} justify-content-center chicofgo_khaki_font`}
      >
        <Col className={`col-3 px-0 justify-content-center`}>
          <CheckTypeSetIcon />
        </Col>
        <Col className={`col-9 ps-1 pe-5 py-3`}>
          <Row>
            <Col>
              <h3>
                {props.title}
                <span className={`px-3 chicofgo_khaki_font`}>
                  {props.timestamp}
                </span>
              </h3>
            </Col>
          </Row>
          <Row>
            <Col>
              <h2>{props.content}</h2>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default MessagesCard;
