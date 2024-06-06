import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const carouselItems = [
  {
    image: process.env.PUBLIC_URL + "/img/chemin.png",
    header: '...de sens à ta vie',
    list: [
      '"Tu as tout pour être heureux(se)" mais tu ne te sens pas épanoui(e)',
      "Tu as l’impression de passer à côté de ta vie",
      "Tu es à un carrefour de ta vie et ne sais pas quelle direction prendre.",
      "Le monde d’aujourd’hui te fait peur et tu perds espoir pour l’avenir."
    ]
  },
  {
    image: process.env.PUBLIC_URL + "/img/perdu.png",
    header: '...de solutions pour sortir de situations bloquées ou répétitives',
    list: [
      "Tu t’épuises à devoir sans cesse réagir et faire face à de nouvelles difficultés.",
      "Tu as l’impression d’avoir tout essayé et te sens impuissant(e)",
      "Tu tiens surtout pour les autres.",
      "Tu as l’impression que ta vie n’est qu’une répétition des mêmes situations, des mêmes relations douloureuses.",
      "Tu n’es pas loin de perdre espoir d’une vie meilleure."
    ]
  },
  {
    image: process.env.PUBLIC_URL +"/img/developpement.png",
    header: '...de développement personnel',
    list: [
      "Tu as envie de découvrir qui tu es vraiment, ton plein potentiel.",
      "Tu es curieux de la vie ; tu as envie de découvrir de nouvelles pistes de recherches.",
      "Tu as besoin d’un guide pour t’accompagner dans tes choix, petits et grands.",
      "Tu rêverais d’un mode d’emploi de la vie, d’une école qui t’enseigne ce qu’il y a à savoir pour te diriger dans la vie."
    ]
  },
  {
    color: "#851A15",
    header: '...de développement personnel'
  }
];

const Slide = ({ image, header, list, index }) => (
  index === 3 ? 
  <div className="slide" style={{ backgroundColor: "#851A15" }}>
    <Link to="/igerie" className='linkIgerie'>
    <div className="overlay" style={{ backgroundColor: "inherit" }}>
      <h2 style={{ color: "#F6EBE2" }}>En savoir plus...</h2>
    </div>
    </Link>
  </div> 
  :
  <div className="slide" style={{ backgroundImage: `url(${image})` }}>
    <div className="overlay">
      <h2>{header}</h2>
      <ul>
        {list.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  </div>
);

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  autoplay: true,
  autoplaySpeed: 8000,
  customPaging: function(i) {
    return (
      <div className="custom-dot"></div>
    );
  }
};

const PresentationIgerie = () => {
  useEffect(() => {
    if (window.innerWidth > 900) {
      gsap.fromTo(
        ".titleSlide h2",
        { x: '100%', opacity: 0 },
        {
          x: '0%',
          opacity: 1,
          duration: 1,
          scrollTrigger: {
            trigger: ".titleSlide",
            start: "top 70%",
            end: "top 50%",    
            scrub: 1,
            markers: false,
            pin: false,
          }
        }
      );
    }
  }, []);

  return (
    <div className='presentationDiv'>
      <div className='divPresentationIgerie'>
        <div className='titleSlide'>
          <h2 id='h2TitleSlide'>Je m’adresse à toi si tu es en recherche...</h2>
        </div>
        <div className='lineDiv'></div>
        <div className="slider-container">
          <Slider {...settings}>
            {carouselItems.map((item, index) => (
              <Slide key={index} {...item} index={index}/>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default PresentationIgerie;
