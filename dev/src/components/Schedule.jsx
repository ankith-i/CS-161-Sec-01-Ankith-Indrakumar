import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaLinkedinIn, FaGithub } from 'react-icons/fa';
import developerImage from '../assets/developer.png'; // Ensure the path is correct

const linkedinUrl = 'https://www.linkedin.com/in/ankithi/';
const githubUrl = 'https://github.com/ankith-i';

const Schedule = () => {
  return (
    <>
      <section style={{ marginTop: '100px', color: 'white' }} id="Schedule">
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
            <Col xs={12} md={8} className="text-center">
              <h1 className="animate-character">Developed by Ankith Indrakumar</h1>
              <div className="social-links">
                <a href={linkedinUrl} target="_blank" rel="noopener noreferrer">
                  <FaLinkedinIn className="social-icon linkedin" size={40} />
                </a>
                <a href={githubUrl} target="_blank" rel="noopener noreferrer">
                  <FaGithub className="social-icon github" size={40} />
                </a>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Inline styles */}
      <style jsx>{`
        @keyframes float {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
          100% {
            transform: translateY(0px);
          }
        }

        .image-container {
          animation: float 3s ease-in-out infinite;
          text-align: center;
        }

        .developer-image {
          max-width: 100%;
          height: auto;
          border-radius: 15px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        }

        .animate-character {
          font-size: 2.5em;
          font-weight: bold;
          text-align: center;
          margin-bottom: 20px;
        }

        .social-links {
          display: flex;
          gap: 20px;
          align-items: center;
          justify-content: center; /* Centers the icons horizontally */
          margin-top: 20px;
        }

        .social-icon {
          width: 50px; /* Adjusted for a bigger visual */
          height: 50px;
          border-radius: 50%;
          cursor: pointer;
          background: linear-gradient(135deg, #7F00FF, #E100FF); /* Modern gradient */
          color: #fff; /* White icon inside gradient circle */
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
        }

        .social-icon.linkedin {
          background: linear-gradient(135deg, #0077b5, #0e76a8); /* LinkedIn gradient */
        }

        .social-icon.github {
          background: linear-gradient(135deg, #333, #24292e); /* GitHub gradient */
        }

        .social-icon:hover {
          transform: scale(1.2);
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.4);
        }
      `}</style>
    </>
  );
};

export default Schedule;
