import React from 'react';
// import "./App.css";
import app from "./app.module.css"
//import 'bootstrap/dist/css/bootstrap.css';

function App() {
  // Définir les éléments JSX
  let title = <h1>Liste des tâches à réaliser</h1>;
  let paragraph = (
    <p>
      Lorem Ipsum | <a href="https://www.epsi.fr/">Site Epsi</a> | is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
    </p>
  );

  return (
    <div>
      {/* Affichage du titre */}
      {title}
      {paragraph}
      {/* Section avec les boutons */}
      <div className={app['button']}>
        <button className={app["button-ajout"]}>Ajouter +</button>
        <select className={app["button-filter"]}>
          <option>Toutes</option>
          <option>En cours</option>
          <option>Terminées</option>
        </select>
      </div>
      {/* Conteneur des tâches */}
      <div className={app["container"]} id={app["task-container"]}>
        
        {/* Le contenu des tâches sera ajouté ici */}
      </div>
      {/* Inclure le fichier JS (ceci n'est pas nécessaire dans React, mais vous pouvez le faire pour des scripts spécifiques) */}
      <script src="TODO-List.js"></script>
    </div>
  );
}

export default App;
