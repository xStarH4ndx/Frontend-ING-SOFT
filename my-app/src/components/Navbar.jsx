import React, {useState} from 'react';
import styled from 'styled-components';
import Logo from '../assets/image/logo-empresa.png';
import BurgerButton from './BurgerButton';

function Navbar() {

  const [clicked, setClicked] = useState(false)
  const handleClick = () =>{
    //cuando está true lo pasa a false y vice versa
    setClicked(!clicked)
  }
  return (
    <NavContainer>
      <div>
        <img src={Logo} alt="Logo de la empresa" />
        <h2>English<span>WorkShop</span></h2>
      </div>
      <div className={`links ${clicked ? 'active' :''} `}>
        <a href="/">Inicio</a>
        <a href="/">Caracteristicas</a>
        <a href="/">Precios</a>
        <a href="/">Sobre Mi</a>
        <button>Iniciar Sesión</button>
      </div>
      <div className='burger'>
        <BurgerButton clicked={clicked} handleClick={handleClick}/>
      </div>
      <BgDiv className={`initial ${clicked ? 'active' : ''}`}></BgDiv>
    </NavContainer>
  );
}

export default Navbar;

const BgDiv = styled.div`
  background-color: #17ed;
  position: absolute;
  top: -700px;
  left: -2000;
  transition:all 0.6s ease;
  z-index: -1;
  &.active{
    top: 0;
    left: 0;
    width: 100%;
    margin-top:5.63rem;
    height: 300%;
    z-index: -1;
  }
`

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
    font-size: 1.8rem;
    font-weight: 400;
    span {
      font-weight: bold;
    }
  }

  a {
    font-family: 'Poppins', sans-serif;
    font-size: 1rem;
    color: #000000;
    position: relative;
    text-decoration: none;
    margin-right: 3rem;
    align-items:center;
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
  //193
  img {
    width: 100%;
    display: felx;
    max-width: 50px;
    margin-left: -30px;
  }

  div:first-child {
    display: flex;
    align-items: center;
  }

  .links{
    position: absolute;
    top: -700px;
    left: -2000px;
    right: 0;
    margin-left: auto;
    margin-right: auto;
    text-align: center;
    transition: all 0.5s ease;
    a{
      display: block;
    }

    @media(min-width:1190px){
      position: initial;
      margin: 0;
      a{
        display: inline;
      }
      display: block;
    }
  }

  .links.active{
    width: 100%;
    display: block;
    position: absolute;
    margin-left: auto;
    margin-right: auto;
    top: 100%;
    left: 0;
    right: 0;
    text-align: center;
    a{
      font-weight: bold;
      margin-left:0;
      margin-right:0;
      margin-top:1rem;
    }
    button{
      margin-top:1rem;
    }
  }

  .burger{
    margin-left: 100px;
    @media(min-width:1190px){
      display: none;
    }
  }
`