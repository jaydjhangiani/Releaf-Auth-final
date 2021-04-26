import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import db from "../assets/firebase";
import axios from "axios";
import PodContext from "../context/PodContext";
import Loader from "../components/Loading";
import PodcastDescription from "../components/podcast/PodcastDescription";
import PodcastEpisode from "../components/podcast/PodcastEpisode";

const Podcast = () => {
  const [podcastName, setPodcastName] = useState(null);
  const [podcastEpisodes, setPodcastEpisodes] = useState();
  const { getPodcast } = useContext(PodContext);

  // getting ID from url
  let { id } = useParams();

  // setting podcast name
  useEffect(() => {
    db.collection("podcasts")
      .where("redirect", "==", id)
      .onSnapshot((snapshot) =>
        setPodcastName(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );
  }, [id]);

  useEffect(() => {
    async function getPodcastData() {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };
      if (podcastName) {
        try {
          console.log(podcastName[0].data.rss);
          const rss = { rss: `${podcastName[0].data.rss}` };
          let res = await axios.post(
            `${process.env.REACT_APP_URI}/api/private/rss`,
            rss,
            config
          );
          setPodcastEpisodes(res.data);
          getPodcast(res.data);
        } catch (err) {
          console.log(err);
        }
      }
    }
    getPodcastData();
  }, [podcastName]);

  return (
    <>
      {!podcastName ? (
        <Loader />
      ) : (
        <PodcastContainer>
          <PodcastDescContainer>
            <PodcastDescription podcast={podcastName[0].data} />
          </PodcastDescContainer>

          <PodcastEpContainer>
            {podcastEpisodes ? (
              <>
                {podcastEpisodes.map((item, index) => (
                  <PodcastEpisode
                    key={index}
                    item={item}
                    index={index}
                    redirect={podcastEpisodes.length - index}
                  />
                ))}
              </>
            ) : (
              <Loader />
            )}
          </PodcastEpContainer>
        </PodcastContainer>
      )}
    </>
  );
};

export default Podcast;

const PodcastContainer = styled.div`
  display: flex;
  flex-direction: column;

  /* height: 50vh; */
`;

const PodcastEpContainer = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid whitesmoke;
  box-shadow: 0px 4px 14px -3px rgba(0, 0, 0, 0.2);
  margin: 0 auto;
  padding: 15px;
  width: 80%;
  border-radius: 15px;
`;

const PodcastDescContainer = styled.div`
  display: flex;
  margin: 0 auto;
  width: 80%;
  /* flex-direction: column; */
  /* height: 50vh; */
  margin-top: 15px;
  border: 1px solid whitesmoke;
  box-shadow: 0px 4px 14px -3px rgba(0, 0, 0, 0.2);
  align-items: center;
  padding: 15px;
  border-radius: 15px;
  margin-bottom: 35px;

  @media screen and (max-width: 960px) {
    flex-direction: column;
  }
`;
