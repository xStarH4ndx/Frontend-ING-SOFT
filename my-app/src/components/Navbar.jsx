import React from 'react';
import styled from 'styled-components';
import Logo from '../assets/image/logo-empresa.png';

function Navbar() {
  return (
    <NavContainer>
      <div>
        <img src={Logo} alt="Logo de la empresa" />
        <h2>English<span>WorkShop</span></h2>
      </div>
      <div>
        <a href="/">Inicio</a>
        <a href="/">Caracteristicas</a>
        <a href="/">Precios</a>
        <a href="/">Sobre Mi</a>
      </div>
      <div>
        <button>Iniciar Sesión</button>
      </div>
    </NavContainer>
  );
}

export default Navbar;

const NavContainer = styled.nav`
  background-color: #fff;
  position: sticky;
  top: 0;
  padding: 0 85px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 90px;
  box-shadow: 0 5px 80px rgba(0, 0, 0, 0.205);

  h2 {
    font-size: 2rem;
    font-weight: 400;
    span {
      font-weight: bold;
    }
  }

  a {
    font-family: 'Poppins', sans-serif;
    font-size: 1.4rem;
    color: #000000;
    position: relative;
    text-decoration: none;
    margin-right: 3rem;
    aling-items:centes;
  }

  button {
    padding: 0.5rem 0.5rem;
    font-size: 1rem;
    color: #000000;
    background-color: #fff;
    border-radius: 9px;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  button:hover {
    background-color: #000000;
    color: #fff;
  }

  img {
    width: 100%;
    display: felx;
    max-width: 70px;
  }

  div:first-child {
    display: flex;
    align-items: center;
  }
`