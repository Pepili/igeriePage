import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useSnackbar } from "notistack";

class Tabs extends React.Component {
  state = {
    activeTab: this.props.children[0].props.label
  };

  changeTab = (tab) => {
    this.setState({ activeTab: tab });
  };

  render() {
    let content;
    let buttons = [];
    return (
      <div className='modifyTab'>
        {React.Children.map(this.props.children, child => {
          buttons.push(child.props.label);
          if (child.props.label === this.state.activeTab) content = child.props.children;
        })}

        <TabButtons activeTab={this.state.activeTab} buttons={buttons} changeTab={this.changeTab} />
        <div className="modify-content">{content}</div>
      </div>
    );
  }
}

const TabButtons = ({ buttons, changeTab, activeTab }) => {
  return (
    <div className="modify-buttons">
      {buttons.map((button, index) => (
        <button key={index} className={button === activeTab ? 'active' : ''} onClick={() => changeTab(button)}>
          {button}
        </button>
      ))}
    </div>
  );
};

const Tab = props => {
  return <React.Fragment>{props.children}</React.Fragment>;
};

function Modify({ verifyToken }) {
  const navigate = useNavigate();
  const id_utilisateur = Number(sessionStorage.getItem("id"));
  const token = sessionStorage.getItem("token");
  const { id, type } = useParams();
  const [errorMessage, setErrorMessage] = useState('');
  const { enqueueSnackbar } = useSnackbar();

  const [title, setTitle] = useState('');
  const [originalTitle, setOriginalTitle] = useState('');
  const [theme, setTheme] = useState('');
  const [originalTheme, setOriginalTheme] = useState('');
  const [sousThemes, setSousThemes] = useState('');
  const [sousThemeList, setSousThemeList] = useState([]);
  const [originalSousThemeList, setOriginalSousThemeList] = useState([]);
  const [image, setImage] = useState(null);
  const [originalImage, setOriginalImage] = useState(null);
  const [text, setText] = useState('');
  const [originalText, setOriginalText] = useState('');
  const [quote, setQuote] = useState('');
  const [originalQuote, setOriginalQuote] = useState('');
  const [source, setSource] = useState('');
  const [originalSource, setOriginalSource] = useState('');

  useEffect(() => {
    verifyToken(id_utilisateur, token, navigate);
  }, [navigate]);

  const handleReturn = async () => {
    navigate("/admin");
  };

  const fetchOne = async (id, type) => {
    const url = type === "article" ? `${process.env.REACT_APP_API_URL}articles/${id}` : `${process.env.REACT_APP_API_URL}annexes/${id}`;
    try {
      const response = await fetch(`${url}`);
      const data = await response.json();
      if(type === "annexe") {
        if (data.error) {
          switch (data.errorCode) {
            case 2006:
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
      } else {
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
      }

      const element = data[0];
      setTitle(element.titre);
      setOriginalTitle(element.titre);
      setImage(element.media);
      setOriginalImage(element.media);
      setTheme(element.thematique);
      setOriginalTheme(element.thematique);
      if (element.filtre.includes(',')) {
        setSousThemeList(element.filtre.split(',').map(item => item.trim()));
        setOriginalSousThemeList(element.filtre.split(',').map(item => item.trim()));
      } else if (element.filtre.trim().length > 0) {
        setSousThemeList([element.filtre.trim()]);
        setOriginalSousThemeList([element.filtre.trim()]);
      }
      setText(element.text);
      setOriginalText(element.text);
      setQuote(element.quote);
      setOriginalQuote(element.quote);
      if (type === "annexe") {
        setSource(element.source);
        setOriginalSource(element.source);
      }
    } catch (error) {
      console.error('Fetch error:', error);
      return {};
    }
  };

  useEffect(() => {
    fetchOne(id, type);
  }, []);

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
    const updatedSousThemeList = sousThemeList.filter((_, index) => index !== indexToRemove);
    setSousThemeList(updatedSousThemeList);
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

  const buttonRef = React.createRef();
  const textareaRef = React.createRef();
  const titleRef = React.createRef();
  const themeRef = React.createRef();
  const sousThemesRef = React.createRef();
  const plusRef = React.createRef();
  const quoteRef = React.createRef();
  const sourceRef = React.createRef();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedFields = {};
    if (title !== originalTitle) updatedFields.titre = title;
    if (theme !== originalTheme) updatedFields.thematique = theme;
    if (JSON.stringify(sousThemeList) !== JSON.stringify(originalSousThemeList)) updatedFields.filtre = sousThemeList.join(', ');
    if (text !== originalText) updatedFields.text = text;
    if (quote !== originalQuote) updatedFields.quote = quote;
    if (type === "annexe" && source !== originalSource) updatedFields.source = source;

    const url = type === "article" ? `${process.env.REACT_APP_API_URL}articles/${id}` : `${process.env.REACT_APP_API_URL}annexes/${id}`;
    const response = await fetch(`${url}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ ...updatedFields, id_utilisateur })
    });
    const data = await response.json();
    if(type === "annexe") {
      if (data.error) {
        switch (data.errorCode) {
          case 2004:
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
    } else {
      if (data.error) {
        switch (data.errorCode) {
          case 3004:
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
    }
      enqueueSnackbar(type === "article" ? "L'article a été modifié avec succès!" : "L'annexe a été modifiée avec succès!", {
        variant: "success",
      });
  };

  const handleImage = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('media', image);
    formData.append('id_utilisateur', id_utilisateur);
    const url = type === "article" ? `${process.env.REACT_APP_API_URL}articles/${id}` : `${process.env.REACT_APP_API_URL}annexes/${id}`;
    const response = await fetch(`${url}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: formData
    });
    const data = await response.json();
    if(type === "annexe") {
      if (data.error) {
        switch (data.errorCode) {
          case 2004:
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
    } else {
      if (data.error) {
        switch (data.errorCode) {
          case 3004:
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
    }
    setOriginalImage(data.media);
    enqueueSnackbar("L'image a été modifié avec succès!", {
      variant: "success",
    });
  };
  return (
    <div className="divModify">
      <div className='headerModify'>
        <FontAwesomeIcon icon={faArrowLeft} className='iconReturn' onClick={handleReturn} />
        <img src={ process.env.PUBLIC_URL +'/img/logo1.png'} alt='logo' />
      </div>
      <Tabs>
        <Tab label="Texte">
          <form onSubmit={handleSubmit}>
            <div className='champDivModify modifyText'>
              <textarea ref={textareaRef} id="story" name="story" rows="5" cols="33" className='inputTextModify' value={text} onChange={handleTextChange}>
              </textarea>
            </div>
            <button type="submit" ref={buttonRef} className='modifyArticle'>Modifier le texte</button>
          </form>
        </Tab>
        <Tab label="Media">
          <form onSubmit={handleImage} className='formImage'>
            {image ? <img src= {originalImage} alt="media" className='imageModify' /> : <p>Cet {type} n'a actuellement aucune image</p>}
            <div className="file-input-container">
              <input type="file" className="sm-input-file" id="sm-ip-1" accept="image/*" onChange={handleImageChange} onClick={() => setErrorMessage('')}/>
              <label className="for-sm-input-file" htmlFor="sm-ip-1">Ajouter</label>
              <span className="span-text" id="file-name">Choisisser une image...</span>
            </div>
            <button type="submit" ref={buttonRef} className='modifyArticle'>Modifier l'image</button>
          </form>          
        </Tab>
        <Tab label="Autres">
          <form onSubmit={handleSubmit} className='formOther'>
            <div className='champDivModify'>
              <label>*Titre</label>
              <input type="text" ref={titleRef} value={title} className='inputText' onChange={handleTitleChange} onClick={() => setErrorMessage('')} placeholder='Indiquez un titre ici...' onKeyDown={(e) => handleEnterPress(e, themeRef)} />
            </div>
            <div className='champDivModify'>
              <label>*Thématique</label>
              <select value={theme} ref={themeRef} onChange={handleThemeChange} onClick={() => setErrorMessage('')} onKeyDown={(e) => handleEnterPress(e, sousThemesRef)}>
                <option value="" disabled>Sélectionner une thématique</option>
                <option value="Bien-être" >Bien-être</option>
                <option value="philosophie">Philosophie</option>
                <option value="Conseil">Conseil</option>
              </select>
            </div>
            <div className='champDivModify'>
              <label>Sous-thématiques</label>
              <div className='divSoustheme'>
                <input ref={sousThemesRef} type="text" className='inputText sousTheme' value={sousThemes} onChange={handleSousThemesChange} placeholder="Sous-thématique" onClick={() => setErrorMessage('')} onKeyDown={(e) => handleEnterClick(e, plusRef)} />
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
              {errorMessage && <p style={{ backgroundColor: "#851A15", color: "#F6EBE2", textAlign: "center", marginTop: "15px" }}>{errorMessage}</p>}
            </div>
            <div className='champDivModify'>
              <label>Quote</label>
              <input type="text" ref={quoteRef} className='inputText' value={quote} onChange={handleQuoteChange} onClick={() => setErrorMessage('')} placeholder='Indiquez une annotation ici...' onKeyDown={type === "Annexe" ? (e) => handleEnterPress(e, sourceRef) : (e) => handleEnterClick(e, buttonRef)} />
            </div>
            {type === 'annexe' && <div className='champDivModify'><label>Source:</label><input type="text" className='inputText' ref={sourceRef} value={source} onChange={handleSourceChange} onClick={() => setErrorMessage('')} placeholder='Indiquer la source...' onKeyDown={(e) => handleEnterClick(e, buttonRef)} /></div>}
            <button type="submit" ref={buttonRef} className='modifyArticle'>Modifier</button>
          </form>
        </Tab>
      </Tabs>
    </div>
  );
}

export default Modify;
