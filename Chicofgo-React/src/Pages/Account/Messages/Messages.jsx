import { Row, Col, Form, Button } from 'react-bootstrap';
import ChContainer from '../../ComponentShare/ChContainer';
import style from './Messages.module.scss';
import MessagesCard from './Component/MessagesCard';
function Messages() {
  return (
    <ChContainer
      ChClass={'chicofgo-font-700 border border-5'}
      breadCrumb={'全部通知'}
    >
      <Col>
        <Row>
          <Col>
            <h1 className={`${style.messagesTitle} text-center pt-5 py-4`}>
              全部通知
            </h1>
          </Col>
        </Row>
        <Row
          className={`chicofgo_gray justify-content-center text-center px-4 py-3 mb-3`}
        >
          <Col className={`col-3 `}>
            <Form className={`px-4 mx-2 chicofgo_brown_font`}>
              <Form.Check
                className={`text-nowrap `}
                type="switch"
                id="custom-switch"
                label="全部顯示"
              />
            </Form>
          </Col>
          <Col className={`col-6`}>
            <Row className={`justify-content-center `}>
              <Col className={`col-4`}>優惠券資訊</Col>
              <Col className={`col-4`}>訂單資訊</Col>
            </Row>
          </Col>
          <Col className={`col-3`}></Col>
        </Row>
        <Row
          className={`${style.messagesAreaHeight} mb-5 justify-content-center`}
        >
          <Col className={`col-8`}>
            <MessagesCard
              msgType="order"
              title="訂單完成"
              timestamp="2023/2/1 20:17"
              content="您在純粹飲品下訂的[膠囊咖啡] 黃金克立瑪風味已完成交易，前往評價區留下您的使用評價吧!"
            />
            <MessagesCard
              msgType="coupon"
              title="票券提醒"
              timestamp="2023/1/2 20:20"
              content="您有3張聖誕商城優惠券有3張聖誕商城優惠券，請於2023/2/4之前使用詳細活動辦法請參閱聖誕祈福活動"
            />
            <MessagesCard
              msgType="delivery"
              title="到貨通知"
              timestamp="2023/3/3 10:25"
              content="您在純粹飲品下訂的[膠囊咖啡]  黃金克立瑪風味已到達超商，提醒您請於2023/2/6之前完成超商取貨"
            />
            <MessagesCard
              msgType="8787"
              title="錯誤測試"
              timestamp="9999/9/9 9:59"
              content="8787666"
            />
          </Col>
        </Row>
      </Col>
    </ChContainer>
  );
}

export default Messages;
