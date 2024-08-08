const userScores = {};


function updateScoreTable() {
    const scoreTable = document.getElementById('scoreTable').getElementsByTagName('tbody')[0];
    scoreTable.innerHTML = ''; 

    const sortedUsers = Object.entries(userScores).sort((a, b) => b[1] - a[1]);

   
    sortedUsers.forEach(([username, score]) => {
        const row = document.createElement('tr');
        const userCell = document.createElement('td');
        const scoreCell = document.createElement('td');
        
        userCell.textContent = username;
        scoreCell.textContent = score;
        
        row.appendChild(userCell);
        row.appendChild(scoreCell);
        scoreTable.appendChild(row);
    });
}


function updateScore(username, points) {
    if (!userScores[username]) {
        userScores[username] = 0;
    }
    userScores[username] += points;
    console.log(`Pontuação de ${username}: ${userScores[username]}`);
    updateScoreTable();
}


function handleLogin(event) {
    event.preventDefault(); 

    const username = document.getElementById('username').value;

    if (!username) {
        alert('Por favor, insira um nome de usuário.');
        return;
    }

    if (!userScores[username]) {
        userScores[username] = 0;
        console.log(`Novo usuário: ${username}, Pontuação inicial: ${userScores[username]}`);
    } else {
        console.log(`Bem-vindo de volta, ${username}! Pontuação atual: ${userScores[username]}`);
    }

    updateScoreTable();
}


function handleAction(event) {
    event.preventDefault(); 

    const username = document.getElementById('username').value;
    const points = parseInt(document.getElementById('points').value, 10);

    if (!username) {
        alert('Por favor, insira um nome de usuário.');
        return;
    }

    if (isNaN(points)) {
        alert('Por favor, insira um valor de pontos válido.');
        return;
    }

    updateScore(username, points);
}


document.getElementById('loginForm').addEventListener('submit', handleLogin);
document.getElementById('actionForm').addEventListener('submit', handleAction);


window.onload = function() {

    const savedScores = JSON.parse(localStorage.getItem('userScores'));
    if (savedScores) {
        for (const username in savedScores) {
            userScores[username] = savedScores[username];
        }
        updateScoreTable();
    }
};


window.addEventListener('beforeunload', function() {
    localStorage.setItem('userScores', JSON.stringify(userScores));
});


setInterval(function() {

    updateScoreTable();
}, 5000);
