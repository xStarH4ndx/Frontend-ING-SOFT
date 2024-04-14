import React from 'react'
import styled from 'styled-components'

function Navbar() {
  return (
    <div>
      <NavContainer>
        <h2>English<span>WorkShop</span></h2>
      </NavContainer>
    </div>
  )
}

export default Navbar

const NavContainer = styled.nav`
    h2{
        font-weight: 400;
        span{
            font-weight: bold;
        }
    }
    background-color: #fff;
    position: sticky;
    top: 0;
    padding: 0 85px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 80px;
    box-shadow: 0 5px 80px rgba(0, 0, 0, 0.205);
`