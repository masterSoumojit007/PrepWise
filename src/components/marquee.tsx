const LogoMarquee = () => {
  return (
    <div className="logo-marquee-container">
      <div className="logo-marquee">
        <img src="/public/assets/img/clerk.svg" alt="Logo 1" className="logo" />
        <img src="/public/assets/img/bolt.svg" alt="Logo 1" className="logo" />
        <img
          src="/public/assets/img/coursera.svg"
          alt="Logo 1"
          className="logo"
        />
        <img
          src="/public/assets/img/firebase.svg"
          alt="Logo 1"
          className="logo"
        />
        <img
          src="/public/assets/img/gemini.svg"
          alt="Logo 1"
          className="logo"
        />
        <img
          src="/public/assets/img/google.svg"
          alt="Logo 1"
          className="logo"
        />
        <img
          src="/public/assets/img/microsoft.svg"
          alt="Logo 1"
          className="logo"
        />
        <img
          src="/public/assets/img/nextjs.svg"
          alt="Logo 1"
          className="logo"
        />
        <img
          src="/public/assets/img/tailwind.svg"
          alt="Logo 1"
          className="logo"
        />
        <img src="/public/assets/img/uber.svg" alt="Logo 1" className="logo" />
        <img src="/public/assets/img/udemy.svg" alt="Logo 1" className="logo" />
        <img
          src="/public/assets/img/vitejs.svg"
          alt="Logo 1"
          className="logo"
        />
        <img src="/public/assets/img/zoom.svg" alt="Logo 1" className="logo" />
        {/* Add more logos as needed */}
      </div>

      <style>
        {`
              :root {
                --bg-dark: #000000; /* Black background */
              }
    
              body {
                background-color: var(--bg-dark);
                color: #fff;
                transition: background-color 0.3s ease, color 0.3s ease;
              }
    
              .logo-marquee-container {
                display: flex;
                justify-content: center;
                align-items: center;
                overflow: hidden;
                width: 100%;
                padding: 20px 0;
                background-color: var(--bg-dark);
              }
    
              .logo-marquee {
                display: flex;
                animation: marquee 30s linear infinite; /* Slower animation */
              }
    
              .logo {
                margin: 0 50px; /* Increased gap between logos */
                height: 50px;
                padding: 5px;
                transition: transform 0.3s ease;
              }
    
              .logo:hover {
                transform: scale(1.1);
              }
    
              @keyframes marquee {
                0% {
                  transform: translateX(100%);
                }
                100% {
                  transform: translateX(-100%);
                }
              }
            `}
      </style>
    </div>
  );
};

export default LogoMarquee;
