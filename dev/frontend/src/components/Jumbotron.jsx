/** @format */

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../styles/Jumbotron.css";
import gambarHome from "../assets/gambarhome.png";

export default function Jumbotron() {
  return (
    <>
      <section id='/'>
        <Container className='mt-5 mb-5'>
          <Row>
            <Col
              sm={10}
              md={6}
            >
              <h1 className='mt-5 typing-effect gradient-text'>Map Coloring Game</h1>
              <p className='mt-4 fade-effect lead gradient-text'>
              The map coloring game serves as an invaluable tool for grasping the concepts underlying graph coloring algorithms. By engaging in the interactive process of assigning colors to regions on a map such that no two adjacent regions share the same color, players intuitively delve into the core principles of graph coloring. Through gameplay, users develop an understanding of graph theory fundamentals such as vertex coloring, edge coloring, and the intricacies of graph coloring algorithms. This hands-on approach not only enhances problem-solving skills but also fosters a deeper comprehension of graph theory concepts, making it an essential resource for both beginners and seasoned enthusiasts alike.
              </p>

            </Col>

            <Col
              style={{display: "flex", justifyContent: "flex-end"}}
              md={5}
              className='text-center mt-5 fade-effect'
            >
              <img
                id='img-home'
                style={{width: "500px", height: "500px"}}
                src={gambarHome}
                alt=''
              />
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}
