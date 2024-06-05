import { useMemo, useState, useEffect, useCallback } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from "notistack";

export default function useRows() {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  function formatTimestamp(timestamp) {
    const date = new Date(timestamp);
    const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    const month = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

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
      return data.map(item => ({
        type: 'Article',
        titre: item.titre,
        thematique: item.thematique,
        quote: item.quote || '',
        dateCreation: formatTimestamp(item.date_creation) || '',
        id: <FontAwesomeIcon icon={faPen} onClick={() => handleModify(item.id_article, 'article')} style={{ cursor: "pointer" }} />,
        idDelete: <FontAwesomeIcon icon={faTrash} onClick={() => handleDelete(item.id_article, 'article')} style={{ cursor: "pointer" }} />
      }));
    } catch (error) {
      console.error('Fetch error:', error);
      return [];
    }
  };

  const fetchAnnexes = async () => {
    try {
      const response = await fetch(process.env.REACT_APP_API_URL + 'annexes');
      const data = await response.json();
      if (data.error) {
        switch (data.errorCode) {
          case 2003:
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
      return data.map(item => ({
        type: 'Annexe',
        titre: item.titre,
        thematique: item.thematique,
        quote: item.quote || '',
        dateCreation: formatTimestamp(item.date_creation) || '',
        id: <FontAwesomeIcon icon={faPen} onClick={() => handleModify(item.id_annexe, 'annexe')} style={{ cursor: "pointer" }} />,
        idDelete: <FontAwesomeIcon icon={faTrash} onClick={() => handleDelete(item.id_annexe, 'annexe')} style={{ cursor: "pointer" }} />
      }));
    } catch (error) {
      console.error('Fetch error:', error);
      return [];
    }
  };

  const fetchData = async () => {
    const articles = await fetchArticles();
    const annexes = await fetchAnnexes();
    setItems([...articles, ...annexes]);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchDelete = async (id, type, token) => {
    const date = new Date();
    const mysqlDate = date.toISOString().slice(0, 10);
    const url = type === "article" ? `${process.env.REACT_APP_API_URL}articles/delete/${id}` : `${process.env.REACT_APP_API_URL}annexes/delete/${id}`;
    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id_utilisateur: Number(sessionStorage.getItem("id")), date_suppression: mysqlDate}),
      });
      const data = await response.json();
      if (type === "article") {
        if (data.error) {
          switch (data.errorCode) {
            case 3005:
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
      if (data.message) {
        enqueueSnackbar(type === "article" ? "Article supprimé avec succès!" : "Annexe supprimé avec succès!", { variant: "success" });
        fetchData();  // Refresh the data after a successful delete
      }
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  const handleModify = useCallback((id, type) => {
    navigate(`/modify/${id}/${type}`);
  }, [navigate]);

  const handleDelete = useCallback((id, type) => {
    const isConfirmed = window.confirm("Êtes-vous sûr de vouloir supprimer cet article?");
    if (isConfirmed) {
      fetchDelete(id, type, sessionStorage.getItem("token"));
    }
  }, []);

  const rows = useMemo(() => items, [items]);

  return rows;
}

