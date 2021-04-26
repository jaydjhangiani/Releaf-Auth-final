import { CubeGrid } from "better-react-spinkit";
import loadingImg from "../assets/img/loading.svg";
const Loading = () => {
  return (
    <center
      style={{
        display: "grid",
        placeItems: "center",
        height: "100vh",
      }}
    >
      <div>
        <img
          src={loadingImg}
          alt="Loading...."
          style={{ marginBottom: 10 }}
          height="200"
        />
        <CubeGrid size={80} color="#37B0F7" />
        <h3
          style={{
            color: "#37B0F7",
            marginTop: "40px",
          }}
        >
          <i>Take your first steps towards mental gratification</i>
        </h3>
      </div>
    </center>
  );
};

export default Loading;
