import { createContext, useContext, useState } from 'react';
// import axios from 'axios';

const ProductContext = createContext();

export function useProduct() {
  return useContext(ProductContext);
}

function ProductProvider(props) {
  const { children } = props;
  const [products, setProducts] = useState([]);
  const [chooseCategory, setChooseCategory] = useState({
    brands: [],
    cates: [],
    items: [],
    origins: [],
  });

  // async function getProducts() {
  //   try {
  //     const response = await axios.get('http://localhost:3001/api/products');
  //     const output = response.data.map((item) => {
  //       return {
  //         ...item,
  //         introduction: item.introduction.split('<br>').join('\n'),
  //         detail: item.detail.split('<br>').join('\n'),
  //       };
  //     });
  //     setProducts(output);
  //   } catch (error) {}
  // }
  return (
    <ProductContext.Provider
      value={{ products, setProducts, chooseCategory, setChooseCategory }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export default ProductProvider;
