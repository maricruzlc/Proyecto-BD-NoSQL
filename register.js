// Manejar el envío del formulario
document.getElementById('registroForm').addEventListener('submit', async function(event) {
  event.preventDefault();  // Prevenir la acción predeterminada (recarga de la página)

  // Obtener los valores de los campos del formulario
  const user = document.getElementById('user').value;
  const password = document.getElementById('password').value;
  const email = document.getElementById('email').value;

  // Crear un objeto con los datos del formulario
  const formData = {
    user: user,
    password: password,
    email: email
  };

  try {
    // Enviar los datos al servidor con fetch
    const response = await fetch('http://localhost:3000/usuarios/registro', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });

    // Verificar la respuesta del servidor
    const data = await response.json();
    console.log('Respuesta del servidor:', data);  // Agrega esto para ver la respuesta

    if (response.status === 201) {
      alert('Usuario registrado exitosamente');
      // Redirigir al login si el registro es exitoso
      window.location.href = '/Login.html';  // Asegúrate de que esta ruta exista en tu frontend
    } else {
      alert(data.message);
    }
  } catch (error) {
    console.error('Error al registrar el usuario:', error);
    alert('Hubo un error al registrar el usuario');
  }
});


document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("register-form");

    form.addEventListener("submit", (e) => {
      e.preventDefault(); // Evitar la acción predeterminada de enviar el formulario

      // Aquí podrías agregar validaciones si es necesario

      // Redirigir al index.html después de enviar el formulario
      window.location.href = "index.html"; // Redirigir a la página principal
    });
  });

  
  
  async function handleLogin(event) {
    event.preventDefault();
  
    const user = document.getElementById("username").value;
    const password = document.getElementById("password").value;
  
    if (!user || !password) {
      alert("Por favor, llena todos los campos.");
      return;
    }
  
    try {
      const response = await fetch('http://localhost:3000/usuarios/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user, password }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        console.log('Token:', data.token);
        Cookies.set('token', data.token, { expires: 7 });
        alert('Inicio de sesión exitoso');
        window.location.href = 'index.html';
      } else {
        alert('Error: ' + data.message);
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
      alert('Ocurrió un error inesperado.');
    }
  }
