import styled from 'styled-components';

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;

  #logo span {
    font-size: 1.8rem;
    margin-left: 10px;
    font-weight: 600;
  }

  #cart {
    position: relative;

    svg {
      margin-right: 20px;
    }
  }

  #cart div {
    background: #e60301;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    color: #fff;
    position: absolute;
    top: 0;
    right: 0;
    display: flex;
    justify-content: center;
  }

  svg {
    cursor: pointer;
  }
`;

export const Main = styled.header`
  display: grid;
  gap: 15px;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  margin: 60px 0;

  h6 {
    font-size: 16px;
  }

  .card {
    border: 2px solid #f7f7f7;
    padding: 10px;
    display: grid;
    grid-template-rows: 1fr 1fr 1fr 1fr;
    row-gap: 10px;
    max-height: 500px;

    p {
      font-size: 20px;
    }

    img {
      width: 100%;
      height: 300px;
    }

    #quantity {
      display: flex;
      justify-content: space-between;
      margin-top: 15px;
    }

    button {
      display: grid;
      grid-template-columns: 55px 1fr;
      align-items: center;
      background: #e60301;
      color: #fff;
      border: 0;
      border-radius: 5px;

      &:hover {
        transform: scale(1.01);
        box-shadow: 1px 1px 5px #111;
        color: #222;

        transition: color 0.3s;
      }

      p {
        font-size: 14px;
        font-weight: 600;
      }

      .icon {
        display: flex;
        justify-content: space-around;
        background: #d31b1b;
        padding: 10px;
        border-radius: 5px 0 0 5px;

        span {
          font-size: 16px;
        }
      }
    }
  }
`;
