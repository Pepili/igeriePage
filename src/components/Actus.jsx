import React, {useEffect, useState, useRef} from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useSnackbar } from "notistack";

gsap.registerPlugin(ScrollTrigger);

function Actus() {
  const [articles, setArticles] = useState([]);
  const h3Ref = useRef(null);
  const { enqueueSnackbar } = useSnackbar();
  function formatDate(isoDate) {
    const date = new Date(isoDate);
    
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Les mois commencent à 0 en JavaScript
    const year = date.getFullYear();
  
    return `${day}/${month}/${year}`;
  }

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch(process.env.REACT_APP_API_URL + 'articles/home');
        const data = await response.json();
          if (data.error) {
            switch (data.errorCode) {
              case 3006:
                enqueueSnackbar(data.error, {
                  variant: "error",
                });
                break;
              case 9000:
                enqueueSnackbar(data.error, {
                  variant: "error",
                });
                break;
              default:
                enqueueSnackbar("Une erreur inconnue est survenue", {
                  variant: "error",
                });
            }
            return;
          }
        setArticles(data);
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };
    fetchArticles();

  if (window.innerWidth > 900) {
    gsap.fromTo(
      ".titleActu h3",
      { x: '-100%', opacity: 0 },
      {
        x: '0%',
        opacity: 1,
        duration: 1,
        scrollTrigger: {
          trigger: ".titleActu",
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
    <div style={{paddingBottom:"4em"}}>
      <div className='divActus'>
        <div className='titleActu'>
          <h3 ref={h3Ref}>Les dernières publications</h3>
        </div>
          <div className='divCentralArticle'>
              <div className='listNews'>
                {articles.map(article => (
                  <div key={article.id_article} className='itemArticle'>
                    <div className='textArticle' style={{backgroundImage: `url(${article.media})`, backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundPosition: "center"}}>
                      {article.text && <p>{article.text}</p>}
                    </div>
                    <h4>{article.titre}</h4>
                    <div className='smallArticle'>
                      <p>Thématique: {article.thematique}</p>
                      <p>Date: {formatDate(article.date_creation)}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className='divAccessArticle'>
                  <Link to="/articles" className='linkArticles'>Accéder aux articles <FontAwesomeIcon icon={faArrowRight} className='arrowIcon'/></Link>
              </div>
          </div>
      </div>
    </div>
  );
}

export default Actus;