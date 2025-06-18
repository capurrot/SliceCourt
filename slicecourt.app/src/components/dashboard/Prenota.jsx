import { Card, Row, Col, Button, Container, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { format, addDays, subDays, startOfWeek, getDay } from "date-fns";
import { it } from "date-fns/locale";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { fetchCourts } from "../../redux/actions/courts";
import { createBooking, fetchOccupiedBookings } from "../../redux/actions/bookings";

const Prenota = () => {
  const user = useSelector((state) => state.auth.userData);
  const [selectedCourt, setSelectedCourt] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [gotoBooking, setGotoBooking] = useState(false);
  const daysOfWeek = ["Lunedì", "Martedì", "Mercoledì", "Giovedì", "Venerdì", "Sabato", "Domenica"];
  const bookingRef = useRef(null);
  const courtRef = useRef(null);
  const [selectedTimes, setSelectedTimes] = useState([]);
  const duration = selectedTimes.length;
  const dispatch = useDispatch();

  const { courts, loading, error } = useSelector((state) => state.courts);
  const { occupiedBookings } = useSelector((state) => state.booking);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
    dispatch(fetchCourts());
  }, [dispatch]);

  useEffect(() => {
    if (selectedCourt && selectedDate) {
      const formattedDate = format(selectedDate, "yyyy-MM-dd");
      dispatch(fetchOccupiedBookings(selectedCourt, formattedDate));
    }
  }, [dispatch, selectedCourt, selectedDate]);

  useEffect(() => {
    if (showAlert) {
      const timer = setTimeout(() => {
        setShowAlert(false);
      }, 3000); // ⏱️ 3 secondi

      return () => clearTimeout(timer); // pulizia
    }
  }, [showAlert]);

  const timeSlots = [
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
    "21:00",
    "22:00",
  ];
  const getAvailableSlots = () => {
    if (!occupiedBookings) return timeSlots;

    const getTimeSlotsInRange = (start, end) => {
      if (!start || !end) return [];

      const startFormatted = start.slice(0, 5);
      const endFormatted = end.slice(0, 5);

      const startIndex = timeSlots.indexOf(startFormatted);
      const endIndex = timeSlots.indexOf(endFormatted);

      // ⛔️ Se endIndex è -1 (es. "22:00" non trovato), ritorna solo il primo
      if (startIndex === -1) return [];

      if (endIndex === -1) {
        return [startFormatted]; // fallback: solo lo slot iniziale
      }

      return timeSlots.slice(startIndex, endIndex); // endIndex escluso
    };

    const occupiedSlots = occupiedBookings.flatMap((b) => getTimeSlotsInRange(b.startTime, b.endTime));

    return timeSlots.filter((slot) => !occupiedSlots.includes(slot));
  };

  const availableSlots = getAvailableSlots();

  const weekStart = startOfWeek(selectedDate, { weekStartsOn: 1 });
  const weekDays = Array.from({ length: 7 }).map((_, i) => addDays(weekStart, i));
  const selectedCourtObj = courts.find((c) => c.id === selectedCourt);
  const pricePerHour = Number(selectedCourtObj?.price || 15);
  const totalPrice = duration * pricePerHour;

  const addOneHour = (timeStr) => {
    const [hours, minutes] = timeStr.split(":").map(Number);
    const date = new Date();
    date.setHours(hours + 1, minutes, 0, 0);
    return format(date, "HH:mm");
  };

  const handlePrenota = async (date, timeArray) => {
    if (!selectedCourtObj || timeArray.length === 0) return;

    const formattedDate = format(date, "yyyy-MM-dd");
    const start = timeArray[0];
    const end = addOneHour(timeArray[timeArray.length - 1]);

    const payload = {
      courtId: selectedCourtObj.id,
      userId: user?.id,
      date: formattedDate,
      startTime: parseTimeString(start),
      endTime: parseTimeString(end),
      endTimeAfterStartTime: true,
    };

    try {
      await dispatch(createBooking(payload));
      setAlertMessage("✅ Prenotazione effettuata con successo!");
      setShowAlert(true);

      const formattedDate = format(selectedDate, "yyyy-MM-dd");
      dispatch(fetchOccupiedBookings(selectedCourt, formattedDate));

      setSelectedTimes([]);
      setGotoBooking(false);
    } catch (err) {
      setAlertMessage("❌ Errore durante la prenotazione. " + err.message);
      setShowAlert(true);
    }
  };

  const parseTimeString = (timeStr) => timeStr;

  const handleCancel = () => {
    setSelectedCourt(null);
    setSelectedDate(new Date());
    setSelectedTimes([]);
    setGotoBooking(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCourt = (id) => {
    setSelectedCourt(id);
    setSelectedTimes([]);
    setTimeout(() => {
      courtRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 150);
  };

  const handleSlotClick = (time) => {
    if (!availableSlots.includes(time)) return;

    const isSelected = selectedTimes.includes(time);

    if (isSelected) {
      // Deseleziona
      setSelectedTimes(selectedTimes.filter((t) => t !== time));
    } else {
      // Ordina gli slot disponibili
      const sortedSlots = availableSlots.sort();
      const index = sortedSlots.indexOf(time);
      const prev = sortedSlots[index - 1];
      const next = sortedSlots[index + 1];

      const canSelect = selectedTimes.length === 0 || selectedTimes.includes(prev) || selectedTimes.includes(next);

      if (canSelect) {
        setSelectedTimes([...selectedTimes, time].sort());
      }

      setGotoBooking(true);
    }
  };

  return (
    <div className="min-vh-100 py-4 px-2">
      <div className="container mb-5">
        {!selectedCourt && <h3 className="mb-3 text-center">{user?.nome || "Utente"}, seleziona un campo</h3>}
        {selectedCourt && <h3 className="mb-3 text-center">{user?.nome || "Utente"}, seleziona un orario</h3>}
        {/* Selezione campo */}
        <Row className="g-4 mb-4">
          {courts.map((court) =>
            selectedCourt === null || selectedCourt === court.id ? (
              <Col xs={12} md={selectedCourt === null ? 6 : 12} key={court.id}>
                <Card
                  className="shadow-sm h-100 court-card border-0 slam-border"
                  onClick={() => handleCourt(court.id)}
                  style={{ cursor: "pointer" }}
                >
                  <Card.Img variant="top" src={court.urlImage} alt={court.name} className="court-image" />
                  <Card.Body className="text-center">
                    <Card.Title>{court.name}</Card.Title>
                  </Card.Body>
                </Card>
              </Col>
            ) : null
          )}
        </Row>
        <div ref={courtRef} />
        {/* Sezione slot visibile solo se campo selezionato */}
        {selectedCourt && (
          <>
            {/* Griglia oraria */}
            <Card className="shadow-sm slam-border">
              {/* Navigazione settimana con Oggi */}
              <div className="d-flex justify-content-between align-items-center my-3 px-2 week-nav-controls">
                <Button variant="link" onClick={() => setSelectedDate((prev) => subDays(prev, 7))}>
                  <FiChevronLeft size={20} />
                </Button>

                <Button className="btn-primary" size="sm" onClick={() => setSelectedDate(new Date())}>
                  Oggi
                </Button>

                <Button variant="link" onClick={() => setSelectedDate((prev) => addDays(prev, 7))}>
                  <FiChevronRight size={20} />
                </Button>
              </div>

              <div className="week-days d-flex justify-content-between align-items-center px-2 mb-3">
                {weekDays.map((day, i) => {
                  const isSelected = format(day, "yyyy-MM-dd") === format(selectedDate, "yyyy-MM-dd");
                  return (
                    <div
                      key={i}
                      className={`weekday-box text-center flex-fill ${isSelected ? "weekday-selected" : ""}`}
                      onClick={() => setSelectedDate(day)}
                    >
                      <div className="weekday-label">{format(day, "EEE", { locale: it }).toUpperCase()}</div>
                      <div>{format(day, "d")}</div>
                    </div>
                  );
                })}
              </div>

              <Card.Body>
                <Row xs={3} md={5} lg={6} className="g-0 justify-content-center mt-0 border-0">
                  {timeSlots.map((time, idx) => {
                    const isAvailable = availableSlots.includes(time);
                    const isSelected = selectedTimes.includes(time);

                    const isMine = occupiedBookings.some((b) => {
                      if (!b.mine || !b.startTime || !b.endTime) return false;
                      const start = b.startTime.slice(0, 5);
                      const end = b.endTime.slice(0, 5);
                      const index = timeSlots.indexOf(time);
                      const startIndex = timeSlots.indexOf(start);
                      const endIndex = timeSlots.indexOf(end);
                      // ✅ include anche endTime
                      return index >= startIndex && index < (endIndex === -1 ? startIndex + 1 : endIndex);
                    });

                    return (
                      <Col key={idx} className="my-0">
                        <div
                          className={`slot border-0 ${
                            isMine
                              ? "bg-success text-white"
                              : !isAvailable
                              ? "slot-disabled"
                              : isSelected
                              ? "slot-selected"
                              : ""
                          }`}
                          style={{ borderRadius: "0", borderSize: "1px" }}
                          onClick={() => handleSlotClick(time)}
                        >
                          <div>{time}</div>
                          {!isAvailable && isMine && (
                            <div className="text-white" style={{ fontSize: "0.8rem" }}>
                              Prenotato
                            </div>
                          )}
                          {isAvailable && !isSelected && (
                            <div className="text-muted" style={{ fontSize: "0.8rem" }}>
                              1 rimanente
                            </div>
                          )}
                          {isSelected && <div style={{ fontSize: "0.8rem" }}>1 selezionato</div>}
                        </div>
                      </Col>
                    );
                  })}
                </Row>
                {gotoBooking ? (
                  <Button
                    className="mt-3 d-flex mx-auto"
                    onClick={() => bookingRef.current?.scrollIntoView({ behavior: "smooth" })}
                  >
                    Conferma la selezione
                  </Button>
                ) : (
                  <Button
                    className="mt-3 d-flex mx-auto"
                    onClick={() => bookingRef.current?.scrollIntoView({ behavior: "smooth" })}
                  >
                    Seleziona un orario
                  </Button>
                )}
              </Card.Body>
            </Card>

            {selectedTimes.length > 0 && (
              <Card className="mt-4 shadow-sm slam-border" ref={bookingRef}>
                <Card.Body className="text-center">
                  <h5 className="mb-2">Selezionato:</h5>
                  <h5 className="mb-2">
                    <strong>{selectedCourtObj?.name}</strong>
                  </h5>
                  <h5 className="mb-2">
                    {daysOfWeek[getDay(selectedDate)]} <br />
                    <strong className="ms-2">{format(selectedDate, "dd/MM/yyyy")}</strong> <br />
                    dalle <strong>{selectedTimes[0]}</strong> alle
                    <strong className="ms-2">{addOneHour(selectedTimes[selectedTimes.length - 1])}</strong>
                  </h5>
                  <h5 className="mb-4">
                    Totale: <strong>{duration}h</strong> × <strong>{pricePerHour} €</strong> ={" "}
                    <span className="fw-bold fs-1 text-danger">{totalPrice} €</span>
                  </h5>

                  <div className="d-flex justify-content-center gap-3">
                    <Button variant="success" size="lg" onClick={() => handlePrenota(selectedDate, selectedTimes)}>
                      Prenota
                    </Button>
                    <Button variant="warning" size="lg" onClick={handleCancel}>
                      Annulla
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            )}

            {showAlert && (
              <Alert
                variant={alertMessage.startsWith("✅") ? "success" : "danger"}
                onClose={() => setShowAlert(false)}
                className="text-center mt-3"
              >
                {alertMessage}
              </Alert>
            )}
          </>
        )}
      </div>
      {loading && <p className="text-center">Caricamento campi...</p>}
      {error && <p className="text-danger text-center">{error}</p>}
      {!loading && courts.length === 0 && <p className="text-center">Nessun campo disponibile.</p>}
    </div>
  );
};

export default Prenota;
