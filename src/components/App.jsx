import React, {} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Accueil from '../pages/Accueil';
import Igerie from '../pages/Igerie';
import Biographie from '../pages/Biographie';
import Articles from '../pages/Articles';
import Bibliotheques from '../pages/Bibliotheques';
import Roue from '../pages/Roue';
import Services from "../pages/Services";
import Contact from '../pages/Contact';
import ConnexionAdmin from '../pages/ConnexionAdmin';
import Admin from "../pages/Admin";
import Modify from "../pages/Modify";
import OneArticle from "../pages/OneArticle";
import OneAnnexe from "../pages/OneAnnexe";
import { SnackbarProvider } from "notistack";
// Components
import Header from './Header';
import Footer from './Footer';

function App() {

  const verifyToken = async (id, token, navigate) => {
    if (!token || !id) {
      navigate("/connexionAdmin");
      return;
    }
    try {
      const response = await fetch(process.env.REACT_APP_API_URL + 'utilisateurs/verifyToken/', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id_utilisateur: id }),
      });
      if (!response.ok) {
        throw new Error('Token invalide');
      }

      const data = await response.json();

      if (!data.valid) {
        sessionStorage.removeItem("id");
        sessionStorage.removeItem("token");
        navigate("/connexionAdmin");
        return;
      }

      if (id !== data.userId) {
        sessionStorage.removeItem("id");
        sessionStorage.removeItem("token");
        navigate("/connexionAdmin");
        return;
      }

    } catch (error) {
      console.error('Erreur lors de la vérification du token:', error);
      sessionStorage.removeItem("id");
      sessionStorage.removeItem("token");
      navigate("/connexionAdmin");
    }
  };

  return (
    <SnackbarProvider anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
      <Router>
        <div className="app">
          <Routes>
            <Route path="/" element={<><Header /><Accueil /><Footer /></>} />
            <Route path="/igerie" element={<><Header /><Igerie /><Footer /></>} />
            <Route path="/biographie" element={<><Header /><Biographie /><Footer /></>} />
            <Route path="/articles" element={<><Header /><Articles /><Footer /></>} />
            <Route path="/bibliotheques" element={<><Header /><Bibliotheques /><Footer /></>} />
            <Route path="/roue" element={<><Header /><Roue /><Footer /></>} />
            {/* <Route path="/services" element={<><Header /><Services /><Footer /></>} /> */}
            <Route path="/contact" element={<><Header /><Contact /><Footer /></>} />
            <Route path="/connexionAdmin" element={<><ConnexionAdmin /></>}/>
            <Route path="/admin" element={<Admin verifyToken={(id, token, navigate) => verifyToken(id, token, navigate)}/>}/>
            <Route path='/modify/:id/:type' element= {<Modify verifyToken={(id, token, navigate) => verifyToken(id, token, navigate)}/>}/>
            <Route path='/oneArticle/:id' element={<><Header /><OneArticle /><Footer /></>}></Route>
            <Route path='/oneAnnexe/:id' element={<><Header /><OneAnnexe /><Footer /></>}></Route>
          </Routes>
        </div>
      </Router>
    </SnackbarProvider>
  );
}

export default App;
