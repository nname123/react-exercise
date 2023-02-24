import { createContext, useContext, useState } from 'react';
import axios from 'axios';

const ProductContext = createContext();

export function useProduct() {
  return useContext(ProductContext);
}

function ProductProvider(props) {
  const { children } = props;
  const [products, setProducts] = useState([]);
  const [chooseCategory, setChooseCategory] = useState([]);

  // const [realIsLoading, setRealIsLoading] = useState(false);
  // const [errorMessage, setErrorMessage] = useState('');
  async function getProducts() {
    // setRealIsLoading(true);
    try {
      const response = await axios.get('http://localhost:3001/api/products');
      const output = response.data.map((item) => {
        return {
          ...item,
          introduction: item.introduction.split('<br>').join('\n'),
          detail: item.detail.split('<br>').join('\n'),
        };
      });
      // setRealIsLoading(false);
      setProducts(output);
    } catch (error) {
      // setRealIsLoading(false);
      // setErrorMessage(error);
    }
  }
  return (
    // <ProductContext.Provider value={{ products, getProducts, realIsLoading, errorMessage }}>
    <ProductContext.Provider
      value={{ products, getProducts, chooseCategory, setChooseCategory }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export default ProductProvider;
