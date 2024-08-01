import Main from "./components/Main";
import SideBar from "./components/SideBar";
import Footer from "./components/Footer";
import { useEffect, useState } from "react";

export default function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  function handleToggleModal() {
    setShowModal(!showModal);
  }
  useEffect(() => {
    function fetchData() {
      const API_KEY = import.meta.env.VITE_NASA_API_KEY;
      const URL = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`;
      fetch(URL)
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          setData(res);
          console.log(res);
        })
        .catch((rej) => console.log(rej));
    }
    fetchData();
  }, []);

  return (
    <>
      {data ? (
        <Main data={data} />
      ) : (
        <div className="loadingState">
          <i className="fa-solid fa-gear"></i>
        </div>
      )}
      {showModal && (
        <SideBar data={data} handleToggleModal={handleToggleModal} />
      )}
      {data && <Footer data={data} handleToggleModal={handleToggleModal} />}
    </>
  );
}
