import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';

function CookieConsent() {
  const [showModal, setShowModal] = useState(true);

  // Fungsi untuk menutup modal dan menyimpan status perizinan cookie
  const handleClose = (e) => {
    let isAccepted = e.target.getAttribute("varian") === "primary";
    
    setShowModal(false);
    localStorage.setItem('cookieConsent', isAccepted ? 'accepted' : 'decline');
  }
  
  const hoverHandler = (e) => {
    let pos = ["fixed", "absolute", "relative"]
    const min = 10;
    const max = 50;
    const randomInteger = () => Math.floor(Math.random() * (max - min + 1)) + min;

    e.target.style.position=pos[Math.floor(Math.random() * pos.length)];
    e.target.style.top=randomInteger();
    
  }
  // Fungsi untuk menampilkan modal hanya sekali
  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (consent === 'accepted') {
      setShowModal(false);
    }
  }, []);

  return (
    <Modal show={showModal} backdrop="static" keyboard={false} centered>
      <Modal.Header>
        <Modal.Title>Pemberitahuan Cookie</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Situs web ini menggunakan cookie untuk memastikan Anda mendapatkan pengalaman terbaik. Dengan melanjutkan menggunakan situs ini, Anda menyetujui penggunaan cookie.</p>
        <ol className="">
          <p className="m-0 fw-bold">Penggunaan cookie untuk hal berikut :</p>
          <li>Kami menggunakan cookie untuk menyimpan data Al-Qur'an</li>
          <li>Kami menggunakan cookie untuk menyimpan data tema yang terakhir anda gunakan</li>
          <li>Kami menggunakan cookie untuk menyimpan data surah yang anda tandai dengan fitur <b>bookmark</b></li>
        </ol>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onMouseOver={hoverHandler} onMouseDown={hoverHandler} onMouseEnter={hoverHandler} onClick={handleClose}>
          Tutup
        </Button>
        <Button variant="primary" onClick={handleClose}>
          Terima
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CookieConsent;