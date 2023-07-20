let oLastModif = new Date(document.lastModified);

document.getElementById('last-modified').textContent = new Date().toLocaleDateString('en', oLastModif);