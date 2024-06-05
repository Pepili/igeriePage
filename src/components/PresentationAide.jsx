import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function PresentationAide() {
    useEffect(() => {
        gsap.fromTo(
          ".titleHelp h2",
          { x: '-100%', opacity: 0 },
          {
            x: '0%',
            opacity: 1,
            duration: 1,
            scrollTrigger: {
              trigger: ".titleHelp",
              start: "top 70%",
              end: "top 50%",    
              scrub: 1,
              markers: false,
              pin: false,
            }
          }
        );
      }, []);
  return (
    <div className="divAide">
        <div className='divPresentationAide'>
            <div className='listHelp'>
                <ul>
                    <li>(Re) trouver ton autonomie, apprendre à connaitre ce qui est bon pour toi et savoir comment l’obtenir</li>
                    <li>Savoir te poser les bonnes question, être capable d’analyser la situation en cas de difficulté et trouver tes propres solutions</li>
                    <li>Avoir un aperçu de te puissance et de ta capacité à t’aider et te “sauver”</li>
                    <li>Changer la version de l’histoire de ta vie</li>
                    <li>Trouver comment construire des relations saines et durables</li>
                    <li>Entamer le chemin de la réconciliation  entre ton moi social et ton moi profond</li>
                    <li>Te relier au grand tout pour t’aider dans les besoins fondamentaux</li>
                </ul>
                <p>Je ne propose pas  d’être ton guide mais de former ton guide intérieur</p>
            </div>
            <div className='lineDiv'></div>
            <div className='titleHelp'>
                <h2>...Ce que je t'aide à faire</h2>
            </div>
        </div>
    </div>
  );
}

export default PresentationAide;