import { Card, Row, Col, Button, Form, Container, ListGroup } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useState } from "react";

const Profile = () => {
  const user = useSelector((state) => state.auth.user);
  // const dispatch = useDispatch(); // futuro salvataggio lato store/backend

  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [credits, setCredits] = useState(user?.credits || 0);
  const [editMode, setEditMode] = useState(false);

  const handleSave = () => {
    console.log("Dati salvati:", { name, email, phone });
    setEditMode(false);
    // dispatch(updateProfile({ name, email, phone }))
  };

  return (
    <div className="min-vh-100 px-2">
      <Container className="py-4">
        <h3 className="mb-4 text-center">Ciao {name || "Utente"}, pronto per giocare?</h3>

        {/* Avatar e info utente */}
        <Card className="shadow-sm mb-4">
          <Card.Body>
            <Row className="align-items-center">
              <Col xs={3} md={2}>
                <img
                  src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                    name || "Utente"
                  )}&background=007bff&color=fff&rounded=true&size=128&length=2`}
                  alt={`Avatar di ${name || "Utente"}`}
                  className="img-fluid rounded-circle"
                />
              </Col>
              <Col>
                {editMode ? (
                  <Form>
                    <Form.Group className="mb-2">
                      <Form.Label>Nome</Form.Label>
                      <Form.Control value={name} onChange={(e) => setName(e.target.value)} />
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
                    <h4 className="mb-1">{name}</h4>
                    <p className="mb-1 text-muted">{email}</p>
                    {phone && <p className="mb-1 text-muted">📞 {phone}</p>}
                    <Button variant="outline-primary" size="sm" className="mt-2" onClick={() => setEditMode(true)}>
                      Modifica profilo
                    </Button>
                  </>
                )}
              </Col>
            </Row>
          </Card.Body>
        </Card>

        {/* Crediti utente */}
        <Card className="shadow-sm mb-4 border-info">
          <Card.Body className="text-center">
            <h5>💰 Crediti disponibili</h5>
            <h3 className="text-primary fw-bold">{credits}</h3>
            <p className="text-muted mb-0">Usali per prenotare i campi o acquistare abbonamenti.</p>
          </Card.Body>
        </Card>

        {/* Dati utente aggiuntivi */}
        <Card className="shadow-sm">
          <Card.Header className="fw-bold">📋 Dettagli account</Card.Header>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <strong>Nome:</strong> {name}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Email:</strong> {email}
            </ListGroup.Item>
            {phone && (
              <ListGroup.Item>
                <strong>Telefono:</strong> {phone}
              </ListGroup.Item>
            )}
            <ListGroup.Item>
              <strong>Ruolo:</strong> {user?.role || "Giocatore"}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Data registrazione:</strong>{" "}
              {user?.registeredAt ? new Date(user.registeredAt).toLocaleDateString() : "N/D"}
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Container>
    </div>
  );
};

export default Profile;
