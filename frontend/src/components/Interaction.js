import { useEffect, useRef, useState } from "react";
import Menu from "./Menu";
import Prescription from "./Prescription";
import "../app.css";

const Interaction = () => {
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [lineWidth, setLineWidth] = useState(5);
  const [lineColor, setLineColor] = useState("black");
  const [lineOpacity, setLineOpacity] = useState(0.1);
  const [prescriptionVisible,setPrescriptionVisible]=useState(false)
  const w = window.innerWidth * 0.7;
  const h = window.innerHeight * 0.7;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.globalAlpha = lineOpacity;
    ctx.strokeStyle = lineColor;
    ctx.lineWidth = lineWidth;
    ctxRef.current = ctx;
  }, [lineColor, lineOpacity, lineWidth]);

  // Function for starting the drawing
  const startDrawing = (e) => {
    ctxRef.current.beginPath();
    ctxRef.current.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    setIsDrawing(true);
  };

  // Function for ending the drawing
  const endDrawing = () => {
    ctxRef.current.closePath();
    setIsDrawing(false);
  };

  const draw = (e) => {
    if (!isDrawing) {
      return;
    }
    ctxRef.current.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);

    ctxRef.current.stroke();
  };
  const clear = () => {
    console.log("clearing");
    ctxRef.current.clearRect(
      0,
      0,
      ctxRef.current.canvas.width,
      ctxRef.current.canvas.height
    );
  }; 
  const setPrescriptionVisibility = () => {
    console.log('button is clicked');
    setPrescriptionVisible(!prescriptionVisible);
  }
  return (
    <>
    <button onClick={setPrescriptionVisibility}>{prescriptionVisible?'Draw':'Prescription'}</button>
    { prescriptionVisible===false &&
    <div style={{ marginTop: "20px", boxSizing: "border-box" }}>
      <div>
        <div className="draw-area">
          <Menu
            setLineColor={setLineColor}
            setLineWidth={setLineWidth}
            setLineOpacity={setLineOpacity}
          />
          <canvas
            onMouseDown={startDrawing}
            onMouseUp={endDrawing}
            onMouseMove={draw}
            ref={canvasRef}
            width={w}
            height={h}
          />
        </div>
        <button onClick={clear}>Clear</button>
      </div>
    </div>
    }
    {prescriptionVisible===true &&
        <Prescription/>
    }
    </>
  );
};

export default Interaction;
