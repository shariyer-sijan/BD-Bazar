

import React from 'react';
import Allprice from './Allprice';

const Allapi =async () => {
    const res = await fetch("https://openapi.programming-hero.com/api/bazardor/products");
  const products = await res.json();
    return (
        <Allprice products={products} />
    );
};

export default Allapi;

