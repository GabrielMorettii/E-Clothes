import React, { useState, useEffect } from 'react';

import { AiOutlineShoppingCart, AiOutlineShopping } from 'react-icons/ai';
import { FiGift } from 'react-icons/fi';
import api from '../../services/api';

import { Header, Main } from './styles';

const Home: React.FC = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    api.get('/shopping').then(response => {
      setProducts([...products, response.data]);
    });
  }, [products]);

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
            <img src="https://via.placeholder.com/300x200" alt="cover" />
            <h6>Product Name</h6>
            <p>R$ 15,00</p>
            <div id="quantity">
              <span>Sold: 20</span>
              <span>Available: 5</span>
            </div>
            <button type="button">
              <div className="icon">
                <AiOutlineShopping size={19} />
                <span>3</span>
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
