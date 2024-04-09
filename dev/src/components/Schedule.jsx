import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaLinkedin, FaGithub } from 'react-icons/fa';
import developerImage from '../assets/developer.png'; // Ensure the path is correct

const Schedule = () => {
  const linkedinUrl = 'https://www.linkedin.com/in/ankith-indrakumar/';
  const githubUrl = 'https://github.com/ankith-i';

  return (
    <>
      <section style={{ marginTop: '150px', color: 'white' }} id="Schedule">
        <Container>
          <Row className="align-items-center">
            <Col xs={12} md={4} className="mb-3 mb-md-0">
              <div className="image-container">
                <img
                  src={developerImage}
                  alt="Developer Ankith Indrakumar"
                  className="developer-image"
                />
              </div>
            </Col>
            <Col xs={12} md={8}>
              <h1 className="animate-character">Developed by Ankith Indrakumar</h1>
              <div className="social-links">
                <a href={linkedinUrl} target="_blank" rel="noopener noreferrer" className="linkedin-icon">
                  <FaLinkedin size={40} />
                </a>
                <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="github-icon">
                  <FaGithub size={40} />
                </a>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Inline styles for animations and CSS */}
      <style jsx>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
          100% { transform: translateY(0px); }
        }

        .image-container {
          animation: float 3s ease-in-out infinite;
        }

        .developer-image {
          max-width: 100%;
          height: auto;
          display: block; /* Ensures the image is block level */
        }

        .social-links {
          display: flex;
          justify-content: center;
          gap: 20px;
          margin-top: 20px;
        }

        .social-links a {
          color: #fff; /* White icons */
          transition: color 0.3s ease;
        }

        .social-links a:hover {
          color: #0077b5; /* LinkedIn blue for hover state */
        }

        .linkedin-icon:hover {
          color: #0e76a8; /* A darker LinkedIn blue for hover state */
        }

        .github-icon:hover {
          color: #333; /* A dark grey color for hover state */
        }

        .animate-character {
          /* Your existing animation and styles for the text */
        }
      `}</style>
    </>
  );
};

export default Schedule;
