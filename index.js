const player = document.querySelector('#player');
const numberOfPlayer = document.querySelector('#numberOfPlayer');
const result = document.querySelector('.result');
const colorInputsDiv = document.querySelector('#colorInputs');
const btnDrawTeam = document.querySelector('#drawTeam');
const btnReload = document.querySelector('#reload')
const btnBack = document.querySelector('#back')
const containerTeam = document.querySelector('.containerTeam');
const drawColorDiv = document.querySelector('#drawColorDiv')
const reset = document.querySelector('#reset')
const counter = document.querySelector('span')

let totalPlayers = 0;
let totalPlayersCount = 0;
let maxPlayersPerColor = 0;
let colorCount = {};
let shuffledColors = [];
let isDrawing = true;

document.addEventListener('DOMContentLoaded', initialize);

function calculateSum() {
    const num1 = parseFloat(player.value);
    const num2 = parseFloat(numberOfPlayer.value);
    const sum = num1 / num2;
    result.textContent = 'Quantidade de times é: ' + sum;

    if (isNaN(sum)) {
        result.textContent = 'Quantidade de times é: 0';
        return;
    }

    localStorage.setItem('player', JSON.stringify(num1))
    localStorage.setItem('numberOfPlayer', JSON.stringify(num2))
    localStorage.setItem('result', JSON.stringify(sum));

    createColorInputs(sum)
}

if (player) {
    player.addEventListener('input', calculateSum);
}

if (numberOfPlayer) {
    numberOfPlayer.addEventListener('input', calculateSum);
}

if (localStorage.getItem('player') && player) {
    const playerValue = JSON.parse(localStorage.getItem('player'))
    player.value = playerValue
}

if (localStorage.getItem('numberOfPlayer') && numberOfPlayer) {
    const numberOfPlayerValue = JSON.parse(localStorage.getItem('numberOfPlayer'))
    numberOfPlayer.value = numberOfPlayerValue
}

function createColorInputs(sum) {
    colorInputsDiv.innerHTML = '';

    for (let i = 0; i < sum; i++) {
        const colorInput = document.createElement('input');
        colorInput.type = 'color';
        colorInput.id = 'color' + (i + 1);
        colorInput.value = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
        colorInputsDiv.appendChild(colorInput);
    }

    storeColors()
}

function storeColors() {
    const colorArray = [];
    const colorInputs = document.querySelectorAll('input[type="color"]');
    console.log(colorArray)
    colorInputs.forEach(input => {
        colorArray.push(input.value);
    });
    
    localStorage.setItem('colors', JSON.stringify(colorArray));
    loadColors();
}

function loadColors() {
    if (colorInputsDiv) {
        if (localStorage.getItem('colors')) {
            const storedColors = JSON.parse(localStorage.getItem('colors'));

            colorInputsDiv.innerHTML = '';

            storedColors.forEach(color => {
                const input = document.createElement('input');
                input.type = 'color';
                input.value = color;

                colorInputsDiv.appendChild(input);
                input.addEventListener('change', storeColors);
            });
        }
    }
}

function displayRandomColor() {
    const storedColors = JSON.parse(localStorage.getItem('colors'));
    const playersPerTeam = parseInt(localStorage.getItem('player'), 10);

    totalPlayersCount = playersPerTeam;
    maxPlayersPerColor = playersPerTeam;

    if (!storedColors || storedColors.length === 0) {
        alert('Preencha as informações para sortear');
        isDrawing = false;
        return;
    }

    if (shuffledColors.length === 0) {
        shuffledColors = shuffleArray([...storedColors]);
    }

    let randomColor;
    do {
        randomColor = shuffledColors[Math.floor(Math.random() * shuffledColors.length)];
    } while (colorCount[randomColor] && colorCount[randomColor] >= maxPlayersPerColor);

    // Atualiza o contador de cores
    if (!colorCount[randomColor]) {
        colorCount[randomColor] = 0;
    }
    colorCount[randomColor]++;

    if (drawColorDiv) {
        drawColorDiv.style.backgroundColor = randomColor;
        drawColorDiv.style.height = '50px';
        drawColorDiv.style.width = '50px';
        drawColorDiv.style.borderRadius = '50%';
    }

    totalPlayers++;

    if (counter) {
        counter.innerHTML = `Jogadores sorteados: ${totalPlayers}`;
    }

    if (totalPlayers >= totalPlayersCount) {
        showNotification('Jogo finalizado')
        if (btnDrawTeam) {
            btnDrawTeam.disabled = true;
        }
    }
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Troca os elementos
    }
    return array;
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.classList.add('notification');
    notification.style.width = '100%';
    notification.style.textAlign = 'center';
    notification.style.position = 'fixed';
    notification.style.bottom = '190px';
    notification.style.left = '50%';
    notification.style.transform = 'translateX(-50%)';
    notification.style.padding = '15px 30px';
    notification.style.backgroundColor = '#04022b';
    notification.style.color = '#fff';
    notification.style.fontWeight = 'bold';
    notification.style.zIndex = '1000';
    notification.style.opacity = '1';
    notification.style.transition = 'opacity 1s';
    notification.innerText = message;

    document.body.appendChild(notification);

    // Após 3 segundos, desaparece a notificação
    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => document.body.removeChild(notification), 1000); // Remove após a animação
    }, 3000);
}

