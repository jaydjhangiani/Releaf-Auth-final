import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faPause,
  faForward,
  faBackward,
} from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

function PlayerControls(props) {
  return (
    <PlayerControlWrapper>
      <SkipBtn onClick={() => props.SkipSong(false)}>
        <FontAwesomeIcon icon={faBackward} />
      </SkipBtn>
      <PlayBtn onClick={() => props.setIsPlaying(!props.isPlaying)}>
        <FontAwesomeIcon icon={props.isPlaying ? faPause : faPlay} />
      </PlayBtn>
      <SkipBtn onClick={() => props.SkipSong()}>
        <FontAwesomeIcon icon={faForward} />
      </SkipBtn>
    </PlayerControlWrapper>
  );
}

export default PlayerControls;

const PlayerControlWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 30px;
`;

const PlayBtn = styled.button`
  display: flex;
  margin: 0 30px;
  padding: 20px;
  border-radius: 50%;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.4),
    -4px -4px 10px rgba(255, 255, 255, 0.4);
  border: none;
  outline: none;
  background-color: #14a7f3;
  color: #fff;
  font-size: 24px;
  cursor: pointer;
`;

const SkipBtn = styled.button`
  background: none;
  border: none;
  outline: none;
  cursor: pointer;
  color: #888;
  font-size: 18px;
`;
