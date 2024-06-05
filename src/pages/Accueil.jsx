import React from 'react';
import Logo from '../components/Logo';
import PresentationIgerie from '../components/PresentationIgerie';
import PresentationIsabelle from '../components/PresentationIsabelle';
import PresentationServices from '../components/PresentationServices';
import PresentationAide from '../components/PresentationAide';
import Actus from '../components/Actus';
function Accueil() {
  return (
    <div className="divAccueil">
      <Logo />
      <PresentationIgerie/>
      <PresentationAide/>
      <PresentationServices/>
      <PresentationIsabelle/>
      <Actus/>
    </div>
  );
}

export default Accueil;