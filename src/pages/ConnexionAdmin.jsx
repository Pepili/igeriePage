import React, {useEffect, useState} from 'react';
import { Navigate } from 'react-router-dom';
import { useSnackbar } from "notistack";

function ConnexionAdmin() {
    const [adminId, setAdminId] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);
    const { enqueueSnackbar } = useSnackbar();

    const handleAdminIdChange = (event) => {
        setAdminId(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleKeyPress = (event) => {
      if (event.key === 'Enter') {
          handleLogin();
      }
  };
    useEffect(() => {
      sessionStorage.removeItem("id");
      sessionStorage.removeItem("token");
    }, []);
    
    const handleLogin = async () => {
      const response = await fetch(process.env.REACT_APP_API_URL + 'utilisateurs/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: adminId,
          mdp: password
        })
      });
      const responseData = await response.json();
      
      if (responseData.error) {
        switch (responseData.errorCode) {
          case 2000:
            enqueueSnackbar("Nom d'utilisateur/email ou mot de passe incorrect", {
              variant: "error",
            });
            break;
          case 2002:
            enqueueSnackbar(responseData.error, {
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
        if(responseData.is_admin == 0) {
          enqueueSnackbar("Il faut un compte administrateur", {
            variant: "error",
          });
          return;
      } else {
          sessionStorage.setItem("id", responseData.id);
          sessionStorage.setItem("token", responseData.token);
          setRedirect(true);
          enqueueSnackbar("Connecté avec succès", {
            variant: "success",
          });
        };
      }
    };
    if(redirect) {
      return <Navigate to="/admin"/>;
    }

  return (
    <div className="divConnexionAdmin">
      <div style={{height: "300px", display: "flex", alignItems: "center"}}>
        <img src={ process.env.PUBLIC_URL +'/img/logo1.png'} alt='logo'/>
      </div>
      <form>
        <div>
          <label htmlFor="adminId">Identifiant Administrateur:</label>
          <input
            type="text"
            id="adminId"
            value={adminId}
            onChange={handleAdminIdChange}
            placeholder='identifiant...'
          />
        </div>
        <div>
          <label htmlFor="password">Mot de passe:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            onKeyDown={handleKeyPress}
            placeholder='mot de passe...'
          />
        </div>
        <button type="button" onClick={handleLogin}>
          Connexion
        </button>
      </form>
    </div>
  );
}

export default ConnexionAdmin;