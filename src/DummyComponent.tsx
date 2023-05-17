import styled from "@emotion/styled";
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
  useRef,
} from "react";
import { Grid } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import { data } from "./data";
import { setInterval } from "timers/promises";

interface DummyProps {
  number: number;
  setNumber: Dispatch<SetStateAction<number>>;
}
const Images = styled(Grid)`
  margin-top: 25px;
`;
const Container = styled.div`
  padding: 20px 20px;
  p {
    font-size: 12px;
    color: #b4b3b3;
  }
  h3 {
    text-align: left;
    font: normal normal normal 50px/57px Ubuntu;
    letter-spacing: 0px;
    color: #707070;
  }
`;

const ImagesContainer = styled(Grid)`
  position: relative;
  padding: 0 20px;
`;
const Img = styled.img`
  width: 100%;
  height: 120px;
  border-radius: 10px;
`;
const MainImage = styled.img`
  width: 100%;
  height: 450px;
  object-fit: cover;
  border-radius: 10px;
`;

const ArrowLeft = styled.div`
  width: 0;
  height: 0;
  border-top: 15px solid transparent;
  border-bottom: 15px solid transparent;
  border-right: 15px solid #000;
  position: absolute;
  left: 0;
  top: 55%;
  cursor: pointer;
`;

const ArrowRight = styled.div`
  width: 0;
  height: 0;
  border-top: 15px solid transparent;
  border-bottom: 15px solid transparent;
  border-left: 15px solid #000;
  position: absolute;
  right: 0;
  top: 55%;
  cursor: pointer;
`;

const PlayButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 120px;
`;
const PlayButton = styled.div`
  background-color: #25beda;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PauseButton = styled.div`
  background-color: #25beda;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

interface IUser {
  index: number;
  url: string;
  text: string;
  title: string;
}

const DummyComponent: React.FC<DummyProps> = ({ number, setNumber }) => {
  let flipInterval = useRef<NodeJS.Timeout>();
  const [timeIndex, setTimeIndex] = useState<number>(0);
  const [play, setPlay] = useState<boolean>(false);
  const [mainimage, setMainImage] = useState<IUser>({
    index: data[0].index,
    url: data[0].url,
    text: data[0].text,
    title: data[0].title,
  });
  useEffect(() => {
    if (play) {
      const handle = window.setTimeout((): void => {
        console.log(timeIndex, "timeindex");
        if (timeIndex > 3) {
          setTimeIndex(0);
        } else {
          setTimeIndex(timeIndex + 1);
        }
      }, 3000);
      return (): void => {
        clearTimeout(handle);
      };
    }
  }, [timeIndex, play]);

  useEffect(() => {
    function getImage(index: number) {
      return data[index];
    }
    var passed: IUser = getImage(timeIndex);
  }, [timeIndex]);

  const handleClick = (url: IUser) => {
    setMainImage(url);
  };
  const handlePrev = () => {
    //function isNext(element: IUser, index: number) {
    // return index == mainimage.index - 1;
    //}
    //var passed: IUser = data.find(isNext) || data[4];
    //setMainImage(passed);
    if (timeIndex == 0) {
      setTimeIndex(4);
    } else {
      setTimeIndex(timeIndex - 1);
    }
  };
  const handleNext = () => {
    //function isPrev(element: IUser, index: number) {
    //return index == mainimage.index + 1;
    //}
    //var passed: IUser = data.find(isPrev) || data[0];
    //setMainImage(passed);
    if (timeIndex == 4) {
      setTimeIndex(0);
    } else {
      setTimeIndex(timeIndex + 1);
    }
  };
  function getindex(a: number, b: number) {
    if (a + b < 5) return a + b;
    else {
      return a + b - 5;
    }
  }
  return (
    <>
      <Container>
        {mainimage && (
          <Grid container spacing={2}>
            <Grid item sm={12} lg={7.5} md={7.5}>
              <MainImage src={mainimage.url} alt="" />
              <ImagesContainer container>
                <ArrowLeft onClick={() => handlePrev()} />
                <Images container spacing={2} justifyContent="space-between">
                  {data.map((d, index) => (
                    <Grid item sm={12} lg={2.4} md={2.4}>
                      <Img
                        src={data[getindex(timeIndex, d.index)].url}
                        alt=""
                        onClick={() => handleClick(d)}
                      />
                    </Grid>
                  ))}
                </Images>
                <ArrowRight onClick={() => handleNext()} />
                <Grid item sm={12} lg={4.5} md={4.5}></Grid>
              </ImagesContainer>
            </Grid>
            <Grid item sm={12} lg={4.5} md={4.5}>
              <h3>{mainimage.title}</h3>
              <p>{mainimage.text}</p>
              <PlayButtonContainer>
                {!play ? (
                  <PlayButton
                    onClick={() => setPlay(true)}
                    style={{ color: "#ffffff" }}
                  >
                    <PlayArrowIcon />
                  </PlayButton>
                ) : (
                  <PauseButton
                    onClick={() => setPlay(false)}
                    style={{ color: "#ffffff" }}
                  >
                    <PauseIcon />
                  </PauseButton>
                )}
              </PlayButtonContainer>
            </Grid>
          </Grid>
        )}
      </Container>
    </>
  );
};

export default DummyComponent;
