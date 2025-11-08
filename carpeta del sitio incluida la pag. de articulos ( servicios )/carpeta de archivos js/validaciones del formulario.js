        document.addEventListener('DOMContentLoaded', () => {
            const form = document.getElementById('adhesionForm');
            const inputs = form.querySelectorAll('input');
            const contrasena = document.getElementById('contrasena');
            const confirmarContrasena = document.getElementById('confirmar_contrasena');
            const dataSuccess = document.getElementById('data-success');

            function validarCampo(input) {
                const errorMessageSpan = input.nextElementSibling;
                errorMessageSpan.style.display = 'none';
                input.classList.remove('invalid', 'valid');
                
                let isInputValid = input.validity.valid;
                let errorMessage = '';

             
                if (!isInputValid) {
                    if (input.validity.valueMissing) {
                        errorMessage = 'Este campo es obligatorio.';
                    } else if (input.validity.patternMismatch || input.validity.tooShort || input.validity.typeMismatch) {
                        errorMessage = input.title || 'El formato no es válido.';
                    } else {
                        errorMessage = 'El valor ingresado es inválido.';
                    }
                } 
                if (input.id === 'confirmar_contrasena') {
                    if (contrasena.value !== confirmarContrasena.value && confirmarContrasena.value.length > 0) {
                        errorMessage = confirmarContrasena.title; 
                        isInputValid = false;
                    } 
                    else if (contrasena.value.length > 0 && confirmarContrasena.value.length === 0) {
                         errorMessage = 'Este campo es obligatorio.';
                         isInputValid = false;
                    }
                }

                if (isInputValid && errorMessage === '') {
                    input.classList.add('valid');
                    return true;
                } else {
                    errorMessageSpan.textContent = errorMessage;
                    errorMessageSpan.style.display = 'block';
                    input.classList.add('invalid');
                    return false;
                }
            }

            function revalidarConfirmacion() {
                if (confirmarContrasena.value.length > 0 || confirmarContrasena.classList.contains('invalid')) {
                    validarCampo(confirmarContrasena);
                }
            }

            // Escucha eventos de blur y input para la validación en tiempo real
            inputs.forEach(input => {
                input.addEventListener('input', () => validarCampo(input));
                input.addEventListener('blur', () => validarCampo(input));
                
                if (input.id === 'contrasena') {
                    input.addEventListener('input', revalidarConfirmacion);
                    input.addEventListener('blur', revalidarConfirmacion);
                }
            });

            form.addEventListener('submit', (event) => {
                event.preventDefault(); 
                let formValido = true;
                let firstInvalidInput = null;

                inputs.forEach(input => {
                    if (!validarCampo(input)) { 
                        formValido = false;
                        if (!firstInvalidInput) {
                            firstInvalidInput = input;
                        }
                    }
                });

                if (formValido) {
                    
                    const nombreUsuario = document.getElementById('usuario').value;
                    const correoUsuario = document.getElementById('correo').value;
                    
                    dataSuccess.innerHTML = ''; 
                    
                    const iconElement = document.createElement('span');
                    iconElement.className = 'success-icon';
                    iconElement.innerHTML = '✅'; 
                    dataSuccess.appendChild(iconElement);

                    const mensajeExito = document.createElement('h3');
                    mensajeExito.textContent = "¡Registro Exitoso!"; 
                    dataSuccess.appendChild(mensajeExito);
                    
                    const pMensaje = document.createElement('p'); 
                    pMensaje.style.color = 'var(--color-texto-principal)'; 
                    pMensaje.innerHTML = `El usuario <strong>${nombreUsuario}</strong> con email <strong>${correoUsuario}</strong> ha sido creado con éxito.`;
                    // Ocultamos solo el formulario y mostramos el mensaje de éxito
                    dataSuccess.appendChild(pMensaje);
                    
                    form.reset();
                    inputs.forEach(input => input.classList.remove('valid', 'invalid'));
                    

                    form.style.display = 'none';
                    dataSuccess.style.display = 'block';

                    // Ocultar mensaje de éxito y mostrar formulario de nuevo después de 5 segundos
                    setTimeout(() => {
                        dataSuccess.style.display = 'none';
                        form.style.display = 'block';
                    }, 5000);

                } else {
                    dataSuccess.style.display = 'none'; 

                    if (firstInvalidInput) {
                        firstInvalidInput.focus();
                    }
                }
            });
        });