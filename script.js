'use strict';
let timeframe = 'weekly';
const container = document.querySelector('.container');
let regularCards;

// initialize menu
const menu = document.querySelectorAll('.menu-link');

menu.forEach((el) => el.addEventListener('click', menuOnClick));

const data = {};

fetch('./data.json')
	.then((response) => response.json())
	.then((jsonData) => {
		//create cards
		jsonData.forEach((element) => {
			container.insertAdjacentHTML(
				'beforeend',
				createRegularCard(element, timeframe)
			);
		});

		jsonData.forEach((element) => {
			data[element.title] = element.timeframes;
		});

		regularCards = document.querySelectorAll('.regular-card');
	});

console.log(data);

function menuOnClick(event) {
	console.log('clicked');
	menu.forEach((el) => el.classList.remove('menu-active'));
	event.target.classList.add('menu-active');
	timeframe = event.target.innerText.toLowerCase();

	updateCards(timeframe);
}

function updateCards(timeframe) {
	regularCards.forEach((card) => updateCard(card, timeframe));
}

function updateCard(card, timeframe) {
	const title = card.querySelector('.title').innerText;
	const current = data[title][timeframe]['current'];
	const previous = data[title][timeframe]['previous'];

	const timeframeMsg = {
		daily: 'Yesterday',
		weekly: 'Last Week',
		monthly: 'Last Month',
	};

	const hoursElement = card.querySelector('.hours');
	hoursElement.innerText = `${current}hrs`;
	const msgElement = card.querySelector('.description');
	msgElement.innerText = `${timeframeMsg[timeframe]} - ${previous}hrs`;
}

function createRegularCard(element, timeframe) {
	const title = element['title'];
	const current = element['timeframes'][timeframe]['current'];
	const previous = element['timeframes'][timeframe]['previous'];

	const timeframeMsg = {
		daily: 'Yesterday',
		weekly: 'Last Week',
		monthly: 'Last Month',
	};

	return `
  <div class="regular-card ${title.toLowerCase().replace(/\s/g, '')}">
    <div class="property-card">
        <div class="row">
            <div class="title">${title}</div>
            <div class="points">
                <div class="point"></div>
                <div class="point"></div>
                <div class="point"></div>
            </div>
        </div>
        <div class="row-2">
            <div class="hours">${current}hrs</div>
            <div class="description">${
							timeframeMsg[timeframe]
						} - ${previous}hrs</div>
        </div>
    </div>
</div>`;
}
