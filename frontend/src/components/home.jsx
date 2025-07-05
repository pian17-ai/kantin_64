import React from 'react'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const home = () => {
  return (
    <>
        <header className='shadow'>
            <div className='bg-dark text-center py-3'>
                <span className='text-white'>Jajanan SMK Negeri 64</span>
            </div>

            <div className='container'>

            <Navbar expand="lg" className="bg-body-tertiary">
        <Navbar.Brand href="#">Navbar scroll</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link href="#action1">Produk Kami</Nav.Link>
            <Nav.Link href="#action2">Makanan</Nav.Link>
            <Nav.Link href="#action3">Minuman</Nav.Link>
            <Nav.Link href="#" disabled>
              Link
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
    </Navbar>

            </div>
        </header>
    </>
  )
}

export default home