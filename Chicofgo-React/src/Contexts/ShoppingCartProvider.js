import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const ShoppingCartContext = createContext();

export function useShoppingCart() {
  return useContext(ShoppingCartContext);
}

function ShoppingCartProvider(props) {
  const { children } = props;
  const [selectProducts, setSelectProducts] = useState([]);

  useEffect(() => {
    async function getShoppingCart() {
      let response = await axios.get('http://localhost:3001/api/shoppingcart', {
        withCredentials: true,
      });
      setSelectProducts(response.data);
    }
    getShoppingCart();
  }, []);

  return (
    <ShoppingCartContext.Provider value={{ selectProducts, setSelectProducts }}>
      {children}
    </ShoppingCartContext.Provider>
  );
}

export default ShoppingCartProvider;
