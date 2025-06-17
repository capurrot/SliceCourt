// src/pages/LoginPage.jsx
import { useState } from "react";
import { Container, Card, Form, Button } from "react-bootstrap";
const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login:", { email, password });
  };

  return (
    <Container fluid className="login-bg d-flex align-items-center justify-content-center vh-100">
      <div className="overlay"></div>
      <Card
        className="p-4 shadow-lg text-center position-relative"
        style={{ maxWidth: "400px", width: "100%", background: "rgba(255, 255, 255, 0.8)" }}
      >
        <Card.Body>
          <img
            src="/images/logo.png"
            alt="SliceCourt Logo"
            className="mb-4"
            style={{ height: "100px", objectFit: "contain" }}
          />
          <Card.Title className="mb-4 fs-3 fw-bold">Accedi</Card.Title>

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3 text-start" controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Inserisci la tua email"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-4 text-start" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Inserisci la tua password"
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Button type="submit" variant="primary" className="w-100 fw-semibold">
              Entra
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default LoginPage;
