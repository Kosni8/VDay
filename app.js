document.addEventListener('DOMContentLoaded', ()=>{
	const yes = document.getElementById('yesBtn');
	const no = document.getElementById('noBtn');
	const title = document.querySelector('.card-title');
	const continueBtn = document.getElementById('continueBtn');
	const intro = document.getElementById('intro');
	const questionWrap = document.getElementById('questionWrap');
	let noQueue = [];
	const noMessages = [
		'Sicher?',
		'Versuchs nochmal... ',
		'Bist du dir wirklich sicher?',
		'Was soll das?!',
		'Vielleicht später?',
		'Verdrückt, oder?',
		'Bitti Bitti'
	];

	function refillQueue(){
		// create a shuffled copy
		const arr = noMessages.slice();
		for(let i = arr.length - 1; i > 0; i--){
			const j = Math.floor(Math.random() * (i + 1));
			[arr[i], arr[j]] = [arr[j], arr[i]];
		}
		noQueue = arr;
	}

	refillQueue();

	let yesScale = 1;

	if(yes){
		yes.addEventListener('click', ()=>{
			// blende anderen Seiteninhalt aus
			document.querySelectorAll('body > *').forEach(el => {
				if(!el.classList || !el.classList.contains('celebrate-overlay')) el.style.display = 'none';
			});

			// Erstelle Overlay
			const overlay = document.createElement('div');
			overlay.className = 'celebrate-overlay';
			overlay.innerHTML = `
				<div class="celebrate-content">
					<h1 class="celebrate-title">YAY ICH LIEBE DICH! <span class="big-heart">❤</span></h1>
					<div class="hearts" aria-hidden="true"></div>
				</div>
			`;
			document.body.appendChild(overlay);

			// Erzeuge schwebende Herzen
			const hearts = overlay.querySelector('.hearts');
			const heartChars = ['💖','❤️','💘','💕'];
			for(let i=0;i<16;i++){
				const h = document.createElement('span');
				h.className = 'float-heart';
				h.textContent = heartChars[Math.floor(Math.random()*heartChars.length)];
				h.style.left = (5 + Math.random()*90) + '%';
				h.style.animationDelay = (Math.random()*1.5) + 's';
				h.style.fontSize = (14 + Math.random()*48) + 'px';
				hearts.appendChild(h);
			}
		});
	}

	// Weiter-Button: Frage-UI anzeigen und Intro ausblenden (bei Laden anhängen)
	if(continueBtn){
		continueBtn.addEventListener('click', ()=>{
			if(intro) intro.style.display = 'none';
			if(questionWrap) questionWrap.classList.remove('d-none');
			// Auf mobilen Geräten nach oben scrollen
			window.scrollTo({top:0,behavior:'smooth'});
		});
	}

	if(no){
		no.addEventListener('click', ()=>{
			if(noQueue.length === 0) refillQueue();
			const msg = noQueue.shift();
			title.textContent = msg;

			// Vergrößere den Ja-Button bei jedem Klick
			yesScale = Math.min(yesScale * 1.18, 5); // Wachstum begrenzen
			yes.style.transform = `scale(${yesScale})`;

			// Spielerisches Feedback für den Nein-Button
			no.classList.add('btn-warning');
			setTimeout(()=> no.classList.remove('btn-warning'), 400);
		});
	}
});

