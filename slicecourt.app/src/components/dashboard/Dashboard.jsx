import { useNavigate } from "react-router";
import { Card, Row, Col, Button, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { FiCalendar, FiUser } from "react-icons/fi";
import { useEffect } from "react";
import { fetchNextBooking } from "../../redux/actions/bookings";
import { format } from "date-fns";
import { it } from "date-fns/locale";
import { FaCalendarAlt, FaClock, FaMapMarkerAlt } from "react-icons/fa";

const Dashboard = () => {
  const user = useSelector((state) => state.auth.userData);
  const { nextBooking } = useSelector((state) => state.booking);
  const navigate = useNavigate();

  console.log(nextBooking);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchNextBooking());
  }, [dispatch]);

  return (
    <div className="min-vh-100 pb-4 px-2">
      <Container className="py-4">
        {/* Titolo di benvenuto */}
        <h3 className="mb-4 text-center">
          Ciao {user?.nome ?? "Utente"}, <br /> pronto per giocare?
        </h3>

        {nextBooking ? (
          <Card className="mb-4 shadow-sm border-0 slam-border">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center flex-column flex-md-row mb-3">
                {/* Parte sinistra */}
                <div className="text-center text-md-start">
                  <h5 className="fw-bold mb-3">🎾 Prossima prenotazione</h5>
                  <p className="mb-2">
                    <FaCalendarAlt className="me-2" />
                    <strong>{format(new Date(nextBooking.date), "EEEE dd MMMM", { locale: it })}</strong>
                  </p>
                  <p className="mb-2">
                    <FaClock className="me-2 " />
                    <strong>{nextBooking.startTime.slice(0, 5)}</strong>
                  </p>
                  <p className="mb-2">
                    <FaMapMarkerAlt className="me-2 " />
                    <strong>{nextBooking.courtName}</strong>
                  </p>
                  <span className="badge bg-success mt-2">Confermata</span>
                </div>

                {/* Parte destra */}
                <div className="mt-4 mt-md-0 text-center text-md-end">
                  <Button variant="primary" className="px-4">
                    Gestisci
                  </Button>
                </div>
              </div>
            </Card.Body>
          </Card>
        ) : (
          <p className="text-muted">Nessuna prenotazione imminente.</p>
        )}

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
