import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div
      id="home"
      className="container d-flex flex-column gap-2 justify-content-center"
    >
      <Link className="nav-link rounded text-center" to="/alquran">
        baca qur'an
      </Link>
      <Link className="nav-link rounded text-center" to="/schedule">
        jadwal sholat
      </Link>
    </div>
  );
};

export default Home;
