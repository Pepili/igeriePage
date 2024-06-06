import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function PresentationServices() {
  useEffect(() => {
    if (window.innerWidth > 900) {
        gsap.fromTo(
          ".titleFree h2",
          { x: '100%', opacity: 0 },
          {
            x: '0%',
            opacity: 1,
            duration: 1,
            scrollTrigger: {
              trigger: ".titleFree",
              start: "top 70%",
              end: "top 50%",    
              scrub: 1,
              markers: false,
              pin: false,
            }
          }
        );
        gsap.fromTo(
          ".titleNoFree h2",
          { x: '-100%', opacity: 0 },
          {
            x: '0%',
            opacity: 1,
            duration: 1,
            scrollTrigger: {
              trigger: ".titleNoFree",
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
    <div className='divServices'>
        <div className='divBlockServices'>
            <div className='blockService free'>
              <div className='titleFree'>
                  <h2>En libre accès...</h2>
              </div>
              <div className='lineDiv'></div>
                <div className='listFree'>
                  <div style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/img/freeService.jpg)` }} className='imgService'></div>
                    <div className='listUl'>
                      <ul>
                        <li>Des podcasts</li>
                        <li>Des articles exclusifs</li>
                        <li>De la documentation</li>
                        <li>Une newsletter adaptées</li>
                        <li>Des webinaires</li>
                        <li style={{paddingTop:"10px"}}><Link to="/services" className='linkServices'>En savoir plus...</Link></li>
                      </ul>
                    </div>
                </div>
            </div>
            <div className='blockService noFree'>
              <div className='listNoFree'>
                <ul>
                  <li className='liBook'>Un livre: "Le rêve d'une vie promise" comprenant:
                      <ul>
                        <li>Une nouvelle carte du monde et de la vie qui t'entoure pour voir au-delà de celle que tu connais et t'ouvrir un nouveau champ de possibilités</li>
                        <li>Des carnets de route pour apprendre à t'orienter.</li>
                        <li>Des leçons de conduite pour adopter les comportements adéquates et les bons réflexes au quotidien.</li>
                      </ul>
                  </li>
                  <li>Des séances de coaching individuels ou en groupe pour te familiariser au quotidien avec le concept Igérie.</li>
                  <li>Des stages d'immersion en Bretagne ouverts à celles et ceux qui ont entamé leur parcours avec Igérie.</li>
                </ul>
                <div className='lineX'></div>
                <p><span style={{fontWeight:"bold"}}>En cadeau avec toute commande: </span><br/> Un carnet de voyage sur lequel tu regrouperas les notes, photos etc... de tes découvertes. C'est le voyage d'une vie, ne l'oublie pas. Ce que tu apprends doit pouvoir te resservir.</p>
              </div>
              <div className='lineDiv'></div>
              <div className='titleNoFree'>
                <h2>...Avec participation financière</h2>
              </div>
            </div>
        </div>
    </div>
  );
}

export default PresentationServices;