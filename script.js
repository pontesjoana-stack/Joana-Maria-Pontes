document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 1. Controle de Tema (Dark / Light Mode)
    // ==========================================
    const btnTheme = document.getElementById('btn-theme');
    const body = document.body;
    const iconTheme = btnTheme.querySelector('i');

    const savedTheme = localStorage.getItem('theme') || 'dark-mode';
    body.classList.remove('dark-mode', 'light-mode');
    body.classList.add(savedTheme);
    updateThemeIcon(savedTheme);

    btnTheme.addEventListener('click', () => {
        if (body.classList.contains('dark-mode')) {
            body.classList.replace('dark-mode', 'light-mode');
            localStorage.setItem('theme', 'light-mode');
            updateThemeIcon('light-mode');
        } else {
            body.classList.replace('light-mode', 'dark-mode');
            localStorage.setItem('theme', 'dark-mode');
            updateThemeIcon('dark-mode');
        }
    });

    function updateThemeIcon(theme) {
        if (theme === 'dark-mode') {
            iconTheme.className = 'fas fa-sun';
        } else {
            iconTheme.className = 'fas fa-moon';
        }
    }

    // ==========================================
    // 2. Acessibilidade (Tamanho das Fontes)
    // ==========================================
    let currentFontSize = 16;
    const htmlTag = document.documentElement;

    document.getElementById('font-inc').addEventListener('click', () => {
        if (currentFontSize < 22) {
            currentFontSize += 2;
            htmlTag.style.setProperty('--base-font-size', `${currentFontSize}px`);
        }
    });

    document.getElementById('font-dec').addEventListener('click', () => {
        if (currentFontSize > 12) {
            currentFontSize -= 2;
            htmlTag.style.setProperty('--base-font-size', `${currentFontSize}px`);
        }
    });

    document.getElementById('font-reset').addEventListener('click', () => {
        currentFontSize = 16;
        htmlTag.style.setProperty('--base-font-size', '16px');
    });

    // ==========================================
    // 3. Menu Mobile (Hambúrguer)
    // ==========================================
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('open');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('open');
        });
    });

    // ==========================================
    // 4. Efeitos de Rolagem (Header & Back to Top)
    // ==========================================
    const header = document.getElementById('main-header');
    const backToTopBtn = document.getElementById('back-to-top');
    const revealElements = document.querySelectorAll('.scroll-reveal');
    const progressBars = document.querySelectorAll('.progress-bar');
    const counters = document.querySelectorAll('.counter-num');
    let triggeredDashboard = false;

    window.addEventListener('scroll', () => {
        // Mudança no Header
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Botão voltar ao topo
        if (window.scrollY > 500) {
            backToTopBtn.style.display = 'flex';
        } else {
            backToTopBtn.style.display = 'none';
        }

        // Scroll Reveal Triggers
        revealElements.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            if (elementTop < window.innerHeight - 100) {
                el.classList.add('visible');
            }
        });

        // Trigger para Animações do Dashboard e Contadores simultaneamente
        const dadosSection = document.getElementById('dados');
        if (dadosSection) {
            const sectionTop = dadosSection.getBoundingClientRect().top;
            if (sectionTop < window.innerHeight - 100 && !triggeredDashboard) {
                triggeredDashboard = true;
                
                // Ativar barras de progresso
                progressBars.forEach(bar => {
                    const targetWidth = bar.style.width;
                    bar.style.width = '0';
                    setTimeout(() => { bar.style.width = targetWidth; }, 100);
                });

                // Ativar Contadores Dinâmicos
                counters.forEach(counter => {
                    const target = +counter.getAttribute('data-target');
                    let count = 0;
                    const increment = target / 40;
                    const updateCount = () => {
                        if (count < target) {
                            count += increment;
                            counter.innerText = Math.ceil(count);
                            setTimeout(updateCount, 25);
                        } else {
                            counter.innerText = target;
                        }
                    };
                    updateCount();
                });
            }
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ==========================================
    // 5. Galeria com Lightbox Interativo
    // ==========================================
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxText = document.getElementById('lightbox-text');
    const closeLightbox = document.querySelector('.close-lightbox');

    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const caption = item.getAttribute('data-caption');
            lightboxText.innerText = caption;
            lightbox.style.display = 'flex';
        });
    });

    closeLightbox.addEventListener('click', () => {
        lightbox.style.display = 'none';
    });

    lightbox.addEventListener('click', (e) => {
        if(e.target === lightbox) {
            lightbox.style.display = 'none';
        }
    });

    // ==========================================
    // 6. Quiz Interativo (10 Perguntas Reais)
    // ==========================================
    const quizData = [
        {
            q: "Qual instituição define os SAFs como associação de árvores com cultivos ou animais?",
            o: ["IBGE", "EMBRAPA e FAO", "Ministério da Fazenda", "Anvisa"],
            a: 1,
            e: "A EMBRAPA e a FAO lideram conceitualmente as diretrizes de consorciação agroflorestal no Brasil e no mundo."
        },
        {
            q: "Sistemas agroflorestais auxiliam diretamente na contenção de qual crise global?",
            o: ["Inflação cambial", "Mudanças Climáticas", "Crise de semicondutores", "Urbanização desregulada"],
            a: 1,
            e: "Através do sequestro de carbono por plantas arbóreas, os SAFs combatem ativamente os efeitos estufa."
        },
        {
            q: "Qual a função biológica de árvores leguminosas inseridas nos SAFs?",
            o: ["Fixação biológica de Nitrogênio", "Aumentar a acidez", "Bloquear totalmente a água", "Refletir toda a radiação"],
            a: 0,
            e: "As leguminosas captam nitrogênio atmosférico e enriquecem naturalmente o solo produtivo."
        },
        {
            q: "O que significa a sigla ILPF mantida pela EMBRAPA?",
            o: ["Indústria de Lavoura e Proteção Florestal", "Integração Lavoura-Pecuária-Floresta", "Imposto sobre Lavouras e Produtos Fitossanitários", "Iniciativa Livre de Produtores Forrageiros"],
            a: 1,
            e: "ILPF representa a integração científica estratégica de lavoura, pecuária e árvores na mesma área."
        },
        {
            q: "Como o manejo agroflorestal lida com o ciclo da água?",
            o: ["Impede a infiltração", "Seca os lençóis freáticos", "Melhora a infiltração e reduz a erosão", "Cria impermeabilização"],
            a: 2,
            e: "A raiz profunda das árvores cria canais estruturais estáveis que ajudam a recarregar aquíferos."
        },
        {
            q: "De onde provêm as primeiras origens históricas do manejo agroflorestal?",
            o: ["Revolução Industrial", "Povos Indígenas e tradicionais", "Laboratórios de biotecnologia em 2010", "Zonas puramente desérticas"],
            a: 1,
            e: "Povos nativos realizavam enriquecimento florestal integrado muito antes da sistematização acadêmica acadêmica."
        },
        {
            q: "Qual vantagem econômica imediata os SAFs trazem à agricultura familiar?",
            o: ["Monopólio de sementes transigentes", "Diversificação de renda ao longo do ano", "Isenção total de impostos urbanos", "Substituição de maquinário por IA"],
            a: 1,
            e: "A colheita em estratos e tempos diferentes garante fluxo financeiro contínuo e segurança alimentar."
        },
        {
            q: "Qual órgão monitora a cobertura do solo e estatísticas agrícolas oficiais no Brasil?",
            o: ["FAO", "IBGE / MAPA", "IPAM", "ONU"],
            a: 1,
            e: "O IBGE e o Ministério da Agricultura mapeiam censos agropecuários fundamentais à validação econômica rural."
        },
        {
            q: "O termo 'Agricultura Sintrópica' está atrelado a qual princípio?",
            o: ["Esgotamento mineral rápido", "Uso intensivo de agrotóxicos", "Processos naturais de regeneração e sucessão ecológica", "Uso exclusivo de estufas fechadas"],
            a: 2,
            e: "A sintropia trabalha a favor da sucessão natural de espécies, aumentando a energia útil do sistema biológico."
        },
        {
            q: "O que a fixação estável de carbono nas raízes previne diretamente?",
            o: ["Lixiviação extrema", "Liberação de gases de efeito estufa na atmosfera", "Compactação magnética", "Aumento de pragas aéreas"],
            a: 1,
            e: "Armazenar carbono na biomassa florestal perene estoca material biológico que aqueceria o planeta."
        }
    ];

    let currentQuestionIndex = 0;
    let score = 0;
    const quizContainer = document.getElementById('quiz-container');
    const quizProgressBar = document.getElementById('quiz-progress-bar');

    function loadQuestion() {
        if (currentQuestionIndex >= quizData.length) {
            showQuizResults();
            return;
        }

        const progressPercent = (currentQuestionIndex / quizData.length) * 100;
        quizProgressBar.style.width = `${progressPercent}%`;

        const qData = quizData[currentQuestionIndex];
        quizContainer.innerHTML = `
            <div class="quiz-question"><strong>Pergunta ${currentQuestionIndex + 1} de ${quizData.length}:</strong> ${qData.q}</div>
            <div class="quiz-options">
                ${qData.o.map((opt, i) => `<button class="quiz-opt-btn" data-index="${i}">${opt}</button>`).join('')}
            </div>
            <div id="quiz-feedback" class="quiz-explanation" style="display:none;"></div>
            <button id="quiz-next" class="quiz-next-btn" style="display:none;">Próxima Pergunta</button>
        `;

        const optionButtons = quizContainer.querySelectorAll('.quiz-opt-btn');
        optionButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const selectedIndex = parseInt(e.target.getAttribute('data-index'));
                checkAnswer(selectedIndex, qData);
            });
        });
    }

    function checkAnswer(selectedIndex, qData) {
        const feedback = document.getElementById('quiz-feedback');
        const nextBtn = document.getElementById('quiz-next');
        const optionButtons = quizContainer.querySelectorAll('.quiz-opt-btn');

        // Desabilita novas tentativas para a mesma questão
        optionButtons.forEach(btn => btn.disabled = true);

        if (selectedIndex === qData.a) {
            score++;
            feedback.className = "quiz-explanation correct";
            feedback.innerHTML = `<strong>Correto!</strong> ${qData.e}`;
        } else {
            feedback.className = "quiz-explanation wrong";
            feedback.innerHTML = `<strong>Incorreto.</strong> A resposta certa era: "${qData.o[qData.a]}". <br><small>${qData.e}</small>`;
        }

        feedback.style.display = "block";
        nextBtn.style.display = "block";

        nextBtn.addEventListener('click', () => {
            currentQuestionIndex++;
            loadQuestion();
        });
    }

    function showQuizResults() {
        quizProgressBar.style.width = `100%`;
        quizContainer.innerHTML = `
            <div class="text-center">
                <h3>Quiz Concluído!</h3>
                <p class="lead-text" style="margin: 20px 0;">Sua pontuação final foi de <strong>${score}</strong> acertos de <strong>${quizData.length}</strong> perguntas.</p>
                <p>${score >= 7 ? "Excelente! Você possui sólido domínio sobre os conceitos científicos das agroflorestas." : "Bom esforço! Revise os dados institucionais para aprimorar seus conhecimentos."}</p>
                <button id="quiz-restart" class="btn btn-primary" style="margin-top:20px;">Refazer Quiz</button>
            </div>
        `;

        document.getElementById('quiz-restart').addEventListener('click', () => {
            currentQuestionIndex = 0;
            score = 0;
            loadQuestion();
        });
    }

    // Inicialização do Quiz
    loadQuestion();
});
