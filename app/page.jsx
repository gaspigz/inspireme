"use client"
import { useState } from "react";
import Link from "next/link";

const MainPage = () => {

  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [fondo_url, setFondo_url] = useState("");
  const [rostro_url, setRostro_url] = useState("");
  const [isFondoLoaded, setIsFondoLoaded] = useState(false);
  const [isRostroLoaded, setIsRostroLoaded] = useState(false);
  const [isReclickFondoLoaded, setIsReclickFondoLoaded] = useState(false);
  const [isReclickRostroLoaded, setIsReclickRostroLoaded] = useState(false);
  const [hasButtonBeenClicked, setHasButtonBeenClicked] = useState(false);

  const handleButtonClick = async () => {
    setHasButtonBeenClicked(true);

    setIsReclickFondoLoaded(false);
    setIsReclickRostroLoaded(false);

    setIsButtonClicked(true);
    let response_fondo = await fetch("https://picsum.photos/400", {
        method: "GET",
        body: null,
        headers: {
          "Content-Type": "application/json",
        },
      }).then((response) => {
        setIsReclickFondoLoaded(true);
        setIsFondoLoaded(true);
        return response;
      });

    let response_rostro = await fetch("https://randomuser.me/api", {
        method: "GET",
        body: null,
        headers: {
          "Content-Type": "application/json",
        },
      }).then((response) => {
        setIsReclickRostroLoaded(true);
        setIsRostroLoaded(true);
        return response;
      });

    response_rostro = await response_rostro.json();

    setRostro_url(response_rostro.results[0].picture.large);
    setFondo_url(response_fondo.url);
  };

  const handleRostroClick = async () => {
    setIsReclickRostroLoaded(false);
    setIsButtonClicked(true);
    let response_rostro = await fetch("https://randomuser.me/api", {
        method: "GET",
        body: null,
        headers: {
          "Content-Type": "application/json",
        },
      }).then((response) => {
        setIsReclickRostroLoaded(true);
        return response;
      });

    response_rostro = await response_rostro.json();

    setRostro_url(response_rostro.results[0].picture.large);
  }

  const handleFondoClick = async () => {
    setIsReclickFondoLoaded(false);
    setIsButtonClicked(true);
    let response_fondo = await fetch("https://picsum.photos/400", {
        method: "GET",
        body: null,
        headers: {
          "Content-Type": "application/json",
        },
      }).then((response) => {
        setIsReclickFondoLoaded(true);
        return response;
      });

    setFondo_url(response_fondo.url);
  }

  return (
    <div className="flex relative flex-col justify-center align-center w-screen h-screen items-center bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-rose-100 to-teal-100">
      <h1 className={`font-extrabold text-5xl sm:text-8xl mb-3 text-[#422B47] ${(isFondoLoaded && isRostroLoaded) ? 'moved-up' : ''}`}>Inspire.me!</h1>
      <h3 className={`font-light text-xl sm:text-4xl ${(isFondoLoaded && isRostroLoaded) ? 'moved-up' : ''}`}>Do not know what to draw?</h3>
      <p className={`font-light text-md text-center p-3 sm:text-2xl ${(isFondoLoaded && isRostroLoaded) ? 'moved-up' : ''}`}>We give you a random background and a random face, then you do your magic and share it in X with #InspireMe</p>
      <button onClick={handleButtonClick} className={`shadow-xl bg-[#6C317A] hover:bg-[#873D99] active:bg-[#8D40A1] transition-colors font-bold text-white rounded-md 
      ${isButtonClicked && (!(isFondoLoaded && isRostroLoaded) || !(isReclickFondoLoaded || isReclickRostroLoaded) ) ? ' py-3 px-12 ' : ' p-3 '}
      ${(isFondoLoaded && isRostroLoaded) ? 'moved-up' : ''}`}>
        {isButtonClicked && (!(isFondoLoaded && isRostroLoaded) || !(isReclickFondoLoaded || isReclickRostroLoaded) )? <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-slate-100"></div> : (hasButtonBeenClicked ? 'Try again!' : 'Get inspired')}
        </button>

      {(isFondoLoaded && isRostroLoaded)? <div className="mt-6 flex flex-col align-center items-center justify-center "> 
          <div className="flex justify-center align-center items-center sm:w-full ">
            <div className="flex flex-col items-center w-36 h-36 sm:w-80 sm:h-80 mr-10">
              <img className="object-cover w-full h-full aspect-w-1 aspect-h-1 shadow-xl" src={rostro_url} alt="Rostro" id="rostro" />
              <label className="text-sm sm:text-md mt-2 text-center">Use this face...</label>
              <button onClick={handleRostroClick} className="text-slate-800 text-center hover:text-slate-600 underline text-sm">{isReclickRostroLoaded ? 'Or try with another background' : <div className="mt-1 animate-spin rounded-full h-3 w-3 border-b-2 border-slate-900"></div>}</button>
            </div>
            <div className="flex flex-col items-center w-36 h-36 sm:w-80 sm:h-80">
              <img className="object-cover w-full h-full aspect-w-1 aspect-h-1 shadow-xl" src={fondo_url} alt="Fondo" id="fondo" />
              <label className="text-sm sm:text-md mt-2 text-center">with this background</label>
              <button onClick={handleFondoClick} className="text-slate-800 hover:text-slate-600 underline text-center text-sm">{isReclickFondoLoaded ? 'Or try with another background' : <div className="mt-1 animate-spin rounded-full h-3 w-3 border-b-2 border-slate-900"></div>}</button>
            </div>
        </div>
      </div> : <></>}

      <h2 className="absolute text-sm sm:text-md top-5 text-slate-400">Developed by: <label className="underline"><Link href="https://github.com/gaspigz">@gaspigz</Link></label> - <label className="underline"> <Link href="https://github.com/gaspigz">My portfolio</Link></label></h2>
    </div>
  )
}

export default MainPage

