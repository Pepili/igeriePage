import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSnackbar } from "notistack";

const Roue = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [articles, setArticles] = useState([]);
  const [thematique, setThematique] = useState([]);
  const [rotate, setRotate] = useState(0); // DEGREES
  const [easeOut, setEaseOut] = useState(0); // SECONDS
  const [angle, setAngle] = useState(0); // RADIANS
  const [top, setTop] = useState(null); // INDEX
  const [offset, setOffset] = useState(null); // RADIANS
  const colors = ["#677050", "#851A15", "#4B0F0B"];
  const [resultArticle, setResultArticle] = useState(null);

  const [radius, setRadius] = useState(window.innerWidth < 680 ? 130 : 130);
  const [textRadius, setTextRadius] = useState(window.innerWidth < 680 ? 150 : 150);

  useEffect(() => {
  const handleResize = () => {
    setRadius(window.innerWidth < 680 ? 130 : 90);
    setTextRadius(window.innerWidth < 680 ? 100 : 150); // Mettez à jour textRadius en fonction de la taille de l'écran
  };
  console.log(radius)
  window.addEventListener('resize', handleResize);

  // Nettoyer l'écouteur d'événement lors du démontage du composant
  return () => {
    window.removeEventListener('resize', handleResize);
  };
  }, []); // Exécuter une fois au montage du composant

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch(process.env.REACT_APP_API_URL + 'articles');
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
        const sortedArticles = data.sort((a, b) => new Date(b.date_creation) - new Date(a.date_creation));
        setArticles(sortedArticles);
        const allThemes = data.map(article => article.thematique);
        const filterThemes = Array.from(new Set(allThemes));
        setThematique(filterThemes);
        renderWheel(filterThemes);
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };
    fetchArticles();
  }, []);

  const renderWheel = (thematique) => {
    // determine number/size of sectors that need to created
    let numOptions = thematique.length;
    let arcSize = (2 * Math.PI) / numOptions;
    setAngle(arcSize);

    // get index of starting position of selector
    topPosition(numOptions, arcSize);

    // dynamically generate sectors from state list
    let angle = 0;
    for (let i = 0; i < numOptions; i++) {
      let text = thematique[i];
      renderSector(i + 1, text, angle, arcSize, getColor(i));
      angle += arcSize;
    }
  };

  const topPosition = (num, angle) => {
    // set starting index and angle offset based on list length
    // works upto 9 options
    let topSpot = null;
    let degreesOff = null;
    if (num === 9) {
      topSpot = 7;
      degreesOff = Math.PI / 2 - angle * 2;
    } else if (num === 8) {
      topSpot = 6;
      degreesOff = 0;
    } else if (num <= 7 && num > 4) {
      topSpot = num - 1;
      degreesOff = Math.PI / 2 - angle;
    } else if (num === 4) {
      topSpot = num - 1;
      degreesOff = 0;
    } else if (num <= 3) {
      topSpot = num;
      degreesOff = Math.PI / 2;
    }

    setTop(topSpot - 1);
    setOffset(degreesOff);
  };

  const renderSector = (index, text, start, arc, color) => {
    // create canvas arc for each list element
    let canvas = document.getElementById("wheel");
    let ctx = canvas.getContext("2d");
    let x = canvas.width / 2;
    let y = canvas.height / 2;
    let startAngle = start;
    let endAngle = start + arc;
    let angle = index * arc;
    let baseSize = radius * 3.33;

    ctx.beginPath();
    ctx.arc(x, y, radius, startAngle, endAngle, false);
    ctx.lineWidth = radius * 2;
    ctx.strokeStyle = color;

    ctx.font = "18px Inter";
    ctx.fillStyle = "#F6EBE2";
    ctx.stroke();

    ctx.save();
    ctx.translate(
      baseSize + Math.cos(angle - arc / 2) * textRadius -120,
      baseSize + Math.sin(angle - arc / 2) * textRadius -120
    );
    ctx.rotate(angle - arc / 2 + Math.PI / 2);
    ctx.fillText(text, -ctx.measureText(text).width / 2, 0);
    ctx.restore();
  };

  const getColor = (index) => {
     return colors[index % colors.length];
  };

  const spin = () => {
    // set random spin degree and ease out time
    // set state variables to initiate animation
    let randomSpin = Math.floor(Math.random() * 900) + 500;
    setRotate(prevRotate => prevRotate + randomSpin); // Ajoutez la rotation actuelle à la nouvelle rotation
    setEaseOut(2);

    // calculate result after wheel stops spinning
    setTimeout(() => {
      getResult(randomSpin + rotate); // Ajoutez la rotation actuelle à la nouvelle rotation
    }, 2000);
  };

  const getResult = (spin) => {
    // find net rotation and add to offset angle
    // repeat substraction of inner angle amount from total distance traversed
    // use count as an index to find value of result from state list
    let netRotation = ((spin % 360) * Math.PI) / 180; // RADIANS
    let travel = netRotation + offset;
    let count = top + 1;
    while (travel > 0) {
      travel = travel - angle;
      count--;
    }
    let result;
    if (count >= 0) {
      result = count;
    } else {
      result = thematique.length + count;
    }

    // get a random article with the selected theme
    getRandomArticle(thematique[result % thematique.length]);
  };

  const getRandomArticle = (theme) => {
    // filter articles by theme
    const filteredArticles = articles.filter(article => article.thematique === theme);

    // select a random article
    const randomArticle = filteredArticles[Math.floor(Math.random() * filteredArticles.length)];

    // update state
    setResultArticle(randomArticle);
  };

  const resetArticle = (event) => {
    event.stopPropagation();
    setResultArticle(null);
  };

  return (
  <div className="roueDiv">
    <h1>Tournez la roue de l'épanouissement</h1>
    <span id="selector">&#9660;</span>
    <canvas
      id="wheel"
      width="600"
      height="600"
      style={{
        WebkitTransform: `rotate(${rotate}deg)`,
        WebkitTransition: `-webkit-transform ${easeOut}s ease-out`
      }}
    />

      <button type="button" id="spin" onClick={spin}>
        Appuyer
      </button>
    {resultArticle &&
      <div className={`display ${resultArticle ? 'fade-in' : 'hidden'}`}>
        <h3 id="result">Je vous propose de regarder l'article suivant:</h3>
        <Link to={`/oneArticle/${resultArticle.id_article}`} key={resultArticle.id_article} onClick={(event) => resetArticle(event)}>
          <div className='itemArticle'>
            <div className='textArticle' style={{backgroundImage: `url(${resultArticle.media})`, backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundPosition: "center"}}>
              <p>{resultArticle.text}</p>
            </div>
            <h4>{resultArticle.titre}</h4>
            <div className='smallArticle'>
              <p>Thématique: {resultArticle.thematique}</p>
            </div>
          </div>
        </Link>
        <button className="close-btn" onClick={(event) => resetArticle(event)}>Retour</button>
      </div>
    }
  </div>
  );
};

export default Roue;