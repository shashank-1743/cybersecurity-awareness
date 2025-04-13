import React, { useState, useRef } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { motion, useInView } from 'framer-motion';
import NavigationBar from '../components/Navbar';
import Footer from '../components/Footer';
import { FaUpload, FaExclamationTriangle } from 'react-icons/fa';

function HaveProblem() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false });
  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    incidentDate: '',
    incidentTime: '',
    city: '',
    state: '',
    incidentType: 'Online Fraud',
    description: '',
    evidence: null,
    consent: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [fileError, setFileError] = useState('');
  const [uploadStatus, setUploadStatus] = useState('');
  const fileInputRef = useRef(null);

  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB in bytes
  const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png', 'application/pdf'];

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1 }
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    setFileError('');
    setUploadStatus('');

    if (!file) return;

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      setFileError('File size exceeds 5MB limit');
      fileInputRef.current.value = '';
      return;
    }

    // Validate file type
    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      setFileError('Only JPG, PNG, and PDF files are allowed');
      fileInputRef.current.value = '';
      return;
    }

    // File is valid
    setFormData({ ...formData, evidence: file });
    setUploadStatus('File selected successfully');
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const file = e.dataTransfer.files[0];
    if (file) {
      const fakeEvent = { target: { files: [file] } };
      handleFileUpload(fakeEvent);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }

    setValidated(true);
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setSubmitSuccess(true);

    // Reset form after 3 seconds
    setTimeout(() => {
      setSubmitSuccess(false);
      setValidated(false);
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        incidentDate: '',
        incidentTime: '',
        city: '',
        state: '',
        incidentType: 'Online Fraud',
        description: '',
        evidence: null,
        consent: false
      });
    }, 3000);
  };

  return (
    <>
      <NavigationBar />
      
      {/* Hero Section */}
      <div className="overview-hero position-relative" ref={ref}>
        <div 
          className="hero-background"
          style={{
            backgroundImage: `url('/cyber.jpg')`,
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.3,
            zIndex: 1
          }}
        />
        <Container className="position-relative" style={{ zIndex: 2 }}>
          <Row className="align-items-center min-vh-75">
            <Col lg={10} className="mx-auto text-center text-white">
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                transition={{ duration: 1, delay: 0.2 }}
              >
                <h1 className="display-4 fw-bold mb-4">
                  Report a Cybercrime Incident
                </h1>
                <p className="lead mb-4">
                  Fill out this form to report any cyber incident you've experienced. We'll help guide you through the process.
                </p>
              </motion.div>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Main Content */}
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col lg={8}>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <div className="bg-light p-4 p-lg-5 rounded-3 shadow-sm">
                <h2 className="mb-4">Incident Report Form</h2>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                  <Row>
                    <Col md={12}>
                      <Form.Group className="mb-4">
                        <Form.Label>Full Name <span className="text-danger">*</span></Form.Label>
                        <Form.Control 
                          type="text"
                          required
                          value={formData.fullName}
                          onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                          placeholder="Enter your full name"
                        />
                        <Form.Control.Feedback type="invalid">
                          Please provide your full name.
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-4">
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control 
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          placeholder="Enter your email"
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-4">
                        <Form.Label>Phone Number (Optional)</Form.Label>
                        <Form.Control 
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
                          placeholder="Enter your phone number"
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-4">
                        <Form.Label>Date of Incident</Form.Label>
                        <Form.Control 
                          type="date"
                          required
                          value={formData.incidentDate}
                          onChange={(e) => setFormData({...formData, incidentDate: e.target.value})}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-4">
                        <Form.Label>Time of Incident</Form.Label>
                        <Form.Control 
                          type="time"
                          required
                          value={formData.incidentTime}
                          onChange={(e) => setFormData({...formData, incidentTime: e.target.value})}
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-4">
                        <Form.Label>City <span className="text-danger">*</span></Form.Label>
                        <Form.Control 
                          type="text"
                          required
                          value={formData.city}
                          onChange={(e) => setFormData({...formData, city: e.target.value})}
                          placeholder="Enter city name"
                        />
                        <Form.Control.Feedback type="invalid">
                          Please provide your city.
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-4">
                        <Form.Label>State <span className="text-danger">*</span></Form.Label>
                        <Form.Control 
                          type="text"
                          required
                          value={formData.state}
                          onChange={(e) => setFormData({...formData, state: e.target.value})}
                          placeholder="Enter state name"
                        />
                        <Form.Control.Feedback type="invalid">
                          Please provide your state.
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Form.Group className="mb-4">
                    <Form.Label>Type of Incident</Form.Label>
                    <Form.Select
                      required
                      value={formData.incidentType}
                      onChange={(e) => setFormData({...formData, incidentType: e.target.value})}
                    >
                      <option>Online Fraud</option>
                      <option>Cyberbullying</option>
                      <option>Identity Theft</option>
                      <option>Hacking</option>
                      <option>Financial Fraud</option>
                      <option>Social Media Crime</option>
                      <option>Other</option>
                    </Form.Select>
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label>Detailed Description</Form.Label>
                    <Form.Control 
                      as="textarea" 
                      rows={5}
                      required
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      placeholder="Please provide a detailed description of the incident..."
                    />
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label>Upload Evidence</Form.Label>
                    <div 
                      className={`upload-box p-3 border rounded text-center ${fileError ? 'border-danger' : ''}`}
                      onDragOver={handleDragOver}
                      onDrop={handleDrop}
                      onClick={() => fileInputRef.current.click()}
                      style={{ 
                        cursor: 'pointer',
                        background: fileError ? 'rgba(255,0,0,0.05)' : '#f8f9fa',
                        transition: 'all 0.3s ease'
                      }}
                    >
                      <FaUpload size={24} className={fileError ? 'text-danger' : 'text-primary'} />
                      <Form.Control 
                        type="file"
                        onChange={handleFileUpload}
                        className="d-none"
                        id="file-upload"
                        ref={fileInputRef}
                        accept=".jpg,.jpeg,.png,.pdf"
                      />
                      <div className="mt-2">
                        {formData.evidence ? (
                          <div className="text-success">
                            Selected: {formData.evidence.name}
                          </div>
                        ) : (
                          'Click to upload or drag and drop'
                        )}
                      </div>
                      <p className="text-muted small mb-0">
                        Supports: JPG, PNG, PDF (Max size: 5MB)
                      </p>
                      {fileError && (
                        <div className="text-danger small mt-2">
                          <FaExclamationTriangle className="me-1" />
                          {fileError}
                        </div>
                      )}
                      {uploadStatus && !fileError && (
                        <div className="text-success small mt-2">
                          ✓ {uploadStatus}
                        </div>
                      )}
                    </div>
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Check
                      type="checkbox"
                      id="consent-checkbox"
                      required
                      checked={formData.consent}
                      onChange={(e) => setFormData({...formData, consent: e.target.checked})}
                      label={<>I consent to sharing this information with authorized authorities <span className="text-danger">*</span></>}
                    />
                    <Form.Control.Feedback type="invalid">
                      You must agree before submitting.
                    </Form.Control.Feedback>
                  </Form.Group>

                  <div className="mb-3">
                    <small className="text-muted">
                      Fields marked with <span className="text-danger">*</span> are required
                    </small>
                  </div>

                  <div className="d-grid">
                    <Button 
                      type="submit" 
                      variant="primary" 
                      size="lg"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Submitting...' : submitSuccess ? 'Report Submitted!' : 'Submit Report'}
                    </Button>
                  </div>

                  {submitSuccess && (
                    <div className="alert alert-success mt-3">
                      Your report has been submitted successfully. We will review it and get back to you soon.
                    </div>
                  )}
                </Form>
              </div>
            </motion.div>
          </Col>

          {/* Emergency Contact Sidebar */}
          <Col lg={4}>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <div className="bg-danger text-white p-4 rounded-3 mb-4">
                <h3 className="mb-4">Emergency Contacts</h3>
                <ul className="list-unstyled">
                  <li className="mb-3">
                    <strong>Cyber Crime Helpline:</strong><br />
                    <a href="tel:1930" className="text-white text-decoration-none">
                      1930
                    </a>
                  </li>
                  <li className="mb-3">
                    <strong>Women's Helpline:</strong><br />
                    <a href="tel:1091" className="text-white text-decoration-none">
                      1091
                    </a>
                  </li>
                  <li>
                    <strong>Online Portal:</strong><br />
                    <a 
                      href="https://cybercrime.gov.in" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-white text-decoration-none"
                    >
                      cybercrime.gov.in
                    </a>
                  </li>
                </ul>
              </div>

              <div className="bg-light p-4 rounded-3">
                <h4 className="mb-3">Important Notes:</h4>
                <ul className="list-unstyled">
                  <li className="mb-3 d-flex">
                    <span className="text-primary me-2">✔</span>
                    <span>Provide accurate and detailed information</span>
                  </li>
                  <li className="mb-3 d-flex">
                    <span className="text-primary me-2">✔</span>
                    <span>Include any relevant screenshots or evidence</span>
                  </li>
                  <li className="mb-3 d-flex">
                    <span className="text-primary me-2">✔</span>
                    <span>For immediate assistance, call the helpline</span>
                  </li>
                  <li className="d-flex">
                    <span className="text-primary me-2">✔</span>
                    <span>Your information will be kept confidential</span>
                  </li>
                </ul>
              </div>
            </motion.div>
          </Col>
        </Row>
      </Container>

      <Footer />
    </>
  );
}

export default HaveProblem;