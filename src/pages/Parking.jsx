import React, { useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import trash from '../assets/Trash.png';
import bg from '../assets/bg.jpg';
import axios from "axios";

const Parking = () => {
  const location = useLocation();
  const parkingId = location.state?.id;
  const canvasRef = useRef(null);
  const videoInputRef = useRef(null);
  const videoRef = useRef(document.createElement("video"));

  const [polygons, setPolygons] = useState({}); // Объект зон
  const [currentPolygon, setCurrentPolygon] = useState([]);
  const [scale, setScale] = useState({ scaleX: 1, scaleY: 1 });
  const [videoFile, setVideoFile] = useState(null);

  const maxCanvasWidth = 800;
  const maxCanvasHeight = 600;

  const getNextZoneName = () => `zone${Object.keys(polygons).length + 1}`;

  const handleOpenVideo = () => {
    videoInputRef.current.click();
  };

  const handleVideoInputChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setVideoFile(file);
      const url = URL.createObjectURL(file);
      const video = videoRef.current;
      video.src = url;
      video.addEventListener("loadeddata", () => onVideoLoad(video));
    }
  };

  const onVideoLoad = (video) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const videoAspectRatio = video.videoWidth / video.videoHeight;
    const canvasAspectRatio = maxCanvasWidth / maxCanvasHeight;

    if (videoAspectRatio > canvasAspectRatio) {
      canvas.width = maxCanvasWidth;
      canvas.height = maxCanvasWidth / videoAspectRatio;
    } else {
      canvas.height = maxCanvasHeight;
      canvas.width = maxCanvasHeight * videoAspectRatio;
    }

    const scaleX = canvas.width / video.videoWidth;
    const scaleY = canvas.height / video.videoHeight;
    setScale({ scaleX, scaleY });

    const fps = video.videoWidth / video.duration;
    video.currentTime = 5 / fps;

    video.addEventListener("seeked", () => drawVideoFrame(ctx, video));
  };

  const drawVideoFrame = (ctx, video) => {
    const canvas = canvasRef.current;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    drawPolygons(ctx, Object.values(polygons), currentPolygon);
  };

  const drawPolygons = (ctx, polygonsList, currentPolygon = []) => {
    ctx.strokeStyle = "red";
    ctx.fillStyle = "blue";
    ctx.lineWidth = 2;

    polygonsList.forEach((polygon) => {
      ctx.beginPath();
      polygon.forEach(([x, y], index) => {
        if (index === 0) ctx.moveTo(x * scale.scaleX, y * scale.scaleY);
        else ctx.lineTo(x * scale.scaleX, y * scale.scaleY);
      });
      ctx.closePath();
      ctx.stroke();
    });

    if (currentPolygon.length > 0) {
      ctx.beginPath();
      currentPolygon.forEach(([x, y], index) => {
        if (index === 0) ctx.moveTo(x * scale.scaleX, y * scale.scaleY);
        else ctx.lineTo(x * scale.scaleX, y * scale.scaleY);
      });
      ctx.stroke();
    }
  };

  const handleCanvasClick = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();

    const x = (e.clientX - rect.left) / scale.scaleX;
    const y = (e.clientY - rect.top) / scale.scaleY;

    const updatedPolygon = [...currentPolygon, [x, y]];

    if (currentPolygon.length > 0 && isClose([x, y], currentPolygon[0])) {
      const newZoneName = getNextZoneName();
      setPolygons({ ...polygons, [newZoneName]: updatedPolygon });
      setCurrentPolygon([]);
    } else {
      setCurrentPolygon(updatedPolygon);
    }

    const ctx = canvas.getContext("2d");
    drawVideoFrame(ctx, videoRef.current);
    drawPolygons(ctx, Object.values(polygons), updatedPolygon);
  };

  const handleClearPolygons = () => {
    const ctx = canvasRef.current.getContext("2d");
    const video = videoRef.current;

    drawVideoFrame(ctx, video);
    setPolygons({});
    setCurrentPolygon([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!videoFile) {
      alert("Пожалуйста, выберите видео.");
      return;
    }

    if (Object.keys(polygons).length > 0) {
      const roundedPolygons = Object.fromEntries(
        Object.entries(polygons).map(([zone, points]) => [
          zone,
          points.map(([x, y]) => [Math.round(x), Math.round(y)]),
        ])
      );

      const jsonData = JSON.stringify(roundedPolygons, null, 4);
      const blob = new Blob([jsonData], { type: "application/json" });
      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "polygons.json";
      a.click();
      URL.revokeObjectURL(url);
    }

    const formData = new FormData();
    formData.append("video", videoFile);
    formData.append("parking", parkingId);
    formData.append("poligon", JSON.stringify(polygons));

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/parking/camera/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(formData);
      alert("Данные успешно отправлены!");
    } catch (error) {
      console.error("Ошибка при отправке данных:", error);
      alert("Произошла ошибка при отправке данных на сервер.");
    }
  };

  const isClose = (p1, p2, threshold = 10) => {
    return Math.hypot(p1[0] - p2[0], p1[1] - p2[1]) < threshold;
  };

  return (
    <div className="bg-gray-100 min-h-screen" style={{ backgroundImage: `url(${bg})` }}>
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            Муниципальная Платная парковка
          </h1>
          <p className="text-white">г.Бишкек ул.Турусбекова, 35</p>
        </header>

        <form onSubmit={handleSubmit} className="mb-8">
          <div className="flex justify-center space-x-4 mb-8">
            <button
              type="button"
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded flex items-center"
              onClick={handleOpenVideo}
            >
              Открыть видео
            </button>
            <button
              type="button"
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded flex items-center"
              onClick={handleClearPolygons}
            >
              <img src={trash} alt="Очистить" />
              Очистить
            </button>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded flex items-center"
            >
              Сохранить и отправить
            </button>
          </div>

          <input
            type="file"
            ref={videoInputRef}
            className="hidden"
            accept="video/*"
            onChange={handleVideoInputChange}
          />

          <div className="mb-4">
            <canvas
              ref={canvasRef}
              onClick={handleCanvasClick}
              className="bg-gray-800 mx-auto"
              style={{ borderRadius: "40px" }}
            ></canvas>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Parking;
