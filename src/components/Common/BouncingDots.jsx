function BouncingDots({ size = 8, color = "currentColor" }) {
  const dotStyle = {
    width: size,
    height: size,
    borderRadius: "50%",
    backgroundColor: color,
    display: "inline-block",
    animation: "zoozu-bounce 0.6s ease-in-out infinite alternate",
  };

  return (
    <>
      <style>{`
        @keyframes zoozu-bounce {
          from { transform: translateY(0px);  opacity: 1;   }
          to   { transform: translateY(-6px); opacity: 0.5; }
        }
      `}</style>

      <span
        role="status"
        aria-label="Loading, please wait"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: size * 0.6,
        }}
      >
        <span
          aria-hidden="true"
          style={{ ...dotStyle, animationDelay: "0s" }}
        />
        <span
          aria-hidden="true"
          style={{ ...dotStyle, animationDelay: "0.15s" }}
        />
        <span
          aria-hidden="true"
          style={{ ...dotStyle, animationDelay: "0.3s" }}
        />
      </span>
    </>
  );
}

export default BouncingDots;
