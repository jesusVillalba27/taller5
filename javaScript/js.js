const publicKey = '8093c03a6f9145fce36751697f225da80e80e83f';
const privateKey = 'e201c2984f7595c03a6a4206634090e1';
const apiUrl = 'https://gateway.marvel.com/v1/public/characters';



const limit = 20;

const ts = new Date().getTime();
const hash = md5(ts + privateKey + publicKey);

const url = `${apiUrl}?limit=${limit}&ts=${ts}&apikey=${publicKey}&hash=${hash}`;

fetch(url)
	.then(response => response.json())
	.then(data => {
		const superheroesContainer = document.getElementById('superheroes-container');
		
		data.data.results.forEach(superhero => {
			const card = document.createElement('div');
			card.classList.add('card');
			
			const image = document.createElement('img');
			image.src = `${superhero.thumbnail.path}/portrait_uncanny.${superhero.thumbnail.extension}`;
			image.alt = superhero.name;
			
			const name = document.createElement('h2');
			name.textContent = superhero.name;
			
			card.appendChild(image);
			card.appendChild(name);
			superheroesContainer.appendChild(card);
		});
	})
	.catch(error => console.log(error));

function md5(string) {
  let message = string;
  let hex_chr = '0123456789abcdef';
  let bit = message.length * 8;
  let k = 0;
  let buffer = [];
  let digest = '';
  
  for (let i = 0; i < message.length; i++) {
    let ascii = message.charCodeAt(i);
    buffer[k++] = (ascii >> 0) & 0xff;
    buffer[k++] = (ascii >> 8) & 0xff;
  }
  
  let d = 16 - ((bit / 8) % 16);
  buffer[k++] = 0x80;
  
  for (let i = 0; i < d; i++) {
    buffer[k++] = 0x00;
  }
  
  for (let i = 0; i < 8; i++) {
    buffer[k++] = (bit >>> (8 * i)) & 0xff;
  }
  
  function add(x, y) {
    let lsw = (x & 0xffff) + (y & 0xffff);
    let msw = (x >> 16) + (y >> 16) + (lsw >> 16);
    return (msw << 16) | (lsw & 0xffff);
  }
  
  function rol(num, cnt) {
    return (num << cnt) | (num >>> (32 - cnt));
  }
  
  function cmn(q, a, b
