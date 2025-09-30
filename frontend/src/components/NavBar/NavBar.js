import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

export default function NavBar() {
    return(
        <>
            <Navbar className="d-flex justify-content-start">
                <Container>
                    <Navbar.Brand href="#home">Navbar</Navbar.Brand>
                    <Nav.Link href="#home">JavaBeans</Nav.Link>
                    <Nav.Link href="#about">About</Nav.Link>
                    <Nav.Link href="#faq">FAQ</Nav.Link>
                </Container>
            </Navbar>
        </>
    );
}