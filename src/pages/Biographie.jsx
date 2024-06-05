import React, {useRef, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

function Biographie() {

  return (
    <div className="divBiographie">
      <div className='logo logoPage'>
        <Link to="/"><img alt="logo" src="/img/logo1.png" className="imglogo"/></Link>
        <p>Igerie coaching de vie</p>
      </div>
      <h4>Qui suis-je ?</h4>
      <div className='blockBiographie'>
          <div className='firstBlockBiographie'>
            <div style={{ backgroundImage: `url(/img/profil.jpg)` }} className='pictureIsaBio'></div>
            <div className='isabelleTextBio'>
                <h3>Isabelle Genest</h3>
                <p className='paragrapheClassIsabelle'>
                    Je suis Isabelle, créatrice d’Igérie, une conception du monde élaborée à partir de mes expériences personnelles et professionnelles, de mes recherches, formations et expérimentations. Je n’ai pas inventé grand-chose. Le concept de vie Igérie est le résultat d’un assemblage multi théoriques et apprentissages de vie qui est en perpétuelle évolution.<br></br>
                    Mon parcours de vie, mes blessures, mes obstacles, mes difficultés grandes et petites et la volonté dont j’ai fait preuve pour les dépasser chaque fois et les transformer en expériences positives, m’ont permis d’acquérir une plus grande compréhension du monde, de son fonctionnement, une façon d’appréhender la vie, de l’envisager dans toute sa complexité avec beaucoup d’optimisme.
                </p>
            </div>
          </div>
          <div className='textBiographie'>
            <p>
              J’en suis sortie plus grande, plus évoluée avec un regard nouveau sur le monde qui me permet aujourd’hui de savoir qui je suis et comment me diriger dans ma vie en toute quiétude, confiante quant au chemin qui me reste à parcourir.<br></br><br></br>
              Mes débuts de vie n’ont pas été facilités. J’ai perçu dès petite que je devrais me débrouiller toute seule ; ne compter que sur moi-même pour me faire une place dans le monde. Par obligation, j’ai très vite endossé la responsabilité de ma vie et de mes choix. J’ai compris que les regrets, les accusations, la victimisation servent un moment mais ne font pas avancer. J’ai dû beaucoup observer, comprendre, apprendre pour juste savoir vivre, avoir les codes sociaux. Ma vie de famille, mon travail, mes différentes formations, mes thérapies, les rencontres m’ont beaucoup apportée. J’ai passé la plus grande partie de ma vie à chercher. J’avais besoin de comprendre comment le monde fonctionnait, comment JE fonctionnais pour m’y faire une place. Par nécessité et par goût, je suis devenue une exploratrice de la vie. <br></br><br></br>
              Les formations, les thérapies personnelles avec différentes approches, les rencontres, les expériences de vie personnelle, ma pratique professionnelle avec les stagiaires et mes patients. Tout ce chemin m’a appris énormément et j’apprends encore. Ce que je découvre m’ouvre chaque fois de nouveaux horizons. D’une sensation d’enfermement, de peur ou de colère si je me sens bloquée, je suis comme face à l’immensité d’un paysage de montagne, je peux prendre à nouveau une grande goulée d’air et je suis heureuse lorsqu’un nouveau chemin s’ouvre à moi enrichie de mes nouvelles découvertes.<br></br><br></br>
            </p>
            <p>
              J’ai gagné en puissance et en liberté. Ma boite à outils s’est bien remplie et je suis bien mieux équipée pour avancer dans la vie et me confronter à ses difficultés.<br></br><br></br>
              J’ai eu un mari patient, aimant qui m’a soutenue dans tout mon parcours ; y compris lorsque la même année, j’ai dû faire face à un cancer, une maladie neuro-musculaire dégénérative et une dépression. De toutes mes expériences j’en ai tiré des leçons qui m’ont fait grandir. Mon handicap m’a obligé à me poser et réaménager ma vie. <br></br><br></br>
              Je suis conseillère conjugale et familiale, spécialiste des relations interpersonnelles familiales et coach de vie, titulaire d’un Diplôme Universitaire en philosophie, d’une formation en Analyse transactionnelle et en thérapie familiale. Je recevais du public en entretien ; je formais des professionnels dans les domaines du social et de la psychologie et j’animais des groupes de paroles d’enfants.<br></br><br></br>
              Lors de mes formations et de mes consultations, il m’est souvent arrivé qu’on me dise « Mais pourquoi personne ne nous dit ça dans la vie ? Ça nous aiderait ; nous ferait gagner tellement de temps »<br></br><br></br>
            </p>
            <p style={{fontStyle: "italic"}}>
              Un jour, alors que nous étions en club de vacances avec mon mari, je croise un monsieur, André, d’un certain âge qui physiquement me faisait vraiment penser à mon père, petit bonhomme tout mignon. Nous nous saluons et commençons à parler. J’apprends qu’il fait partie d’un groupe de vacanciers et qu’il est là avec sa femme pour leurs 50 ans de mariage. Puis il m’explique que les gens ne sont pas contents de leur accompagnateur et qu’il prend des notes pour se plaindre auprès de l’organisme au retour. Je luis demande alors ce que lui-même a subi. Il me dit « Moi, rien ».<br></br><br></br>
              Sincèrement étonnée, je lui demande alors pourquoi il s’embête avec ça alors qu’il pourrait profiter avec sa femme de leur voyage en amoureux, des beaux paysages et de l’ambiance de vacances ? Je le vois interloqué Il me salue et s’en va.<br></br><br></br>
              Quelques jours plus tard, nous aurons l’occasion de partager ensemble des activités du club dans la rigolade.<br></br><br></br>
              Le dernier jour, nous sommes réunis autour d’une table partageant un verre avec un autre couple pour nous dire au revoir. Nous partions le lendemain. Je n’avais jamais vraiment eu l’occasion de parler avec cet autre couple. Je m’intéresse à eux et leur pose des questions, apparemment banales. Au fur et à mesure de nos échanges, il s’avère que ce couple était d’une grande richesse humaine. Ils n’avaient peut-être pas des hauts diplômes mais leur intelligence émotionnelle et leurs valeurs étaient admirables.<br></br><br></br>
              André se tourne alors vers moi et dit : « Nous venons de passer deux semaines en compagnie de ce couple et je découvre seulement maintenant qui ils sont. Tu es une drôle de personne. Au début je me suis dit « qui c’est celle-là pour me dire ce que je dois faire ? et puis ça m’a fait réfléchir. J’ai laissé tomber mon carnet. Et aujourd’hui…Tu m’as fait gagner 20 ans de psychanalyse. Merci »<br></br><br></br>
            </p>
            <p>
              <span style={{fontWeight: "bold"}}>Ça m’a vraiment touché. Quel beau cadeau il m’a fait avec ce retour.</span><br></br><br></br>
              A force de retours étonnants, je me suis aperçue que sans m’en rendre compte, de mon expérience de vie, de mes connaissances, de mes recherches dans les sciences humaines et de mes réflexions, j’avais développé une philosophie de vie, une théorie du fonctionnement du monde qui me servait de guide pour apprécier pleinement la vie et trouver les bonnes solutions, les meilleures pour moi, quand un problème se posait.<br></br><br></br>
              C’est comme un logiciel qui m’aide à me diriger et trouver le chemin qui me convient, celui qui me correspond à ce moment précis de ma vie.<br></br><br></br>
              C’est très aidant dans les situations où on se sent enfermé dans sa vie, dans des schémas de normalité, qu’on a l’impression de ne pas avoir le choix, de subir sa vie plus que de la vivre, qu’on ne trouve pas les moyens de sortir de sa situation seul parce qu’on ne sait ni quoi faire, ni où aller, ni à qui s’adresser, ou qu’on ne trouve pas de sens à sa vie.<br></br><br></br>
              Il y a des théories, des mécanismes à connaître pour analyser une situation, tout à fait accessibles au grand public, pour évoluer dans la vie et faire des choix ajustés.<br></br><br></br>
              Aujourd’hui, j’ai décidé de former les gens directement, de donner des clés pour faire une première analyse de la situation et gagner en autonomie tout au long de leur vie.<br></br><br></br>
              Je serais très heureuse si, ne serait-ce qu’un petit bout du contenu d’ Igérie pouvait vous éclairer et vous permettre de reprendre une grande goulée d’air pour mieux repartir.
            </p>
            <p style={{fontWeight: "bold", textAlign: "center", marginTop: "50px"}}>J’ai passé 50 ans à écouter. Maintenant je dois parler.</p>
          </div>
      </div>
    </div>
  );
}

export default Biographie;