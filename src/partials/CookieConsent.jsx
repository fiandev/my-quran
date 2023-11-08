import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";

function CookieConsent() {
  const [showModal, setShowModal] = useState(true);

  // Fungsi untuk menutup modal dan menyimpan status perizinan cookie
  const handleClose = (e, isAccepted) => {
    setShowModal(false);
    localStorage.setItem("cookieConsent", isAccepted ? "accepted" : "decline");
  };

  // Fungsi untuk menampilkan modal hanya sekali
  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");
    if (consent === "accepted") {
      setShowModal(false);
    }
  }, []);

  return (
    <Modal show={showModal} backdrop="static" keyboard={false} centered>
      <Modal.Header>
        <Modal.Title>
          <span className="text-modal">Pemberitahuan Cookie</span>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="text-modal">
          Situs web ini menggunakan cookie untuk memastikan Anda mendapatkan
          pengalaman terbaik. Dengan melanjutkan menggunakan situs ini, Anda
          menyetujui penggunaan cookie.
        </p>
        <ol className="text-modal">
          <p className="m-0 fw-bold">Penggunaan cookie untuk hal berikut :</p>
          <li>Kami menggunakan cookie untuk menyimpan data Al-Qur'an</li>
          <li>
            Kami menggunakan cookie untuk menyimpan data tema yang terakhir anda
            gunakan
          </li>
          <li>
            Kami menggunakan cookie untuk menyimpan data surah yang anda tandai
            dengan fitur <b>bookmark</b>
          </li>
        </ol>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={(e) => handleClose(e, false)}>
          Tutup
        </Button>
        <Button variant="primary" onClick={(e) => handleClose(e, true)}>
          Terima
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CookieConsent;
