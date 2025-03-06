const container = document.getElementById('task-container');

// Fonction pour créer une tâche
function createTask(taskCount, taskName = `Nom de la tâche ${taskCount}`, completed = false) {
    // Créer l'élément de tâche
    const taskDiv = document.createElement("div");
    taskDiv.classList.add("task");
    
    // Ajouter une classe "completed" si la tâche est déjà terminée
    if (completed) {
        taskDiv.classList.add("completed");
    }

    // Générer le contenu HTML de la tâche
    taskDiv.innerHTML = `
        <div class="left">
            <input type="checkbox" id="nomDeTache${taskCount}" ${completed ? "checked" : ""}>
            <label for="nomDeTache${taskCount}" class="task-name" data-task-id="${taskCount}">${taskName}</label>
        </div>
        <div class="right">
            <button class="delete-button"><i class='bx bxs-trash-alt'></i></button>
            <button class="edit-button"><i class='bx bxs-pencil'></i></button>
        </div>
    `;

    // Ajouter la tâche au conteneur
    container.appendChild(taskDiv);

    // Événement pour modifier le nom de la tâche
    taskDiv.querySelector('.edit-button').addEventListener('click', function() {
        const taskLabel = taskDiv.querySelector('.task-name');
        const currentName = taskLabel.innerText;

        // Créer un champ de saisie pour modifier le nom de la tâche
        const inputField = document.createElement('input');
        inputField.type = 'text';
        inputField.value = currentName;

        // Remplacer le label par le champ de saisie
        taskLabel.replaceWith(inputField);

        inputField.addEventListener('blur', function() {
            const newName = inputField.value;
            const newLabel = document.createElement('label');
            newLabel.innerText = newName;
            newLabel.classList.add('task-name');
            newLabel.setAttribute('data-task-id', taskCount);

            inputField.replaceWith(newLabel);
            saveTasks(); // Sauvegarde après modification
        });

        inputField.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                inputField.blur();
            }
        });

        inputField.focus();
    });

    // Événement pour supprimer la tâche
    taskDiv.querySelector('.delete-button').addEventListener('click', function() {
        container.removeChild(taskDiv);
        saveTasks(); // Sauvegarde après suppression
    });

    // Événement pour marquer comme terminée
    taskDiv.querySelector('input[type="checkbox"]').addEventListener('change', function() {
        if (this.checked) {
            taskDiv.classList.add('completed');
        } else {
            taskDiv.classList.remove('completed');
        }
        saveTasks(); // Sauvegarde après changement d'état
    });
}

// Fonction pour charger les tâches sauvegardées
function loadTasks() {
    var storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
        JSON.parse(storedTasks).forEach((task, index) => {
            createTask(index + 1, task.name, task.completed);
        });
    }
}

// Fonction pour sauvegarder les tâches dans le localStorage
function saveTasks() {
    var tasks = [];
    document.querySelectorAll(".task").forEach(function(task) {
        tasks.push({
            name: task.querySelector(".task-name").textContent,
            completed: task.querySelector("input[type='checkbox']").checked
        });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Charger les tâches au démarrage
loadTasks();

// Événement pour ajouter une nouvelle tâche
document.querySelector('.button-ajout').addEventListener('click', function() {
    const taskCount = container.querySelectorAll('.task').length + 1;
    createTask(taskCount);
    saveTasks(); // Sauvegarde après ajout
});

// Filtrer les tâches en fonction du statut
document.querySelector('.button-filter').addEventListener('change', function() {
    const filterValue = this.value;
    const tasks = document.querySelectorAll('.task');

    tasks.forEach(task => {
        const isCompleted = task.querySelector('input[type="checkbox"]').checked;

        if (filterValue === "Toutes") {
            task.style.display = "flex";
        } else if (filterValue === "En cours" && !isCompleted) {
            task.style.display = "flex";
        } else if (filterValue === "Terminées" && isCompleted) {
            task.style.display = "flex";
        } else {
            task.style.display = "none";
        }
    });
});
