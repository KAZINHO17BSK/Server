document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('doacaoForm');

  form.addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = new FormData(form);
    const data = {
      nome: formData.get('nome'),
      email: formData.get('email'),
      quantidade_litros: formData.get('quantidade_litros')
    };

    fetch('/doar', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => response.text())
    .then(message => {
      alert(message);
      form.reset();
    })
    .catch(error => console.error('Erro:', error));
  });
});
