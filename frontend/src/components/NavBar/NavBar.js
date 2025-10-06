import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import logo from '../../logo.png';

export default function NavBar() {
    return(
        <>
            <Navbar className="d-flex justify-content-start">
                <Container>
                    <Navbar.Brand href="#home">
                        <img
                            src={logo}
                            width="40"
                            height="40"
                        />
                    </Navbar.Brand>
                    <Nav.Link href="#home">JavaBeans</Nav.Link>
                    <Nav.Link href="#about">About</Nav.Link>
                    <Nav.Link href="#faq">FAQ</Nav.Link>
                </Container>
            </Navbar>
        </>
    );
}