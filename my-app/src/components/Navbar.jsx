import React from 'react'
import styled from 'styled-components'

function Navbar() {
  return (
    <div>
      <NavContainer>
        <h2>English<span>WorkShop</span></h2>
        <div>
          <a href="/">Inicio</a>
          <a href="/">Caracteristicas</a>
          <a href="/">Precios</a>
          <a href="/">Sobre Mi</a>

          <button>Sing up</button>
        </div>
      </NavContainer>
    </div>
  )
}

export default Navbar

const NavContainer = styled.nav`
background-color: #fff;
position: sticky;
top: 0;
padding: 0 85px;
display: flex;
align-items: center;
justify-content: space-between;
height: 80px;
box-shadow: 0 5px 80px rgba(0, 0, 0, 0.205);

h2{
    font-weight: 400;
    span{
        font-weight: bold;
    }
}

a{
  font-family: 'Poppins', sans-serif;
  color: #000000;
  position: relative;
  text-decoration: none;
  margin-right: 1rem;
}

button{
  padding: 0.5rem 0.5rem;
  font-size: 0.7rem;
  color: #000000;
  background-color: #fff;
  border-radius: 9px;
  cursor: pointer;
  transition: all 0.3s ease;
}

button:hover{
  background-color: #000000;
  color: #fff
}
`