import React, {useEffect} from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

function Igerie() {
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
    gsap.fromTo(
      ".titleQuoi h2",
      { x: '100%', opacity: 0 },
      {
        x: '0%',
        opacity: 1,
        duration: 1,
        scrollTrigger: {
          trigger: ".titleQuoi",
          start: "top 70%",
          end: "top 50%",    
          scrub: 1,
          markers: false,
          pin: false,
        }
      }
    );

    gsap.fromTo(
      ".titleEthique h2",
      { x: '-100%', opacity: 0 },
      {
        x: '0%',
        opacity: 1,
        duration: 1,
        scrollTrigger: {
          trigger: ".titleEthique",
          start: "top 70%",
          end: "top 50%",    
          scrub: 1,
          markers: false,
          pin: false,
        }
      }
    );
  }, []

);
  return (
    <div className="divIgerie">
      <div className='logo logoPage'>
        <Link to="/"><img alt="logo" src="/img/logo1.png" className="imglogo"/></Link>
        <p>Igerie coaching de vie</p>
      </div>
      <h4>Qu'est ce qu'Igérie ?</h4>
      <div className="divAide aideIgerie">
        <div className='divPresentationAide presentationIgerieAide'>
            <div className='listHelp'>
                <ul>
                    <li>Pour ceux qui ne trouvent plus de sens à leur vie.</li>
                    <li>Pour ceux qui voient toujours le verre à moitié vide et se résigne à leur sort.</li>
                    <li>Pour ceux qui sont immobilisés dans leur vie, ne trouvent pas de solution.</li>
                    <li>Pour ceux qui s’épuisent à se battre et se débattre chaque fois qu’ils veulent avancer.</li>
                    <li>Pour les anxieux qui ne croient plus en rien et ont peur de tout.</li>
                    <li>Pour tous ceux qui se sentent seuls et sans énergie, ni ressources pour avancer.</li>
                    <li>Pour les jeunes, accablés avant d’entrer dans la vie active, par les peurs des adultes.</li>
                    <li>Pour ceux qui ont simplement besoin d’un accompagnement, à leur rythme, selon leurs possibilités, sans jugement, ni attentes, ni objectifs particuliers à atteindre mais avec de l’optimisme, de l’humour, de la bienveillance.</li>
                </ul>
                <p>Je ne propose pas  d’être ton guide mais de former ton guide intérieur</p>
            </div>
            <div className='lineDiv'></div>
            <div className='titleHelp'>
                <h2>Pour qui ?</h2>
            </div>
        </div>
      </div>
      <div className='blockIgerieQuoi'>
        <div className='titleQuoi'>
            <h2>Pour quoi ?</h2>
        </div>
        <div className='lineDiv'></div>
          <div className='listQuoi'>
              <div className='listUl'>
                <ul>
                  <li>Entamer le chemin de la réconciliation entre son moi social et son moi profond.</li>
                  <li>Avoir un aperçu de sa puissance et de sa capacité à s’aider et se « sauver ».</li>
                  <li>Etre capable d’analyser la situation en cas de difficultés et trouver ses propres solutions par des choix éclairés, en conscience.</li>
                  <li>Voir dans ma vision de la vie, toute la beauté et les opportunités qu’elle nous offre.</li>
                  <li>Acquérir l’autonomie nécessaire à la construction de relations saines et durables.</li>
                  <li>Pouvoir se relier au grand TOUT pour l’aider dans ses besoins fondamentaux, en comprenant qu’elle n’est pas seule et peut demander de l’aide.</li>
                </ul>
              </div>
          </div>
      </div>
      <div className="divAide aideIgerie">
        <div className='divPresentationAide presentationIgerieAide'>
            <div className='listHelp'>
                <ul>
                    <li>Chaque personne est douée de compétences et de richesses.</li>
                    <li>Nous avons tous quelque chose à partager.</li>
                    <li>Il n’y a ni “petites gens” et ni “grandes gens”. Tout le monde est à la même hauteur.</li>
                    <li>“Aider” quelqu’un devient… “l’Accompagner”.</li>
                    <li>-“Assistanat et Solidarité“ deviennent “Collaboration et partage”.</li>
                    <li> “Pitié” devient “Intérêt”.</li>
                    <li>Le déterminisme, et la causalité sont dépassés. “ce n’est pas parce qu’il s’est passé ceci qu’il va se passer ça ». Tout n’est que choix, responsabilité, intention.</li>
                    <li>Victime des évènements mais responsable de ce qu’on en fait.</li>
                    <li>Libre-arbitre = connaissance+ compréhension + réflexion.</li>
                    <li>Personne, au fond, ne sait mieux que soi ce qui est bon pour soi.</li>
                    <li>L’humour et le second degré contre l’anxiété.</li>
                    <li>“Responsable” n’est pas “Coupable”.</li>
                    <li> L’individu et le groupe sont interdépendants. Leurs intérêts doivent profiter à l’un comme à l’autre. </li>
                </ul>
            </div>
            <div className='lineDiv'></div>
            <div className='titleEthique'>
                <h2>Ethique</h2>
            </div>
        </div>
      </div>
    </div>
  );
}

export default Igerie;