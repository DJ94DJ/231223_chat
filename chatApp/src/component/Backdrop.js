function Backdrop({ svgPath }) {
    return (
    <>
      <div className="backdrop-container2" style={{ filter: "blur(0px)" }}>
        <div
          className="white-drop"
          style={{
            width: 700,
            height: 700,
            clipPath: `path('${svgPath}')`,
            background: "linear-gradient(135deg,rgba(224,225,232,255),  rgba(255,255,255,255))",
          }}
        >
        </div>
      </div>
        <div className="backdrop-container-shadow1"
              style={{
                width: 700,
                height: 700,
                borderRadius: 60,
                backgroundColor: "rgba(255, 255, 255, 0.85)",
                filter: "blur(30px)",
                // filter: "drop-shadow(0rem 0rem 50px red)",
              }}
            ></div>
        <div className="backdrop-container-shadow2"
              style={{
                width: 700,
                height: 700,
                borderRadius: 60,
                backgroundColor: "rgba(37, 37, 60, 0.15)",
                filter: "blur(20px)",
                // filter: "drop-shadow(0rem 0rem 50px red)",
              }}
            >

        </div>
    </>
    );
  }
  export default Backdrop;