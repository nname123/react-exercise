import { Container, Row, Col, Table, Image } from 'react-bootstrap';
import style from './CollectShop.module.scss';

function ShopCard(props) {
  return (
    <Container fluid className={`${style.shopCardContent} my-1 `}>
      <Row className={`justify-content-center chicofgo_khaki_font`}>
        <Col className={`col-3 px-0 justify-content-center`}>
          <Image
            src={require('../../../../Img/Brand/' + props.logo)}
            className={`${style.shopIcon} `}
          />
        </Col>
        <Col className={`col-9 my-0`}>
          <Row>
            <Col className={`pe-0`}>
              <Table
                borderless
                hover
                className={`${style.tableText} text-nowrap p-0 m-0`}
              >
                <thead>
                  <tr>
                    <th colspan="3">
                      <h3 className={`my-0`}>{props.brandname}</h3>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>商品:</th>
                    <td>{props.products}</td>
                    <th>粉絲:</th>
                    <td>{props.fans}</td>
                  </tr>
                  <tr>
                    <th>關注:</th>
                    <td>{props.follower}</td>
                    <th>評價:</th>
                    <td>{props.review}</td>
                  </tr>
                  <tr>
                    <th>加入時間:</th>
                    <td>{props.jointime}</td>
                  </tr>
                </tbody>
              </Table>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

function CollectShop() {
  return (
    <Col className={`col-8 `}>
      <ShopCard
        brandname="UCC"
        logo="Ucc.png"
        products="111"
        follower="87"
        fans="1100"
        review="111200"
        jointime="2022/12/12"
      />
      <ShopCard
        brandname="伯朗咖啡"
        logo="Mrbrown.png"
        products="134"
        follower="66"
        fans="1264"
        review="1312"
        jointime="2022/12/13"
      />
      <ShopCard
        brandname="雀巢"
        logo="Nestle.png"
        products="187"
        follower="87"
        fans="1378"
        review="1400"
        jointime="2022/12/14"
      />
    </Col>
  );
}

export default CollectShop;
