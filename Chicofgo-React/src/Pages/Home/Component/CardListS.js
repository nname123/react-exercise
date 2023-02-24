import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import { Link, useNavigate } from 'react-router-dom';

function CardListS(props) {
  const imgName = props.showImg;
  return (
    <>
      <CardGroup>
        {imgName.map((v, i) => {
          let product_id = v;
          return (
            <>
              <Card
                className={`text-white mx-2`}
                key={i}
                style={{
                  border: '0px solid #000',
                }}
              >
                <Link
                  className={``}
                  to={`/products/product_detail/${product_id}`}
                >
                  <Card.Img
                    // src={require('../../../Img/Home/' + v)}
                    src={`http://localhost:3001/api/images/productImg/coffee_${product_id}/coffee_${product_id}-1.png`}
                    alt="Card image"
                    style={{
                      // height: props.cardHeight,
                      objectFit: 'contain',
                    }}
                    className={`rounded-5`}
                  />
                </Link>
              </Card>
            </>
          );
        })}
      </CardGroup>
    </>
  );
}

export default CardListS;
