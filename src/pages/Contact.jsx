import React, {useRef} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faPhone, faLocationDot} from '@fortawesome/free-solid-svg-icons';
import {faEnvelope} from '@fortawesome/free-regular-svg-icons';
import { faFacebook, faInstagram, faLinkedin, faTiktok, faSpotify, faDeezer} from '@fortawesome/free-brands-svg-icons';
import emailjs from '@emailjs/browser';
import { useSnackbar } from "notistack";


function Contact() {
  const form = useRef();
  const { enqueueSnackbar } = useSnackbar();
  const handleEnterPress = (e, nextFieldRef) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      nextFieldRef.current.focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = form.current.elements.email.value;
    const nom = form.current.elements.nom.value;
    const prenom = form.current.elements.prenom.value;
    const message = form.current.elements.message.value;

    if (!email.trim() || !nom.trim() || !prenom.trim() || !message.trim()) {
      enqueueSnackbar("Veuillez remplir tous les champs.", {
        variant: "error",
      });
      return;
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      enqueueSnackbar("Veuillez entrer une adresse email valide.", {
        variant: "error",
      });
      return;
    }

    emailjs
      .sendForm('service_c2a4i1i', 'template_1cq2riq', form.current, {
        publicKey: '7he9bMAXSuYYxcFeR',
      })
      .then(
        () => {
          enqueueSnackbar("Le message a bien été envoyé!", {
            variant: "success",
          });
          form.current.reset();
        },
        (error) => {
          enqueueSnackbar("Le mail n'a pas pu être envoyé...", {
            variant: "error",
          });
          console.log('FAILED...', error.text);
        },
      );
  };

  const nomRef = React.createRef();
  const prenomRef = React.createRef();
  const textRef = React.createRef();

  return (
    <div className="divContact">
        <div className='greenContact backgroundDiv'></div>
        <div className='redContact backgroundDiv'></div>
        <div className='contactIndex'>
          <h4>Contact</h4>
          <img src='/img/profil.jpg' alt='isabelle' className='profilContact'/>
          <div className='divCoordonnee'>
            <div className='utils'>
              <p><FontAwesomeIcon icon={faPhone} className='iconContact'/>06.03.59.50.17</p>
              <p><FontAwesomeIcon icon={faEnvelope} className='iconContact'/>isa.genest56@gmail.com</p>
              <p><FontAwesomeIcon icon={faLocationDot} className='iconContact'/> Saint-Jean-Brévelay, Bretagne</p>
            </div>
            <div className='reseau'>
              <a href='#' style={{gridColumn: '1', gridRow: '1'}}><FontAwesomeIcon icon={faFacebook} className='iconContact'/></a>
              <a href='#' style={{gridColumn: '2', gridRow: '1'}}><FontAwesomeIcon icon={faInstagram} className='iconContact'/></a>
              <a href='#' style={{gridColumn: '3', gridRow: '1'}}><FontAwesomeIcon icon={faLinkedin} className='iconContact'/></a>
              <a href='#' style={{gridColumn: '4', gridRow: '1'}}><FontAwesomeIcon icon={faTiktok} className='iconContact'/></a>
              <a href='#' style={{gridColumn: '2', gridRow: '2'}}><FontAwesomeIcon icon={faSpotify} className='iconContact'/></a>
              <a href='#' style={{gridColumn: '3', gridRow: '2'}}><FontAwesomeIcon icon={faDeezer} className='iconContact'/></a>
            </div>
          </div>
        </div>
        <h4 className='contactTitle'>Contactez moi!</h4>
        <div className='divMail'>
          <form className='contactForm' onSubmit={handleSubmit} ref={form}>
            <div className='champContact'>
              <label>*Mail</label>
              <input type='email' name='email' placeholder='votreEmail@exemple.com' onKeyDown={(e) => handleEnterPress(e, nomRef)}/>
            </div>
            <div className='champsId'>
              <div className='champContact'>
                <label>*Nom</label>
                <input ref={nomRef} type='text' name='nom' onKeyDown={(e) => handleEnterPress(e, prenomRef)}/>
              </div>
              <div className='champContact'>
                <label>*Prénom</label>
                <input ref={prenomRef} type='text' name='prenom' onKeyDown={(e) => handleEnterPress(e, textRef)}/>
              </div>
            </div>
            <div className='champContact messageContact'>
              <label>*Message</label>
              <textarea ref={textRef} name='message'></textarea>
            </div>
            <button type="submit" className='submitMail'>Envoyer</button>
          </form>
        </div>
    </div>
  );
}

export default Contact;