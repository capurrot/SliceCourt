import { useNavigate } from "react-router";
import { Card, Row, Col, Button, Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import { FiCalendar, FiUser } from "react-icons/fi";

const Dashboard = () => {
  const user = useSelector((state) => state.auth.userData);
  const navigate = useNavigate();

  return (
    <div className="min-vh-100 pb-4 px-2">
      <Container className="py-4">
        {/* Titolo di benvenuto */}
        <h3 className="mb-4 text-center">
          Ciao {user?.nome ?? "Utente"}, <br /> pronto per giocare?
        </h3>

        <Card className="mb-4 shadow-sm border-0 slam-border">
          <Card.Body>
            <div className="d-flex justify-content-between align-items-center mb-3 flex-column flex-md-row">
              <div className="text-center text-md-start">
                <h5 className="fw-bold mb-2">🎾 Prossima prenotazione</h5>
                <p className="mb-1">
                  📅 <strong>Martedì 18 Giugno</strong> - <strong>18:00</strong>
                </p>
                <p className="mb-1">
                  🏟️ <strong>Campo Coperto in sintetico</strong>
                </p>
                <span className="badge bg-success">Confermata</span>
              </div>
              <div className="mt-3 mt-md-0 text-center text-md-end">
                <Button variant="primary" className="px-4">
                  Gestisci
                </Button>
              </div>
            </div>
          </Card.Body>
        </Card>

        {/* Azioni rapide */}
        <h5 className="mb-3">⚡ Azioni rapide</h5>
        <Row className="g-3 text-center mb-4">
          <Col xs={6} md={3}>
            <Button variant="primary" className="w-100" onClick={() => navigate("/prenota")}>
              <FiCalendar className="me-2" />
              Prenota
            </Button>
          </Col>
          <Col xs={6} md={3}>
            <Button variant="primary" className="w-100" onClick={() => navigate("/profile")}>
              <FiUser className="me-2" />
              Profilo
            </Button>
          </Col>
        </Row>

        {/* Statistiche utente */}
        <h5 className="mb-3">📊 Le tue statistiche</h5>
        <Row className="g-3 text-center pb-5">
          <Col xs={6} md={3}>
            <Card className="shadow-sm border-0 slam-border">
              <Card.Body>
                <h4>12</h4>
                <p className="mb-0 text-muted">Prenotazioni</p>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={6} md={3}>
            <Card className="shadow-sm border-0 slam-border">
              <Card.Body>
                <h4>18h</h4>
                <p className="mb-0 text-muted">Ore giocate</p>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={6} md={3}>
            <Card className="shadow-sm border-0 slam-border">
              <Card.Body>
                <h4>2</h4>
                <p className="mb-0 text-muted">Campi usati</p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Dashboard;
