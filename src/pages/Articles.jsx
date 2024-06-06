import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpWideShort, faArrowDownWideShort, faFilter } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useSnackbar } from "notistack";

function Articles() {
  const { enqueueSnackbar } = useSnackbar();
  const [articles, setArticles] = useState([]);
  const [sortOrder, setSortOrder] = useState('desc');
  const [thematique, setThematique] = useState([]);
  const [subThematique, setSubThematique] = useState([]);
  const [selectedThemes, setSelectedThemes] = useState([]);
  const [selectedSubThemes, setSelectedSubThemes] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [visibleArticles, setVisibleArticles] = useState(9);
  const themeOptions = thematique.map(theme => ({ value: theme, label: theme }));
  const subThemeOptions = subThematique.map(subTheme => ({ value: subTheme, label: subTheme }));

  function formatDate(isoDate) {
    const date = new Date(isoDate);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

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
        const allFiltre = data.map(article => article.filtre.split(',').map(f => f.trim()));
        const flattenedFiltre = allFiltre.flat().filter(f => f !== '');
        const filterSubThemes = Array.from(new Set(flattenedFiltre));
        const filterThemes = Array.from(new Set(allThemes));
        setThematique(filterThemes);
        setSubThematique(filterSubThemes);
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };
    fetchArticles();
  }, []);

  const filterArticles = () => {
    let filteredArticles = articles;
    if (selectedThemes.length > 0) {
      filteredArticles = filteredArticles.filter(article => selectedThemes.includes(article.thematique));
    }
    if (selectedSubThemes.length > 0) {
      filteredArticles = filteredArticles.filter(article => {
        const articleFiltres = article.filtre.split(',').map(f => f.trim());
        return selectedSubThemes.some(subTheme => articleFiltres.includes(subTheme));
      });
    }
    return filteredArticles;
  };

  const sortArticles = (order) => {
    const sortedArticles = [...articles].sort((a, b) => {
      const dateA = new Date(a.date_creation);
      const dateB = new Date(b.date_creation);
      return order === 'asc' ? dateA - dateB : dateB - dateA;
    });
    setArticles(sortedArticles);
  };

  const toggleSortOrder = () => {
    const newSortOrder = sortOrder === 'desc' ? 'asc' : 'desc';
    setSortOrder(newSortOrder);
    sortArticles(newSortOrder);
  };

  const toggleFilters = () => {
    setShowFilters(prevShowFilters => !prevShowFilters);
  };

  const loadMoreArticles = () => {
    setVisibleArticles(prevVisibleArticles => prevVisibleArticles + 9); // Augmente le nombre d'articles visibles de 10
  };

  return (
    <div className="divArticles">
      <div className='logo logoArticle'>
        <Link to="/"><img alt="logo" src={ process.env.PUBLIC_URL +"/img/logo1.png"} className="imglogo"/></Link>
        <p>Igerie coaching de vie</p>
      </div>
      <div className='titleArticle'>
        <div className='filtreArticle'>
          {sortOrder === 'desc' ? (
            <FontAwesomeIcon icon={faArrowUpWideShort} className='icon recent' onClick={toggleSortOrder} />
          ) : (
            <FontAwesomeIcon icon={faArrowDownWideShort} className='icon vieux' onClick={toggleSortOrder} />
          )}
          <FontAwesomeIcon icon={faFilter} className='icon' onClick={toggleFilters}/>
        </div>
        <h2>Articles</h2>
      </div>
      {showFilters && (
        <div className='filters'>
          <Select
            isMulti
            options={themeOptions}
            value={selectedThemes.map(theme => ({ value: theme, label: theme }))}
            onChange={selectedOptions => {
              if (selectedOptions.length <= 3) { // Limiter à 3 options
                setSelectedThemes(selectedOptions.map(option => option.value))
              }
            }}
            placeholder='Filtrer par thématique'
            styles={{
              control: (base, state) => ({
                ...base,
                width: 400, // Largeur en pixels
                height: 50, // Hauteur en pixels
                cursor: 'pointer',
                border: '1px solid #677050',
                backgroundColor: '#F6EBE2',
                borderColor: state.isFocused || state.isHovered ? '#677050' : base.borderColor,
                boxShadow: state.isFocused  || state.isHovered ? '0 0 0 1px #677050' : base.boxShadow,
              }),
              menu: (base) => ({
                ...base,
                margin: 0, // Retirer les marges
                cursor: 'pointer',
                backgroundColor: '#F6EBE2',
              }),
              option: (base, state) => ({
                ...base,
                cursor: 'pointer',
                backgroundColor: state.isFocused ? '#677050' : base.backgroundColor,
                color: state.isFocused ? 'white' : base.color,
              }),
              multiValue: (base) => ({
                ...base,
                maxWidth: '30%',
                backgroundColor: '#677050',
                color: "#F6EBE2"
              }),
              multiValueLabel: (base) => ({
                ...base,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                maxWidth: '100%',
                color: "#F6EBE2"
              }),
            }}
          />

          <Select
            isMulti
            options={subThemeOptions}
            value={selectedSubThemes.map(subTheme => ({ value: subTheme, label: subTheme }))}
            onChange={selectedOptions => {
              if (selectedOptions.length <= 3) { // Limiter à 3 options
                setSelectedSubThemes(selectedOptions.map(option => option.value))
              }
            }}
            placeholder='Filtrer par sous-thématique'
            styles={{
              control: (base, state) => ({
                ...base,
                width: 400, // Largeur en pixels
                height: 50, // Hauteur en pixels
                cursor: 'pointer',
                border: '1px solid #677050',
                backgroundColor: '#F6EBE2',
                borderColor: (state.isFocused || state.isHovered) || (state.isSelected) ? '#677050' : base.borderColor,
                boxShadow: state.isFocused || state.isHovered ? '0 0 0 1px #677050' : base.boxShadow,
              }),
              menu: (base) => ({
                ...base,
                margin: 0, // Retirer les marges
                cursor: 'pointer',
                backgroundColor: '#F6EBE2',
              }),
              option: (base, state) => ({
                ...base,
                cursor: 'pointer',
                backgroundColor: state.isFocused ? '#677050' : base.backgroundColor,
                color: state.isFocused ? 'white' : base.color,
              }),
              multiValue: (base) => ({
                ...base,
                maxWidth: '30%',
                backgroundColor: '#677050',
                color: "#F6EBE2"
              }),
              multiValueLabel: (base) => ({
                ...base,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                maxWidth: '100%',
                color: "#F6EBE2"
              }),
            }}
          />
        </div>
      )}
      <div className='listArticles'>
        {filterArticles().slice(0, visibleArticles).map(article => (
          <Link to={`/oneArticle/${article.id_article}`} key={article.id_article}>
            <div className='itemArticle'>
              <div className='textArticle' style={{backgroundImage: `url(${article.media})`, backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundPosition: "center"}}>
                <p>{article.text}</p>
              </div>
              <h4>{article.titre}</h4>
              <div className='smallArticle'>
                <p>Thématique: {article.thematique}</p>
                <p>Date: {formatDate(article.date_creation)}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <div className='divBoutonVoir'>
        {visibleArticles < filterArticles().length && (
          <button onClick={loadMoreArticles} className='boutonVoir'>Voir plus d'article ...</button>
        )}
      </div>
    </div>
  );
}

export default Articles;

