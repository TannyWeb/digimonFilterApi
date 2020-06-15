const digimonContainer = document.querySelector('.digimon-container');
const url = `https://digimon-api.herokuapp.com/api/digimon`;
const rookieBtn = document.querySelector('.rookie');
const championBtn = document.querySelector('.champion');
const ultimateBtn = document.querySelector('.ultimate');

const fetchDigimon = async () => {
	try {
		const data = await (await fetch(url)).json();

		displayDigimon(data);
	} catch (error) {
		console.log(error);
	}
};

const filterLevel = (digimon, level) => {
	return digimon.filter((digi) => digi.level === `${level}`);
};

const generateHTML = (digimon) => {
	return digimon
		.map(
			(digi) =>
				`
		<div class="card">
            <img class="card-img" src="${digi.img}" />
            <h2 class="card-title">${digi.name}</h2>
            <p class="card-subtitle">${digi.level}</p>
            </div>
            
		`
		)
		.join(' ');
};

const displayFilteredResults = (btn, digimon) => {
	return btn.addEventListener('click', () => {
		digimonContainer.innerHTML = generateHTML(digimon);
	});
};

const displayDigimon = (digimon) => {
	// const rookie = digimon.filter((digi) => digi.level === 'Rookie');
	const rookie = filterLevel(digimon, 'Rookie');
	const champion = filterLevel(digimon, 'Champion');
	const ultimate = filterLevel(digimon, 'Ultimate');

	// rookieBtn.addEventListener('click', () => {
	// 	digimonContainer.innerHTML = generateHTML(rookie);
	// 	// console.log(generateHTML(rookie));
	// });

	displayFilteredResults(rookieBtn, rookie);
	displayFilteredResults(championBtn, champion);
	displayFilteredResults(ultimateBtn, ultimate);
};

fetchDigimon();
