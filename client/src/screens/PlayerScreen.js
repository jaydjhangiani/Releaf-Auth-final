import { useContext, useEffect, useRef, useState } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import PlayerDetails from "../components/player/PlayerDetails";
import PlayerControls from "../components/player/PlayerControls";
import Slider from "../components/player/Slider";
import PodContext from "../context/PodContext";
import EpisodeDescription from "../components/player/EpisodeDescription";
import Loader from "../components/Loading";
import styled from "styled-components";
import axios from "axios";
import db from "../assets/firebase";

const Player = ({
  currentSongIndex,
  nextSongIndex,
  setCurrentSongIndex,
  setNextSongIndex,
}) => {
  const audioEl = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [percentage, setPercentage] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const { getPodcast, podcast } = useContext(PodContext);
  const [podcastRSS, setPodcastRSS] = useState(null);

  const { id } = useParams();
  const { eid } = useParams();

  const history = useHistory();
  console.log(id, eid);

  const onChange = (e) => {
    const audio = audioEl.current;
    audio.currentTime = (audio.duration / 100) * e.target.value;
    setPercentage(e.target.value);
  };

  const SkipSong = (forwards = true) => {
    if (forwards) {
      setCurrentSongIndex(() => {
        let temp = currentSongIndex;
        temp++;
        console.log(temp);
        if (temp > podcast.length - 1) {
          temp = 0;
          // console.log('forward')
        }
        //console.log(temp)
        let eid = podcast.length - temp;
        history.push(`/user/podcast/${id}/episode/${eid}`);
        return temp;
      });
      setNextSongIndex(() => {
        let temp = nextSongIndex;
        temp++;
        if (temp > podcast.length - 2) {
          temp = 0;
          // console.log('forward')
        }
        //console.log(temp)
        return temp;
      });
    } else {
      setCurrentSongIndex(() => {
        let temp = currentSongIndex;
        temp--;

        if (temp < 0) {
          temp = podcast.length - 1;
        }
        console.log(temp);
        let eid = podcast.length - temp;
        history.push(`/user/podcast/${id}/episode/${eid}`);
        return temp;
      });
      setNextSongIndex(() => {
        let temp = nextSongIndex;
        temp--;

        if (temp < -1) {
          temp = podcast.length - 1;
        }
        return temp;
      });
    }

    // setNextSongIndex( currentSongIndex + 1)
  };

  const getCurrDuration = (e) => {
    const percent = (
      (e.currentTarget.currentTime / e.currentTarget.duration) *
      100
    ).toFixed(2);
    const time = e.currentTarget.currentTime;

    setPercentage(+percent);
    setCurrentTime(time.toFixed(2));
  };

  useEffect(() => {
    if (podcast) {
      if (isPlaying) {
        audioEl.current.play();
      } else {
        audioEl.current.pause();
      }
    }
  });

  useEffect(() => {
    if (!podcast) {
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
            `${process.env.REACT_APP_URI}/api/private/rss`,
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

  return (
    <Container>
      {console.log(podcast)}
      {!podcast ? (
        <Loader />
      ) : (
        <>
          <audio
            ref={audioEl}
            src={podcast[currentSongIndex].enclosure.url}
            onLoadedData={(e) => {
              console.log(e.currentTarget.duration.toFixed(2));
            }}
            onTimeUpdate={getCurrDuration}
          ></audio>
          <PlayerWrapper>
            <h4>Playing Now</h4>
            <PlayerDetails podcast={podcast[currentSongIndex]} />
            <Slider onChange={onChange} percentage={percentage} />
            <PlayerControls
              isPlaying={isPlaying}
              setIsPlaying={setIsPlaying}
              SkipSong={SkipSong}
            />
            <PlayerDate>
              {podcast[currentSongIndex].pubDate
                .split(" ")
                .slice(0, 4)
                .join(" ")}
            </PlayerDate>
            <PlayerNext>
              <strong>Next up: </strong>
              {podcast[nextSongIndex]?.title}
            </PlayerNext>
          </PlayerWrapper>
          <EpisodeDescription ep={podcast[currentSongIndex].content} />
        </>
      )}
    </Container>
  );
};

export default Player;

const Container = styled.div`
  margin: 0px auto;
  padding: 50px;

  @media only screen and (max-width: 760px) {
    padding: 25px;
  }
`;

const PlayerWrapper = styled.div`
  width: 80%;
  margin: 0 auto;
  border-radius: 15px;

  @media only screen and (max-width: 760px) {
    width: 100%;
  }

  > h4 {
    color: #14a7f3;
    font-size: 20px;
    text-transform: uppercase;
    font-weight: 600;
    text-align: center;

    @media only screen and (max-width: 760px) {
      font-size: 16px;
    }
  }
`;

const PlayerDate = styled.p`
  text-align: center;
  color: #14a7f3;
  font-weight: 600;
  font-size: 18px;
  margin: 5px;

  @media only screen and (max-width: 760px) {
    text-align: center;
    font-size: 14px;
    margin: 2px;
  }
`;

const PlayerNext = styled.p`
  color: #000;
  text-align: center;
  font-size: 18px;

  @media only screen and (max-width: 760px) {
    text-align: center;
    font-size: 14px;
    margin: 2px;
  }
`;
