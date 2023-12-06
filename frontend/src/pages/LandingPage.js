import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function LandingPage() {
  return (
    <Container fluid={true}>
       <Row className='d-flex justify-content-center align-items-center mx-5 pt-5 gx-5' data-aos="fade-up">
        <Col md={6} className='d-flex align-items-center'>
            <div data-aos="fade-up" className='d-flex flex-column justify-content-center align-items-center gx-5'>
            <h1 className='d-flex align-self-start text-dark'>
                Let's the 
                Music speak!
            </h1>
            <h5 className='text-dark'>
                Music is the universal language of mankind,
                Music brings harmony to the world.
            </h5>
            <div className='d-flex align-self-start'>
            <Link className='btn btn-danger mt-5' to="/login">
                Let's get started
            </Link>
            </div>
            </div>
        </Col>
        <Col md={6} className='d-flex justify-content-center align-items-center my-4'>
         <div data-aos="fade-up" className='d-flex justify-content-center'>
         <lottie-player src="https://lottie.host/1158ac85-417d-44e6-8f3f-6e5bbcd45a81/Htsm6B7RIj.json" background="##db8b35" speed="1" style={{width:"80%",height:"80%"}} loop autoplay></lottie-player>
         </div>
        </Col>
       </Row>
    </Container>
  )
}

export default LandingPage;