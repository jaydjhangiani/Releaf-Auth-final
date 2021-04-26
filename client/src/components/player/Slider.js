import styled from "styled-components";

import { useEffect, useRef, useState } from "react";

const Slider = ({ onChange, percentage }) => {
  const [position, setPosition] = useState(0);
  const [marginLeft, setMarginLeft] = useState(0);
  const [progressBarWidth, setProgressBarWidth] = useState(0);

  const rangeRef = useRef();
  const thumbRef = useRef();

  useEffect(() => {
    const rangeWidth = rangeRef.current.getBoundingClientRect().width;
    const thumbWidth = thumbRef.current.getBoundingClientRect().width;
    const centerThumb = (thumbWidth / 100) * percentage * -1;
    const centerProgressBar =
      thumbWidth +
      (rangeWidth / 100) * percentage -
      (thumbWidth / 100) * percentage;
    setPosition(percentage);
    setMarginLeft(centerThumb);
    setProgressBarWidth(centerProgressBar);
    // console.log(position)
  }, [percentage]);

  // console.log(percentage)
  return (
    <SliderContainer>
      <ProgressBarContainer
        style={{
          width: `${progressBarWidth}px`,
        }}
      ></ProgressBarContainer>
      <Thumb
        ref={thumbRef}
        style={{
          left: `${position}%`,
          marginLeft: `${marginLeft}px`,
        }}
      ></Thumb>
      <Range
        value={position}
        ref={rangeRef}
        step="0.01"
        className="range"
        onChange={onChange}
      />
    </SliderContainer>
  );
};

export default Slider;

const SliderContainer = styled.div`
  position: relative;
  width: 350px;
  margin: 0 auto;
  margin-bottom: 5px;
  --progress-bar-height: 8px;
  --thumb-width: 20px;
  --thumb-height: 20px;

  ::before {
    content: "";
    background-color: #f0f0f0;
    width: 99%;
    height: calc(var(--progress-bar-height) - 1px);
    display: block;
    position: absolute;
    border-radius: 10px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    pointer-events: none;
  }
`;

const ProgressBarContainer = styled.div`
  background-color: #14a7f3;
  width: 20%;
  height: var(--progress-bar-height);
  display: block;
  position: absolute;
  border-radius: 10px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1;
  user-select: none;
  pointer-events: none;
`;

const Thumb = styled.div`
  width: var(--thumb-width);
  height: var(--thumb-height);
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.753);
  z-index: 3;
  background: rgb(255, 255, 255);
  position: absolute;
  border-radius: 50%;
  top: 50%;
  transform: translate(0%, -50%);
  pointer-events: none;
  user-select: none;

  ::-webkit-slider-thumb {
    width: var(--thumb-width);
    height: var(--thumb-height);
    background: #350f2d;
    border: 1px solid #000000;
    border-radius: 50%;
    cursor: pointer;
    -webkit-appearance: none;
  }
`;

const Range = styled.input`
  -webkit-appearance: none;
  background-color: rgba(240, 9, 9, 0.397);
  height: 10px;
  width: 100%;
  cursor: pointer;
  opacity: 0;
  margin: 0 auto;
}

@media only screen and (max-width: 760px) {
  .slider-container {
    position: relative;
    width: 250px;
  }`;
