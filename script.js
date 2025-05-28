document.addEventListener('DOMContentLoaded', () => {
    const questions = [
        {
            id: "name",
            question: "Para empezar, ¿cómo te llamas?",
            type: "text_input", // Special type for name input
            placeholder: "Escribe tu nombre aquí"
        },
        {
            id: "music",
            question: "¿Qué tipo de música hace vibrar tu corazón?",
            options: ["Pop romántico <i class='fas fa-headphones-alt'></i>", "Rock con alma <i class='fas fa-guitar'></i>", "Reggaetón para bailar pegados <i class='fas fa-fire'></i>", "Clásica para soñar <i class='fas fa-music'></i>", "Indie para descubrir <i class='fas fa-record-vinyl'></i>"],
            type: "normal"
        },
        {
            id: "food",
            question: "¿Qué delicia podrías comer cada día sin cansarte?",
            options: ["Pizza, un clásico <i class='fas fa-pizza-slice'></i>", "Sushi, elegancia oriental <i class='fas fa-fish'></i>", "Tacos, sabor explosivo <i class='fas fa-pepper-hot'></i>", "Pasta, confort italiano <i class='fas fa-utensils'></i>", "Chocolate, dulce tentación <i class='fas fa-cookie-bite'></i>"],
            type: "normal"
        },
        {
            id: "believe_in_love",
            question: "¿Crees en el poder del amor?",
            options: ["Sí, ¡es la fuerza más grande! <i class='fas fa-heart-pulse'></i>", "A veces, soy un poco escéptic@", "No mucho, la verdad <i class='fas fa-heart-broken'></i>", "El amor es una construcción social"],
            type: "normal"
        },
        {
            id: "interest_in_darny",
            question: "Siendo honest@... ¿Sientes un chispazo de interés por Darny?",
            options: ["Sí, ¡definitivamente hay algo! <i class='fas fa-grin-stars'></i>", "Quizás un poquito...", "Mmm, no estoy segur@.", "No, para nada."],
            type: "darny",
            unfavorableIndex: 3, // Index of "No, para nada."
            favorableIndex: 0, // "Sí, ¡definitivamente hay algo!"
            warningMessages: [
                "¿Estás segur@? A veces el corazón sabe cosas que la mente ignora. Intenta de nuevo.",
                "Piénsalo bien... Darny podría ser esa sorpresa que no esperabas. ¡Otra oportunidad!",
                "Hmm, mi detector de 'quizás sí, pero me da cosita admitirlo' está sonando. ¿Probamos otra vez?"
            ]
        },
        {
            id: "up_down",
            question: "En la vida, ¿prefieres mirar hacia arriba (soñar) o hacia abajo (ser realista)?",
            options: ["Siempre arriba, ¡a las estrellas! <i class='fas fa-rocket'></i>", "Con los pies en la tierra, pero mirando al cielo <i class='fas fa-balance-scale'></i>", "Abajo, paso a paso seguro <i class='fas fa-shoe-prints'></i>"],
            type: "normal"
        },
        {
            id: "kiss_darny",
            question: "Imagina un momento mágico... ¿Desearías que Darny, además de robarte el corazón, te robe un beso? <i class='fas fa-kiss-wink-heart'></i>",
            options: ["¡SÍ! Sería un sueño hecho realidad.", "Me lo pensaría... pero suena tentador.", "No, gracias, prefiero ir despacio."],
            type: "darny",
            unfavorableIndex: 2, // Index of "No, gracias..."
            favorableIndex: 0, // "¡SÍ! Sería un sueño..."
            warningMessages: [
                "¡Pero qué dices! Un beso de Darny podría ser legendario. ¿Segur@ que no?",
                "A veces hay que arriesgarse por un momento inolvidable. ¿Te atreves a reconsiderarlo?",
                "Entiendo la cautela, pero... ¿y si ese beso es el inicio de algo increíble? ¡Dale una vuelta!"
            ]
        },
        {
            id: "color",
            question: "¿Cuál es tu color favorito, ese que te hace sonreír?",
            options: ["Rojo pasión <i class='fas fa-tint' style='color:red;'></i>", "Azul serenidad <i class='fas fa-tint' style='color:blue;'></i>", "Verde esperanza <i class='fas fa-tint' style='color:green;'></i>", "Amarillo alegría <i class='fas fa-tint' style='color:yellow;'></i>", "Rosa ternura <i class='fas fa-tint' style='color:pink;'></i>"],
            type: "normal"
        },
        {
            id: "day_night",
            question: "¿Eres más de la energía del día <i class='fas fa-sun'></i> o la magia de la noche <i class='fas fa-moon'></i>?",
            options: ["Día, ¡a tope de power!", "Noche, misterio y estrellas.", "Ambos tienen su encanto."],
            type: "normal"
        },
        {
            id: "dance_sing",
            question: "Si tuvieras que elegir: ¿bailar hasta el amanecer <i class='fas fa-male'></i><i class='fas fa-female'></i> o cantar a pleno pulmón <i class='fas fa-microphone-alt'></i>?",
            options: ["Bailar, ¡que el cuerpo hable!", "Cantar, ¡liberar la voz!", "¡Ambas! Soy un artista completo."],
            type: "normal"
        },
        {
            id: "marvel_dc",
            question: "En el universo de los superhéroes, ¿eres más de Marvel o DC?",
            options: ["Marvel, ¡Avengers Assemble! <i class='fas fa-shield-alt'></i>", "DC, ¡Por la justicia! <i class='fas fa-bolt'></i>", "Ambos tienen héroes geniales.", "Prefiero las historias sin capas."],
            type: "normal"
        },
        {
            id: "intro_extro",
            question: "¿Te consideras más introvertido (energía hacia adentro) <i class='fas fa-user-ninja'></i> o extrovertido (energía hacia afuera) <i class='fas fa-users'></i>?",
            options: ["Introvertido, mi mundo interior es mi refugio.", "Extrovertido, ¡me encanta la gente!", "Ambivertido, un poco de ambos."],
            type: "normal"
        }
    ];

    let currentQuestionIndex = 0;
    let userAnswers = {}; // To store answers
    let darnyWarningCount = 0; // To cycle through Darny warnings

    const questionTitleElement = document.getElementById('question-title');
    const optionsContainer = document.getElementById('options-container');
    const nextButton = document.getElementById('next-btn');
    const prevButton = document.getElementById('prev-btn');
    const darnyWarningElement = document.getElementById('darny-warning');
    const progressBar = document.getElementById('progress-bar');
    const progressText = document.getElementById('progress-text');


    function loadQuestion() {
        // Clear previous options and warnings
        optionsContainer.innerHTML = '';
        darnyWarningElement.style.display = 'none';
        nextButton.disabled = true; // Disable until an option is selected (for radio/text)

        const currentQuestion = questions[currentQuestionIndex];
        questionTitleElement.innerHTML = currentQuestion.question; // Use innerHTML for icons

        if (currentQuestion.type === "text_input") {
            const input = document.createElement('input');
            input.type = 'text';
            input.placeholder = currentQuestion.placeholder || "Escribe aquí...";
            input.className = 'text-answer-input'; // Add a class for styling
            input.id = `answer_for_${currentQuestion.id}`;
            if (userAnswers[currentQuestion.id]) {
                input.value = userAnswers[currentQuestion.id];
            }
            optionsContainer.appendChild(input);
            input.addEventListener('input', () => {
                nextButton.disabled = input.value.trim() === '';
            });
            nextButton.disabled = !input.value.trim(); // Re-check on load
            input.focus();

        } else if (currentQuestion.options) {
            currentQuestion.options.forEach((optionText, index) => {
                const label = document.createElement('label');
                label.className = 'option-label';
                
                const radio = document.createElement('input');
                radio.type = 'radio';
                radio.name = 'option';
                radio.value = index;
                radio.id = `option${index}`;

                const span = document.createElement('span');
                span.innerHTML = optionText; // Use innerHTML for icons

                label.appendChild(radio);
                label.appendChild(span);
                optionsContainer.appendChild(label);

                radio.addEventListener('change', () => {
                    document.querySelectorAll('.option-label').forEach(l => l.classList.remove('selected'));
                    label.classList.add('selected');
                    nextButton.disabled = false;
                });

                // Pre-select if already answered
                if (userAnswers[currentQuestion.id] !== undefined && parseInt(userAnswers[currentQuestion.id]) === index) {
                    radio.checked = true;
                    label.classList.add('selected');
                    nextButton.disabled = false;
                }
            });
        }
        updateProgress();
        prevButton.style.display = currentQuestionIndex > 0 ? 'inline-block' : 'none';
    }
    
    function updateProgress() {
        const progressPercentage = ((currentQuestionIndex) / questions.length) * 100;
        progressBar.style.width = `${progressPercentage}%`;
        progressText.textContent = `Pregunta ${currentQuestionIndex + 1} de ${questions.length}`;
    }

    nextButton.addEventListener('click', () => {
        const currentQuestion = questions[currentQuestionIndex];
        let selectedValue;

        if (currentQuestion.type === "text_input") {
            const inputField = document.getElementById(`answer_for_${currentQuestion.id}`);
            selectedValue = inputField.value.trim();
            if (!selectedValue) {
                // This should ideally be caught by button disable, but as a fallback:
                alert("Por favor, ingresa tu nombre.");
                return;
            }
             if (currentQuestion.id === "name") {
                localStorage.setItem('quizUserName', selectedValue); // Store user's name
            }
        } else {
            const selectedOption = document.querySelector('input[name="option"]:checked');
            if (!selectedOption) {
                // This should ideally be caught by button disable, but as a fallback:
                alert("Por favor, selecciona una opción.");
                return;
            }
            selectedValue = selectedOption.value; // This is the index
        }
        
        userAnswers[currentQuestion.id] = selectedValue;

        if (currentQuestion.type === "darny") {
            // In Darny questions, selectedValue is the index of the chosen option
            if (parseInt(selectedValue) === currentQuestion.unfavorableIndex) {
                darnyWarningElement.innerHTML = currentQuestion.warningMessages[darnyWarningCount % currentQuestion.warningMessages.length];
                darnyWarningElement.style.display = 'block';
                darnyWarningCount++;
                // Do not proceed to next question
                // Re-enable the "favorable" option or clear selection for retry
                const radioToClear = document.getElementById(`option${currentQuestion.unfavorableIndex}`);
                if(radioToClear) radioToClear.checked = false;
                document.querySelectorAll('.option-label').forEach(l => l.classList.remove('selected'));
                nextButton.disabled = true;
                return; 
            }
        }
        
        darnyWarningElement.style.display = 'none'; // Hide warning if passed
        currentQuestionIndex++;

        if (currentQuestionIndex < questions.length) {
            loadQuestion();
        } else {
            // Quiz finished
            localStorage.setItem('quizUserAnswers', JSON.stringify(userAnswers));
            localStorage.setItem('totalQuizQuestions', questions.length);
            window.location.href = 'loading.html';
        }
    });

    prevButton.addEventListener('click', () => {
        if (currentQuestionIndex > 0) {
            currentQuestionIndex--;
            darnyWarningElement.style.display = 'none'; // Hide warning when going back
            loadQuestion();
        }
    });

    // Initial load
    const storedName = localStorage.getItem('quizUserName');
    if (storedName && questions[0].id === "name") {
         userAnswers["name"] = storedName; // Pre-fill if name question is first
    }
    const storedAnswers = JSON.parse(localStorage.getItem('quizUserAnswers'));
    if (storedAnswers) {
        userAnswers = storedAnswers;
        // Potentially find the last answered question and start there, or just restart.
        // For simplicity, we'll just prefill if the user comes back.
        // A more robust resume feature would track currentQuestionIndex in localStorage.
    }

    loadQuestion();
});