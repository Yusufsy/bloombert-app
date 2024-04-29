import React from 'react';
import { Link } from 'react-router-dom';
import { Carousel } from 'react-bootstrap';
import studentEngagement from '../assets/student-engage.jpeg';
import learningOutcome from '../assets/learning-outcome.webp';
import aiTeacher from '../assets/ai-teacher.png';
import { color } from 'chart.js/helpers';

function Homepage() {
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-8 mx-auto text-center">
          <h1>Welcome to Bloom Bert</h1>
          <p className="lead">The innovative platform designed to assist educators in creating, managing, and analyzing educational tests based on Bloom's Taxonomy.</p>
          <p className="lead">Enhance your teaching tools and engage your students more effectively!</p>
          <div>
            <Link to="/register" className="btn btn-primary btn-lg" style={{marginRight: '50px'}}>Sign Up</Link>
            <Link to="/classification" className="btn btn-success btn-lg">Try the Classifier</Link>
          </div>
        </div>
      </div>
      <div className="row mt-5">
        <div className="col-md-10 mx-auto">
          <Carousel>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={aiTeacher}
                alt="First slide"
              />
              <Carousel.Caption style={carouselCaptionStyle}>
                <h3>Discover Our Features</h3>
                <p>Explore the powerful features designed to streamline your educational testing process.</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={studentEngagement}
                alt="Second slide"
              />
              <Carousel.Caption style={carouselCaptionStyle}>
                <h3>Enhance Student Engagement</h3>
                <p>Empower your students with interactive learning experiences.</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={learningOutcome}
                alt="Third slide"
              />
              <Carousel.Caption style={carouselCaptionStyle}>
                <h3>Drive Learning Outcomes</h3>
                <p>Drive educational success and achieve learning outcomes with Bloom Bert.</p>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </div>
      </div>
      <br/>
    </div>
  );
}

export default Homepage;

const carouselCaptionStyle = {
  backgroundColor: 'rgba(255, 255, 255, 0.8)', // White background with 80% opacity
  padding: '20px', // Add padding for spacing
  borderRadius: '5px', // Add border radius for rounded corners
  color: 'Black'
};
