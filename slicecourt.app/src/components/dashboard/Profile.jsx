import { Card, Row, Col, Button, Form, Container, ListGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { BiEnvelope, BiPhone, BiMap, BiBadge, BiCalendarCheck, BiHistory, BiEuro } from "react-icons/bi";
import { FaCoins } from "react-icons/fa";
import { setSlamTheme } from "../../redux/reducers/themeSlice";

const Profile = () => {
  const user = useSelector((state) => state.auth.userData);

  const [nome, setNome] = useState(user?.nome || "");
  const [cognome, setCognome] = useState(user?.cognome || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [credits, setCredits] = useState(user?.credits || 0);
  const [editMode, setEditMode] = useState(false);
  const dispatch = useDispatch();

  const themes = [
    {
      label: "Wimbledon",
      variant: "outline-success",
      logo: "../../../public/images/wimbledon_logo.png",
      value: "theme-wimbledon",
    },
    {
      label: "Roland Garros",
      variant: "outline-warning",
      logo: "../../../public/images/rolandgarros_logo.png",
      value: "theme-rolandgarros",
    },
    {
      label: "US Open",
      variant: "outline-primary",
      logo: "../../../public/images/usopen_logo.svg",
      value: "theme-usopen",
    },
    {
      label: "Australian Open",
      variant: "outline-info",
      logo: "../../../public/images/australian_logo.png",
      value: "theme-australian",
    },
  ];

  const handleSave = () => {
    console.log("Dati salvati:", { nome, cognome, email, phone });
    setEditMode(false);
    // dispatch(updateProfile({ name, email, phone }))
  };

  return (
    <div className="min-vh-100 px-2">
      <Container className="py-4">
        {/* Profilo completo */}
        <Card className="shadow-sm mb-4">
          <Card.Body>
            <Row>
              {/* Avatar */}
              <Col xs={12} md={3} className="text-center mb-3">
                <img
                  src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                    nome + " " + cognome || "Utente"
                  )}&background=007bff&color=fff&rounded=true&size=128&length=2`}
                  alt={`Avatar di ${nome + " " + cognome || "Utente"}`}
                  className="img-fluid rounded-circle"
                />
              </Col>

              {/* Dati profilo */}
              <Col>
                {editMode ? (
                  <Form>
                    <Form.Group className="mb-2">
                      <Form.Label>Nome</Form.Label>
                      <Form.Control value={nome} onChange={(e) => setNome(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-2">
                      <Form.Label>Cognome</Form.Label>
                      <Form.Control value={nome} onChange={(e) => setCognome(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-2">
                      <Form.Label>Email</Form.Label>
                      <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Telefono</Form.Label>
                      <Form.Control type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
                    </Form.Group>
                    <Button variant="primary" onClick={handleSave}>
                      Salva modifiche
                    </Button>
                  </Form>
                ) : (
                  <>
                    <h4 className="mb-2">{nome + " " + cognome}</h4>
                    <p className="text-muted">
                      <BiEnvelope className="me-2" />
                      {email}
                    </p>
                    {phone && (
                      <p className="text-muted">
                        <BiPhone className="me-2" />
                        {phone}
                      </p>
                    )}
                    <p className="mb-2">
                      <BiMap className="me-2" />
                      <strong className="text-primary">{user?.address || "N/D"}</strong>
                    </p>
                    <p className="mb-2">
                      <BiBadge className="me-2" />
                      <span className="badge bg-info text-dark">
                        {user?.roles?.includes("ROLE_ADMIN")
                          ? "Amministratore"
                          : user?.roles?.includes("ROLE_OWNER")
                          ? "Gestore"
                          : user?.roles?.includes("ROLE_USER")
                          ? "Utente"
                          : "N/D"}
                      </span>
                    </p>
                    <p className="mb-2">
                      <BiCalendarCheck className="me-2" />
                      Registrato il:{" "}
                      <strong>{user?.registeredAt ? new Date(user.registeredAt).toLocaleString() : "N/D"}</strong>
                    </p>
                    <p className="mb-2">
                      <BiHistory className="me-2" />
                      Ultimo accesso:{" "}
                      <strong>{user?.lastLogin ? new Date(user.lastLogin).toLocaleString() : "N/D"}</strong>
                    </p>
                    <Button variant="outline-primary" size="sm" onClick={() => setEditMode(true)}>
                      Modifica profilo
                    </Button>
                  </>
                )}
              </Col>
            </Row>
          </Card.Body>
        </Card>
        <Card className="shadow-sm mb-4">
          <Card.Body className="text-center">
            <FaCoins size={40} className="text-warning mb-2" />
            <h5 className="fw-bold">Crediti disponibili</h5>
            <h3 className="text-success fw-bold">{credits}</h3>
            <p className="text-muted mb-0">Usali per prenotare i campi o acquistare abbonamenti.</p>
          </Card.Body>
        </Card>
        <Card className="shadow-sm mb-5 border-info">
          <Card.Body>
            <h5 className="fw-bold text-center mb-3">🎾 Seleziona il tuo torneo preferito</h5>
            <Row className="g-3 text-center">
              {themes.map((theme, idx) => (
                <Col xs={6} md={3} key={idx}>
                  <div className="d-grid h-100">
                    <Button
                      className={`w-100 h-100 py-3 d-flex flex-column align-items-center justify-content-center ${theme.value}`}
                      style={{ minHeight: "100px", height: "40px" }}
                      onClick={() => dispatch(setSlamTheme(theme.value))}
                    >
                      <img src={theme.logo} alt={theme.label} style={{ height: "40px", marginBottom: "0.5rem" }} />
                      <span className="text-white">{theme.label}</span>
                    </Button>
                  </div>
                </Col>
              ))}
            </Row>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default Profile;
