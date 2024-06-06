import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

function PresentationIsabelle() {
  const h3Ref = useRef(null);

  useEffect(() => {
    if (window.innerWidth > 900) {
      gsap.fromTo(
        h3Ref.current,
        { x: '100%', opacity: 0 },
        {
          x: '0%',
          opacity: 1,
          duration: 1,
          scrollTrigger: {
            trigger: h3Ref.current,
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
      <div className='divPresentationIsabelle'>
        <h3 ref={h3Ref}>Qui suis-je ?</h3>
        <div className='blockPresentation'>
          <div style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/img/profil.jpg)` }} className='pictureIsa'></div>
          <div className='isabelleText'>
              <p className='paragrapheClassIsabelle'>
                  Je suis Isabelle, créatrice d’Igérie, une conception du monde élaborée à partir de mes expériences personnelles et professionnelles, de mes recherches, formations et expérimentations. Je n’ai pas inventé grand-chose. Le concept de vie Igérie est le résultat d’un assemblage multi théoriques et apprentissages de vie qui est en perpétuelle évolution.<br/><br/>
                  Mon parcours de vie, mes blessures, mes obstacles, mes difficultés grandes et petites et la volonté dont j’ai fait preuve pour les dépasser chaque fois et les transformer en expériences positives, m’ont permis d’acquérir une plus grande compréhension du monde, de son fonctionnement, une façon d’appréhender la vie, de l’envisager dans toute sa complexité avec beaucoup d’optimisme.<br/><br/>
                  <span className='importCitation'>J’ai passé 50 ans à écouter. Maintenant je dois parler.</span>
                  <Link to="/biographie" className='linkPresentation'>Accéder à ma biographie <FontAwesomeIcon icon={faArrowRight} className='arrowIcon'/></Link>
              </p>
          </div>
        </div>
      </div>
  );
}

export default PresentationIsabelle;