function initialize() {
    loadColors();
    document.querySelectorAll('input[type="color"]').forEach(input => {
        input.addEventListener('input', storeColors);
    });

    if (btnDrawTeam) {
        btnDrawTeam.addEventListener('click', () => {
            if (!localStorage.getItem('player') || !localStorage.getItem('numberOfPlayer') || !localStorage.getItem('result')) {
                alert('Preencha os campos nas configurações!')
                return
            }
            btnDrawTeam.style.animation = 'shake .5s infinite';

            if (navigator.vibrate) {
                navigator.vibrate(2000);
            }

            setTimeout(() => {
                displayRandomColor();
                showModal()
                btnDrawTeam.style.animation = '';
            }, 2000);
        })
    }
}

function showModal() {
    const modal = document.createElement('div');
    modal.classList.add('modal');
    modal.style.position = 'fixed';
    modal.style.top = '50%';
    modal.style.left = '50%';
    modal.style.transform = 'translate(-50%, -50%)';
    modal.style.width = '100%';
    modal.style.height = '50%';
    modal.style.backgroundColor = 'rgb(102, 139, 220)';
    modal.style.display = 'flex';
    modal.style.flexDirection = 'column'
    modal.style.justifyContent = 'center';
    modal.style.alignItems = 'center';
    modal.style.gap = '15px';
    modal.style.zIndex = '999';
    modal.innerText = 'A cor do seu time e:'
    modal.style.fontWeight = 'bold'

    const colorContainer = document.createElement('div');
    colorContainer.style.backgroundColor = drawColorDiv.style.backgroundColor;
    colorContainer.style.width = '200px';
    colorContainer.style.height = '200px';
    colorContainer.style.borderRadius = '50%';
    colorContainer.style.display = 'flex';
    colorContainer.style.justifyContent = 'center';
    colorContainer.style.alignItems = 'center';
    colorContainer.style.color = 'white';
    colorContainer.style.fontWeight = 'bold';
    colorContainer.textContent = drawColorDiv.textContent;

    const backButton = document.createElement('button');
    backButton.textContent = 'Voltar';
    backButton.style.padding = '10px 20px';
    backButton.style.marginTop = '20px';
    backButton.style.cursor = 'pointer';
    backButton.style.backgroundColor = '#325eff';
    backButton.style.color = '#fff'
    backButton.style.fontWeight = 'bold'
    backButton.style.borderRadius = '5px';
    backButton.style.border = 'none'

    modal.appendChild(colorContainer);
    modal.appendChild(backButton);

    document.body.appendChild(modal);

    if (backButton) {
        backButton.addEventListener('click', () => {
            document.body.removeChild(modal);
        });
    }
}

if (btnBack) {
    btnBack.addEventListener('click', () => {
        window.location.href = 'index.html';
    })
}

if (reset) {
    reset.addEventListener('click', () => {
        if (!localStorage.getItem('colors') || !localStorage.getItem('player') || !localStorage.getItem('numberOfPlayer')) {
            alert('Informações vazias! Por favor, preencha todos os campos.');
        }
        localStorage.clear();
        location.reload();
    })
}

if(btnReload) {
    btnReload.addEventListener('click', () => {
        location.reload()
    })
}