import React, {useEffect, useState} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useSnackbar } from "notistack";

function OneArticle() {
    const { enqueueSnackbar } = useSnackbar();
    const { id } = useParams();
    const navigate = useNavigate();
    const [article, setArticle] = useState({});
    const formatDateTime = (isoString) => {
        const date = new Date(isoString);
      
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Les mois sont indexés à partir de 0
        const year = date.getFullYear();
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
      
        return `${day}/${month}/${year} ${hours}:${minutes}`;
    };
    const fetchOne = async (id) => {
        const url = `${process.env.REACT_APP_API_URL}articles/${id}`;
        try {
          const response = await fetch(`${url}`);
          const data = await response.json();
          if (data.error) {
            switch (data.errorCode) {
              case 3003:
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
          const element = data[0];
          setArticle(element);
        } catch (error) {
          console.error('Fetch error:', error);
          return {};
        }
      };
    
      useEffect(() => {
        fetchOne(id);
      }, []);
      const handleReturn = async () => {
        navigate("/articles");
      };

  return (
    <div className="divOneArticle" style={article.media && !article.text ? {maxWidth: "1200px"} : {}}>
        <h1>{article.titre}</h1>
        <FontAwesomeIcon icon={faArrowLeft} className='iconReturn' onClick={handleReturn} />
        <div className='themDate'>
            <p>Thématique: {article.thematique}</p>
            <p>Date: {formatDateTime(article.date_creation)}</p>
        </div>
        <div className={article.media ? (article.text ? 'articleImage' : 'articleJustImage') : 'article' }>
            {article.media && (
              article.text 
                ? <div style={{backgroundImage: `url(${article.media})`}} className='imageArticle'></div> 
                : <img src={article.media} alt={article.titre} className='imageArticle' />
            )}
            {article.text ?
              <div className='textArticle'>
                  <p className='text'>{article.text}</p><br></br><br></br>
                  {article.quote && <p className='quote'>{article.quote}</p>}
              </div> :
              <div>
                {article.quote && <p className='quote'>{article.quote}</p>}
              </div>
            }
        </div>
    </div>
  );
}

export default OneArticle;