
const firebaseConfig = {
    apiKey: "AIzaSyCa79t6eqSBPafJVrRrHcCteTaZu92z7-M",
    authDomain: "formulariojs-firebase.firebaseapp.com",
    projectId: "formulariojs-firebase",
    storageBucket: "formulariojs-firebase.appspot.com",
    messagingSenderId: "608015190928",
    appId: "1:608015190928:web:79137513a3ef6fe33a0115",
    measurementId: "G-VYZ0QDNW6D"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = firebase.firestore();




document.getElementById('formulario').addEventListener('submit', (event) => {
    event.preventDefault()

    //Validar nombre
    let entradaNombre = document.getElementById('name')
    let errorNombre = document.getElementById('nameError')

    if (entradaNombre.value.trim() === '') {
        errorNombre.textContent = 'Por Favor, Ingrese su nombre'
        errorNombre.classList.add('error-message')
    } else {
        errorNombre.textContent = ''
        errorNombre.classList.remove('error-message')
    }
    //Validar Email
    let entradaEmail = document.getElementById('email')
    let errorEmail = document.getElementById('emailError')
    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; //patron de email para validar

    if (!emailPattern.test(entradaEmail.value)) {
        errorEmail.textContent = 'Por Favor, Ingrese su Email'
        errorEmail.classList.add('error-message')
    } else {
        errorEmail.textContent = ''
        errorEmail.classList.remove('error-message')
    }
    //Validar Contraseña
    let entradaContrasena = document.getElementById('password')
    let errorContrasena = document.getElementById('passwordError')
    let contrasenaPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&#.$($)$-$_])[A-Za-z\d$@$!%*?&#.$($)$-$_]{8,15}$/;

    if (!contrasenaPattern.test(entradaContrasena.value)) {
        errorContrasena.textContent = 'La contraseña debe tener al menos 8 caracteres, números, mayúsculas y minúsculas y caracteres especiales'
        errorContrasena.classList.add('error-message')
    } else {
        errorContrasena.textContent = ''
        errorContrasena.classList.remove('error-message')
    }
    //Enviar formulario

    if (!errorNombre.textContent && !errorEmail.textContent && !errorContrasena.textContent) {

        //Agregar backend que recibe informacion
        db.collection("users").add({
            Nombre: entradaNombre.value,
            Email: entradaEmail.value,
            Password: entradaContrasena.value
        })
            .then((docRef) => {
                alert('El formulario se ha enviado con éxito', docRef.id);
                document.getElementById('formulario').reset();
            })
            .catch((error) => {
                alert(error);
            });

        alert('El formulario se envio Correctamente')
        document.getElementById('formulario').reset();
    }
})