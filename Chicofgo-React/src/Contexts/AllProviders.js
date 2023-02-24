import React from 'react';
import ProductProvider from './ProductProvider';
import MessageProvider from './MessageProvider';
import AuthProvider from './AuthContext';

import ShoppingCartProvider from './ShoppingCartProvider';

function AllProviders(props) {
  const { children } = props;
  return (
    <AuthProvider>
      <MessageProvider>
        <ProductProvider>
          <ShoppingCartProvider>{children}</ShoppingCartProvider>
        </ProductProvider>
      </MessageProvider>
    </AuthProvider>
  );
}

export default AllProviders;
