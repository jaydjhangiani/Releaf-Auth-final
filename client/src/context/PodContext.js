import { createContext, useEffect, useState } from "react";

const PodContext = createContext();

const PodContextProvider = (props) => {
  const [podcast, setPodcast] = useState(null);

  const getPodcast = (pod) => {
    setPodcast(pod);
  };

  useEffect(() => {
    getPodcast();
  }, []);

  return (
    <PodContext.Provider value={{ podcast, getPodcast }}>
      {props.children}
    </PodContext.Provider>
  );
};
export default PodContext;

export { PodContextProvider };
