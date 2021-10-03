import React, { useState, useEffect } from 'react';

import { AiOutlineShoppingCart, AiOutlineShopping } from 'react-icons/ai';
import { FiGift } from 'react-icons/fi';
import api from '../../services/api';

import { Header, Main } from './styles';

interface Product {
  id: string;
  title: string;
  value: number;
  cover: string;
  sold: number;
  available: number;
}

interface Response {
  products: Product[];
}

const Home: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    api.get<Response>('shopping').then(response => {
      const responseBody = response.data;

      setProducts(responseBody.products);
    });
  }, []);

  return (
    <>
      <Header>
        <div id="logo">
          <FiGift color="#E60301" size={25} />
          <span>Melhores Ofertas</span>
        </div>
        <div id="cart">
          <AiOutlineShoppingCart size={40} />
        </div>
      </Header>
      <Main>
        {products.map(product => (
          <div key={product.id} className="card">
            <img src={product.cover} alt="cover" />
            <h6>{product.title}</h6>
            <p>{product.value}</p>
            <div id="quantity">
              <span>Sold: {product.sold}</span>
              <span>Available: {product.available}</span>
            </div>
            <button type="button">
              <div className="icon">
                <AiOutlineShopping size={19} />
                <span>0</span>
              </div>
              <p>ADICIONAR AO CARRINHO</p>
            </button>
          </div>
        ))}
      </Main>
    </>
  );
};

export default Home;
