import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import logo from '../../logo.png';

export default function NavBar() {
    return(
        <>
            <Navbar className="d-flex justify-content-start">
                <Container>
                    <Navbar.Brand as={Link} to="/">
                        <img
                            src={logo}
                            width="45"
                            height="45"
                        />
                        JavaBeans
                    </Navbar.Brand>
                    <Nav.Link as={Link} to="/about">About</Nav.Link>
                    <Nav.Link as={Link} to="/faq">FAQ</Nav.Link>
                </Container>
            </Navbar>
        </>
    );
}