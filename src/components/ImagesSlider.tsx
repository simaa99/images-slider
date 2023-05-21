import React, { useState, useRef, useEffect, FC } from "react";
import "./ImagesSlider.css";
import image1 from "../images/1.jpg";
import image2 from "../images/2.jpg";
import image3 from "../images/3.jpg";
import image4 from "../images/4.jpg";
import image5 from "../images/5.jpg";
import image6 from "../images/6.jpg";
import image7 from "../images/7.jpg";
import image8 from "../images/8.jpg";
import image9 from "../images/9.jpg";
import zoomInImg from "../images/zoom-in.svg";
import zoomOutImg from "../images/zoom-out.svg";
import rotate from "../images/rotate.svg";
import leftArrow from "../images/left-arrow.svg";
import rightArrow from "../images/right-arrow.svg";
import right from "../images/right.svg";
import left from "../images/left.svg";

import { TransformWrapper, TransformComponent ,  ReactZoomPanPinchRef} from "react-zoom-pan-pinch";

interface ImageData {
  id: number;
  value: string;
  name: string;
}

const ImagesSlider: FC = () => {
  const imgs: ImageData[] = [
    { id: 0, value: image1, name: "Image 1" },
    { id: 1, value: image2, name: "Image 2" },
    { id: 2, value: image3, name: "Image 3" },
    { id: 3, value: image4, name: "Image 4" },
    { id: 4, value: image5, name: "Image 5" },
    { id: 5, value: image6, name: "Image 6" },
    { id: 6, value: image7, name: "Image 7" },
    { id: 7, value: image8, name: "Image 8" },
    { id: 8, value: image9, name: "Image 9" },
    { id: 9, value: image4, name: "Image 4" },
    { id: 10, value: image8, name: "Image 8" },
    { id: 11, value: image5, name: "Image 5" },
  ];
  const transformComponentRef = useRef<ReactZoomPanPinchRef | null>(null);

  const [wordData, setWordData] = useState<ImageData>(imgs[0]);
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [rotationAngle, setRotationAngle] = useState<number>(0);

  const [startIndex, setStartIndex] = useState<number>(0);
  const [imagesPerPage, setImagesPerPage] = useState<number>(9); 

  const handlePreviousGallary = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
    }
  };

  const handleNextGallary = () => {
    if (startIndex < imgs.length - imagesPerPage) {
      setStartIndex(startIndex + 1);
    }
  };

  const handlePrevious = () => {
    const currentIndex = wordData.id;
    const previousIndex =
      currentIndex === 0 ? imgs.length - 1 : currentIndex - 1;
    setWordData(imgs[previousIndex]);
    setRotationAngle(0);
  };

  const handleNext = () => {
    const currentIndex = wordData.id;
    const nextIndex = currentIndex === imgs.length - 1 ? 0 : currentIndex + 1;
    setWordData(imgs[nextIndex]);
    setRotationAngle(0);
  };

  const handleClick = (index: number) => {
    const wordSlider = imgs[index];
    setWordData(wordSlider);
    setRotationAngle(0);
  };

  const handleRotate = () => {
    setRotationAngle((prevRotationAngle) => (prevRotationAngle + 90) % 360);
  };

  const handleZoomIn = () => {
    if (zoomLevel < 200) {
      setZoomLevel((prevZoomLevel) => prevZoomLevel + 10);
    }
  };

  const handleZoomOut = () => {
    if (zoomLevel > 100) {
      setZoomLevel((prevZoomLevel) => prevZoomLevel - 10);
    }
  };

  const handleResize = () => {
    const windowWidth = window.innerWidth;
    if (windowWidth < 420) {
      setImagesPerPage(4);
    } else if (windowWidth < 768) {
      setImagesPerPage(7);
    } else {
      setImagesPerPage(9);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    handleResize();
  }, []);

  return (
    <div className="main">
      <div className="image-container">
        <div className="slider-controls">
          <button onClick={handlePrevious}>
            <img src={leftArrow} alt="Previous" className="arrow-img" />
          </button>
          <button onClick={handleNext}>
            <img src={rightArrow} alt="Next" className="arrow-img" />
          </button>
        </div>

        <TransformWrapper
          minScale={1}
          maxScale={2}
          // limitToBounds={true}
          ref={transformComponentRef}
          >
          {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
            <React.Fragment>
              <div className="zoom-controls">
                <div className="zoom-level">{zoomLevel}%</div>
                <button
                  onClick={() => {
                    zoomIn();
                    handleZoomIn();
                  }}
                >
                  <img
                    src={zoomInImg}
                    alt="Zoom In"
                    className="zoom-control-img"
                  />
                </button>
                <button
                  onClick={() => {
                    zoomOut();
                    handleZoomOut();
                  }}
                >
                  <img
                    src={zoomOutImg}
                    alt="Zoom Out"
                    className="zoom-control-img"
                  />
                </button>
                <div className="vertical-line"></div>
                <button onClick={handleRotate} className="rotate-icon">
                  <img src={rotate} alt="Rotate" className="zoom-control-img" />
                </button>
              </div>
              <TransformComponent>
                <img
                  src={wordData.value}
                  alt={wordData.name}
                  className={`${
                    rotationAngle !== 0 ? "rotate-image" : ""
                  } main-slide-image`}
                  style={{
                    transform: `scale(${
                      zoomLevel / 100
                    }) rotate(${rotationAngle}deg)`,
                  }}
                />
              </TransformComponent>
            </React.Fragment>
          )}
        </TransformWrapper>
        <div className="image-name">x-ray {wordData.name}</div>
      </div>

      <div className="flex_row">
        <button className="arrow-button" onClick={handlePreviousGallary}>
          <img src={left} alt="Previous" />
        </button>
        <div className="GallarySlide">
          {imgs.slice(startIndex, startIndex + imagesPerPage).map((data) => (
            <div className="thumbnail" key={data.id}>
              <img
                className={wordData.id === data.id ? "clicked" : ""}
                src={data.value}
                alt={data.name}
                onClick={() => handleClick(data.id)}
              />
            </div>
          ))}
        </div>
        <button className="arrow-button" onClick={handleNextGallary}>
          <img src={right} alt="Next" />
        </button>
      </div>
    </div>
  );
};

export default ImagesSlider;
