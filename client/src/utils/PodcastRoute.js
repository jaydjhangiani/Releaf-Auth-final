import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import db from "../assets/firebase";
import PodContext from "../context/PodContext";
import axios from "axios";
import Loader from "../components/Loading";
import PlayerScreen from "../screens/PlayerScreen";
const PodcastRoute = ({ history, location }) => {
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [nextSongIndex, setNextSongIndex] = useState(currentSongIndex + 1);
  const [podcastRSS, setPodcastRSS] = useState(null);
  const { getPodcast } = useContext(PodContext);

  let { id } = useParams();
  let { eid } = useParams();

  useEffect(() => {
    if (location.state) {
      setCurrentSongIndex(location.state.currentSongIndex);
      setNextSongIndex(location.state.currentSongIndex + 1);
    }
  }, [location.state, history]);

  useEffect(() => {
    if (!location.state) {
      db.collection("podcasts")
        .where("redirect", "==", id)
        .onSnapshot((snapshot) =>
          setPodcastRSS(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          )
        );
    }
  }, [id]);

  useEffect(() => {
    async function getPodcastData() {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };
      if (podcastRSS) {
        try {
          console.log(podcastRSS[0].data.rss);
          const rss = { rss: `${podcastRSS[0].data.rss}` };
          let res = await axios.post(
            `${process.env.REACT_APP_URI}/api/rss/`,
            rss,
            config
          );
          getPodcast(res.data);
          // let index = res.data.length - eid
          setCurrentSongIndex(res.data.length - eid);
          console.log(currentSongIndex);
        } catch (err) {
          console.log(err);
        }
      }
    }
    getPodcastData();
  }, [podcastRSS]);

  // console.log(currentSongIndex)

  return (
    <div>
      {currentSongIndex >= 0 ? (
        <PlayerScreen
          currentSongIndex={currentSongIndex}
          nextSongIndex={nextSongIndex}
          setCurrentSongIndex={setCurrentSongIndex}
          setNextSongIndex={setNextSongIndex}
        />
      ) : (
        // <Player currentSongIndex={currentSongIndex} nextSongIndex={nextSongIndex} setCurrentSongIndex={setCurrentSongIndex} setNextSongIndex={setNextSongIndex}/>
        <>
          <Loader />
        </>
      )}
    </div>
  );
};

export default PodcastRoute;
