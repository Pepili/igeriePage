import React, { useState } from 'react';

function FormAdmin({token, id, enqueueSnackbar}) {
  const [type, setType] = useState('Article');
  const [title, setTitle] = useState('');
  const [theme, setTheme] = useState('');
  const [sousThemes, setSousThemes] = useState('');
  const [sousThemeList, setSousThemeList] = useState([]);
  const [image, setImage] = useState(null);
  const [text, setText] = useState('');
  const [quote, setQuote] = useState('');
  const [source, setSource] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleTypeChange = (e) => {
    setType(e.target.value);
    setErrorMessage('');
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    setErrorMessage('');
  };

  const handleSourceChange = (e) => {
    setSource(e.target.value);
    setErrorMessage('');
  };

  const handleThemeChange = (e) => {
    setTheme(e.target.value);
    setErrorMessage('');
  };

  const handleSousThemesChange = (e) => {
    setSousThemes(e.target.value);
    setErrorMessage('');
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const name = file.name;
    document.getElementById('file-name').innerText = name;
    setImage(file);
    setErrorMessage('');
  };

  const handleTextChange = (e) => {
    setText(e.target.value);
    setErrorMessage('');
  };

  const handleQuoteChange = (e) => {
    setQuote(e.target.value);
    setErrorMessage('');
  };

  const handleAddSubTheme = () => {
    if (sousThemes.trim() !== '') {
        if (sousThemeList.length < 3) {
          setSousThemeList([...sousThemeList, sousThemes.trim()]);
          setSousThemes('');
          setErrorMessage('');
        } else {
          setErrorMessage('Vous avez atteint la limite de 3 sous-thèmes.');
        }
      } else {
        setErrorMessage('Le champ des sous-thèmes est vide.');
      }
  };

  const handleDeleteSubTheme = (indexToRemove) => {
    // Créer une nouvelle liste en excluant l'élément à supprimer
    const updatedSousThemeList = sousThemeList.filter((_, index) => index !== indexToRemove);
    // Mettre à jour l'état avec la nouvelle liste
    setSousThemeList(updatedSousThemeList);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Logique pour soumettre les données, par exemple : envoyer à l'API
    const formData = new FormData();
    formData.append('id_utilisateur', id);
    formData.append('type', type);
    formData.append('titre', title);
    formData.append('thematique', theme);
    formData.append('filtre', sousThemeList.join(','));
    formData.append('media', image);
    formData.append('text', text);
    formData.append('quote', quote);
    if(type === 'Annexe') {
        formData.append('source', source);
    }
    try {
      let data;
        if(type === 'Annexe') {
            const response = await fetch(process.env.REACT_APP_API_URL + 'annexes', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                  },
                body: formData,
              });
              data = await response.json();
              if (data.error) {
                switch (data.errorCode) {
                  case 3000:
                    enqueueSnackbar(data.error, {
                      variant: "error",
                    });
                    break;
                  case 3001:
                    enqueueSnackbar("Titre et Thématique sont obligatoires", {
                      variant: "error",
                  });
                  break;
                  case 9000:
                    enqueueSnackbar("Erreur serveur", {
                      variant: "error",
                    });
                    break;
                  default:
                    enqueueSnackbar("Une erreur inconnue est survenue", {
                      variant: "error",
                    });
                }
                return;
              } else {
                  enqueueSnackbar("L'annexe a été ajouté avec succès!", {
                    variant: "success",
                  });
              }
        } else {
            const response = await fetch(process.env.REACT_APP_API_URL + 'articles', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                  },
                body: formData,
              });
              data = await response.json();
              if (data.error) {
                switch (data.errorCode) {
                  case 4000:
                    enqueueSnackbar(data.error, {
                      variant: "error",
                    });
                    break;
                  case 4001:
                    enqueueSnackbar("Titre et Thématique sont obligatoires", {
                      variant: "error",
                  });
                  break;
                  case 9000:
                    enqueueSnackbar("Erreur serveur", {
                      variant: "error",
                    });
                    break;
                  default:
                    enqueueSnackbar("Une erreur inconnue est survenue", {
                      variant: "error",
                    });
                }
                return;
              } else {
                  enqueueSnackbar("L'article a été ajouté avec succès!", {
                    variant: "success",
                  });
              }
        }
      // Ajoutez ici la gestion de la réponse de l'API
    } catch (error) {
      console.error('Erreur lors de la soumission du formulaire :', error);
    }
  };

  const handleEnterPress = (e, nextFieldRef) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      nextFieldRef.current.focus();
    }
  };
  const handleEnterClick = (e, nextButton) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      nextButton.current.click();
    }
  };


  const titleRef = React.createRef();
  const themeRef = React.createRef();
  const sousThemesRef = React.createRef();
  const plusRef = React.createRef();
  const quoteRef = React.createRef();
  const sourceRef = React.createRef();
  const buttonRef = React.createRef();

  return (
    <form onSubmit={handleSubmit}>
      <div className='champDiv'>
        <div className='radioType'>
          <div className="form__radio-group">
            <input type="radio" id="article" className="form__radio-input" value="Article" checked={type === "Article"} onChange={handleTypeChange} onClick={() => setErrorMessage('')}/>
            <label htmlFor="article" className="form__radio-label">
              <span className="form__radio-button"></span>
              <span className="form__radio-label-text"> Article</span>
            </label>
          </div>
          <div className="form__radio-group annexeRadio">
            <input type="radio"  id="annexe"className="form__radio-input" value="Annexe" checked={type === "Annexe"} onChange={handleTypeChange} onClick={() => setErrorMessage('')}/>
            <label htmlFor="annexe" className="form__radio-label">
              <span className="form__radio-button"></span>Annexe
            </label>
          </div>
        </div>        
      </div>
      <div className='champDiv'>
        <label>*Titre</label>
        <input type="text" ref={titleRef} value={title} className='inputText' onChange={handleTitleChange} onClick={() => setErrorMessage('')} placeholder='Indiquez un titre ici...' onKeyDown={(e) => handleEnterPress(e, themeRef)}/>
      </div>
      <div className='champDiv'>
        <label>*Thématique</label>
        <select value={theme} ref={themeRef} onChange={handleThemeChange} onClick={() => setErrorMessage('')} onKeyDown={(e) => handleEnterPress(e, sousThemesRef)}>
          <option value="" disabled>Sélectionner une thématique</option>
          <option value="Bien-être" >Bien-être</option>
          <option value="philosophie">Philosophie</option>
          <option value="Conseil">Conseil</option>
        </select>
      </div>
      <div className='champDiv'>
        <label>Sous-thématiques</label>
        <div className='divSoustheme'>
          <input ref={sousThemesRef} type="text" className='inputText sousTheme' value={sousThemes} onChange={handleSousThemesChange} placeholder="Sous-thématique" onClick={() => setErrorMessage('')} onKeyDown={(e) => handleEnterClick(e, plusRef)}/>
          <button type="button" onClick={handleAddSubTheme} className='buttonAdd' ref={plusRef}>+</button>
        </div>
        <div className='listSousTheme'>
          {sousThemeList.map((sousTheme, index) => (
            <div className='textSoustheme' key={index}>
              <p key={index} >{sousTheme}</p>
              <button type="button" onClick={() => handleDeleteSubTheme(index)} className='buttonDelete' key={index + "Button"}>x</button>
            </div>
          ))}
        </div>
        {errorMessage && <p style={{ backgroundColor: "#851A15", color: "#F6EBE2", textAlign: "center", marginTop: "15px"}}>{errorMessage}</p>}
      </div>
      <div className='champDiv'>
        <p className='labelImage'>Image</p>
        <div className="file-input-container">
            <input type="file" className="sm-input-file" id="sm-ip-1" accept="image/*" onChange={handleImageChange} onClick={() => setErrorMessage('')}/>
            <label className="for-sm-input-file" htmlFor="sm-ip-1">Ajouter</label>
            <span className="span-text" id="file-name">Choisisser une image...</span>
        </div>
      </div>
      <div className='champDiv'>
        <label>Texte</label>
        <textarea id="story" name="story" rows="5" cols="33" className='inputText' value={text} onChange={handleTextChange} onClick={() => setErrorMessage('')} >
        </textarea>
      </div>
      <div className='champDiv'>
        <label>Quote</label>
        <input type="text" ref={quoteRef} className='inputText' value={quote} onChange={handleQuoteChange} onClick={() => setErrorMessage('')} placeholder='Indiquez une annotation ici...' onKeyDown={type === "Annexe" ? (e) => handleEnterPress(e, sourceRef) : (e) => handleEnterClick(e, buttonRef)}/>
      </div>
      {type === 'Annexe' && <div className='champDiv'><label>Source:</label><input type="text" className='inputText' ref={sourceRef} value={source} onChange={handleSourceChange} onClick={() => setErrorMessage('')} placeholder='Indiquer la source...' onKeyDown={(e) => handleEnterClick(e, buttonRef)}/></div>}
      <button type="submit" ref={buttonRef} className='submitArticle'>Soumettre</button>
    </form>
  );
}

export default FormAdmin;
