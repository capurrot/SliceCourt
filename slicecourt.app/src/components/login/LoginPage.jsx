import { useEffect, useState } from "react";
import { Container, Card, Form, Button, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../redux/actions/login";
import { clearError } from "../../redux/reducers/authSlice";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error } = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => dispatch(clearError()), 5000);
      return () => clearTimeout(timer);
    }
  }, [error, dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await dispatch(loginUser(email, password));
      navigate("/dashboard");
    } catch (err) {
      console.error("Errore durante il login:", err);
      // niente setErrorMessage
    }
  };

  return (
    <Container fluid className="login-bg d-flex align-items-center justify-content-center vh-100">
      <div className="overlay"></div>
      <Card
        className="p-4 shadow-lg text-center position-relative"
        style={{
          maxWidth: "400px",
          width: "100%",
          background: "rgba(255, 255, 255, 0.8)",
        }}
      >
        <Card.Body>
          <img
            src="/images/logo.png"
            alt="SliceCourt Logo"
            className="mb-4"
            style={{ height: "100px", objectFit: "contain" }}
          />
          <Card.Title className="mb-4 fs-3 fw-bold">Accedi</Card.Title>

          {error && (
            <Alert variant="danger" dismissible>
              {error}
            </Alert>
          )}

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

            <Button type="submit" variant="primary" className="w-100 fw-semibold" disabled={loading}>
              {loading ? "Attendi..." : "Entra"}
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default LoginPage;
