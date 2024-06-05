import { useMemo, useState, useEffect } from "react";

export default function useColumns() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const columns = useMemo(() => {
    let dynamicColumns = [
      {
        Header: "Type",
        accessor: "type"
      },
      {
        Header: "Titre",
        accessor: "titre"
      },
      {
        Header: "Date",
        accessor: "dateCreation"
      },
      {
        Header: "Modification",
        accessor: "id"
      },
      {
        Header: "Suppression",
        accessor: "idDelete"
      }
    ];

    // Condition pour afficher la colonne Thématique en fonction de la largeur de la fenêtre
    if (windowWidth > 780) {
      dynamicColumns.splice(2, 0, {
        Header: "Thématique",
        accessor: "thematique"
      });
    }

    // Condition pour afficher la colonne Quote en fonction de la largeur de la fenêtre
    if (windowWidth > 780) {
      dynamicColumns.splice(4, 0, {
        Header: "Quote",
        accessor: "quote"
      });
    }

    return dynamicColumns;
  }, [windowWidth]);

  return columns;
}

