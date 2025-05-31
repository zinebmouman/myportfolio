const navLinks = document.querySelectorAll('header nav a');
const logoLink = document.querySelector('.logo');
const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('header nav');
const sections = document.querySelectorAll('section');

menuIcon.addEventListener('click', () =>{
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
});

const activePage = () => {
    const header = document.querySelector('header')
    const barBox = document.querySelector('.bars-box')
    navLinks.forEach(link => {
        link.classList.remove('active');
    });

    header.classList.remove('active');
    setTimeout(()=> {
        header.classList.add('active');
    }, 1100);

    barBox.classList.remove('active');
    setTimeout(()=> {
        barBox.classList.add('active');
    }, 1100);

    sections.forEach(section => {
        section.classList.remove('active');
    });

    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');
};

navLinks.forEach((link, idx) => {
    link.addEventListener('click', () => {
        if (!link.classList.contains('active')) {
            activePage();
            link.classList.add('active');

            setTimeout(() => {
                sections[idx].classList.add('active');
            }, 1100);
        }
    });
});

logoLink.addEventListener('click', () => {
    if (!navLinks[0].classList.contains('active')) {
        activePage();
        navLinks[0].classList.add('active');

        setTimeout(() => {
            sections[0].classList.add('active');
        }, 1100);
    }
});

// GESTION DES BOUTONS RESUME - VERSION CORRIGÉE
const resumeBtnsContainer = document.querySelector('.resume-container .resume-box:first-child');
const resumeBtns = resumeBtnsContainer.querySelectorAll('.resume-btn');
const resumeDetails = document.querySelectorAll('.resume-detail');

// Supprimer tous les anciens événements pour éviter les doublons
resumeBtns.forEach(btn => {
    // Cloner le bouton pour supprimer tous les événements
    const newBtn = btn.cloneNode(true);
    btn.parentNode.replaceChild(newBtn, btn);
});

// Re-sélectionner les nouveaux boutons
const newResumeBtns = resumeBtnsContainer.querySelectorAll('.resume-btn');

newResumeBtns.forEach((btn, idx) => {
    btn.addEventListener('click', () => {
        // Retirer active de tous les boutons
        newResumeBtns.forEach(b => b.classList.remove('active'));
        // Ajouter active au bouton cliqué
        btn.classList.add('active');

        // Retirer active de tous les détails
        resumeDetails.forEach(detail => detail.classList.remove('active'));
        // Ajouter active au détail correspondant
        if (resumeDetails[idx]) {
            resumeDetails[idx].classList.add('active');
        }

        // Gestion spéciale pour la section Skills (index 2)
        if (idx === 2 && resumeDetails[2]) {
            setTimeout(() => {
                animateSkills();
            }, 100);
        }
    });
});

const arrowRight = document.querySelector('.portfolio-box .navigation .arrow-right');
const arrowLeft = document.querySelector('.portfolio-box .navigation .arrow-left');

let index = 0;

const activePortfolio = () => {
    const imgSlider = document.querySelector('.portfolio-carousel .img-slide');
    const portfolioDetails=document.querySelectorAll('.portfolio-detail')

    imgSlider.style.transform = `translateX(calc(${index * -100}% - ${index * 2}rem))`;
    portfolioDetails.forEach(detail => {
        detail.classList.remove('active')
    });
    portfolioDetails[index].classList.add('active');
};

arrowRight.addEventListener('click', () => {
    if (index < 4) {
        index++;
        arrowLeft.classList.remove('disabled');
    } else {
        index = 6;
        arrowRight.classList.add('disabled');
    }
    activePortfolio();
});

arrowLeft.addEventListener('click', () => {
    if (index > 1) {
        index--;
        arrowRight.classList.remove('disabled');
    } else {
        index = 0;
        arrowLeft.classList.add('disabled');
    }
    activePortfolio();
});

// Fonction cubic-bezier pour reproduire exactement la courbe CSS
function cubicBezier(t, p0, p1, p2, p3) {
    return Math.pow(1 - t, 3) * p0 +
        3 * Math.pow(1 - t, 2) * t * p1 +
        3 * (1 - t) * Math.pow(t, 2) * p2 +
        Math.pow(t, 3) * p3;
}

// Fonction d'easing cubic-bezier(0.4, 0, 0.2, 1) identique au CSS
function cssEasing(t) {
    return cubicBezier(t, 0, 0.4, 0.2, 1);
}

// Fonction pour animer les cercles de compétences avec synchronisation parfaite
function animateSkills() {
    const skillCharts = document.querySelectorAll('.skill-chart');

    skillCharts.forEach((chart, index) => {
        const percent = parseInt(chart.getAttribute('data-percent'));
        const skillCircleFill = chart.querySelector('.skill-circle-fill');
        const skillPercent = chart.querySelector('.skill-percent');

        // Reset l'animation
        skillCircleFill.style.strokeDasharray = '0, 100';
        skillPercent.style.opacity = '0';

        // Animer avec un délai pour créer un effet cascade
        setTimeout(() => {
            // Configuration initiale du pourcentage
            skillPercent.style.opacity = '1';
            skillPercent.style.position = 'absolute';
            skillPercent.style.fontSize = '1.2rem';
            skillPercent.style.fontWeight = 'bold';
            skillPercent.style.background = 'var(--bg-color)';
            skillPercent.style.padding = '2px 6px';
            skillPercent.style.borderRadius = '10px';
            skillPercent.style.border = '2px solid var(--main-color)';
            skillPercent.style.color = 'var(--main-color)';
            skillPercent.style.zIndex = '10';
            skillPercent.style.transformOrigin = 'center center';
            skillPercent.style.transition = 'none';
            skillPercent.textContent = '0%';

            // Démarrer l'animation du cercle
            skillCircleFill.style.strokeDasharray = `${percent}, 100`;
            skillCircleFill.style.transition = 'stroke-dasharray 1.5s cubic-bezier(0.4, 0, 0.2, 1)';

            // Animer le pourcentage avec la même courbe d'easing
            animatePercentageSync(skillPercent, percent, chart);
        }, index * 100);
    });
}

// Fonction pour animer le pourcentage avec position finale à 0°
function animatePercentageSync(element, targetPercent, chart) {
    const duration = 1500; // Même durée que le CSS
    let startTime = null;

    // Dimensions du chart
    const centerX = chart.offsetWidth / 2;
    const centerY = chart.offsetHeight / 2;
    const radius = centerX * 0.75; // Même rayon que le cercle

    function animate(timestamp) {
        if (!startTime) startTime = timestamp;

        const elapsed = timestamp - startTime;
        const rawProgress = Math.min(elapsed / duration, 1);

        // Appliquer la même courbe d'easing que le CSS
        const easedProgress = cssEasing(rawProgress);

        // Calculer l'angle actuel basé sur le progress avec easing
        const currentPercent = easedProgress * targetPercent;
        const angle = (currentPercent / 100 * 2 * Math.PI) - (Math.PI / 2);

        // Position du pourcentage pendant l'animation
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);

        // Appliquer la position
        element.style.left = `${x}px`;
        element.style.top = `${y}px`;
        element.style.transform = 'translate(-50%, -50%)';
        element.textContent = `${Math.round(currentPercent)}%`;

        if (rawProgress < 1) {
            requestAnimationFrame(animate);
        } else {
            // Animation terminée - TOUS les pourcentages se placent à 0° (en haut)
            const finalAngle = -Math.PI / 2; // 0° = en haut du cercle
            const finalX = centerX + radius * Math.cos(finalAngle);
            const finalY = centerY + radius * Math.sin(finalAngle);

            // Animation de transition vers la position finale à 0°
            element.style.transition = 'left 0.8s ease-out, top 0.8s ease-out, transform 0.3s ease';
            element.style.left = `${finalX}px`;
            element.style.top = `${finalY}px`;
            element.textContent = `${targetPercent}%`;

            // Petit effet de rebond à la fin
            element.style.transform = 'translate(-50%, -50%) scale(1.2)';

            setTimeout(() => {
                element.style.transform = 'translate(-50%, -50%) scale(1)';
            }, 300);

            // Nettoyer les transitions après l'animation
            setTimeout(() => {
                element.style.transition = 'none';
            }, 1100);
        }
    }

    requestAnimationFrame(animate);
}

// Déclencher l'animation au chargement de la page si Skills est déjà visible
document.addEventListener('DOMContentLoaded', () => {
    const skillsButton = document.querySelector('.resume-btn:nth-child(3)');
    if (skillsButton && skillsButton.classList.contains('active')) {
        setTimeout(() => {
            animateSkills();
        }, 500);
    }
});

// Traductions complètes avec la nouvelle section
const translations = {
    en: {
        // Header
        home: "Home",
        services: "Services",
        resume: "Resume",
        portfolio: "Portfolio",
        contact: "Contact",

        // Home Section
        title: "Zineb Mouman - Portfolio",
        homeTitle: "Zineb Mouman",
        homeSubtitle: "I'm a",
        professions: {
            software: "Software engineer",
            devops: "DevOps engineer",
            cloud: "Cloud engineer",
            it: "IT Enthusiast"
        },
        homeText: "Hello, I'm Zineb, a software engineering student specializing in Data Science and IoT at ENSIAS, with a strong background in mathematics and physics from preparatory classes (MP). I have two years of hands-on experience in web/mobile development, DevOps, data management, and data science. Currently, I'm focusing on microservices projects using Kubernetes, Kafka, and Docker. Beyond academics, I lead the Event Cell at ENSIAS IT Club, organizing events like ITHOLIC, which has strengthened my leadership, management, and teamwork skills.",
        downloadCV: "Download CV",

        // Services Section
        servicesTitle: "My Services",
        webDev: "Web Development",
        webDesc: "I design and build responsive, dynamic websites, ensuring an engaging and optimized user experience.",
        mobileDev: "Mobile Development",
        mobileDesc: "I create intuitive and high-performing mobile applications, bringing innovative ideas to users' fingertips.",
        dbManager: "Database Manager",
        dbDesc: "I manage and optimize databases to ensure efficient data storage, security, and easy accessibility.",
        cloud: "Cloud Enthusiast",
        cloudDesc: "I leverage cloud platforms to build scalable and resilient solutions, improving system performance and reliability.",
        devops: "DevOps Enthusiast",
        devopsDesc: "I implement DevOps practices to automate processes, optimize workflows, and accelerate software delivery.",
        dataScience: "Data Scientist",
        dataDesc: "I analyze data to extract meaningful insights, helping to drive strategic decisions and innovative solutions.",

        // Resume Section
        resumeTitle: "Why Hire Me?",
        resumeDesc: "Discover what makes me the ideal candidate for your team.",
        experience: "Experience",
        education: "Education",
        skills: "Skills",
        hobbiesVolunteer: "Hobbies & Volunteer",
        about: "About Me",
        expTitle: "My Experience",
        expDesc: "Professional experiences including internships and voluntary work.",
        eduTitle: "My Education",
        eduDesc: "Academic background and training.",
        skillsTitle: "My Skills",
        skillsDesc: "Technical skills across languages, frameworks, databases, platforms, and tools.",
        hobbiesTitle: "Hobbies & Volunteer Work",
        hobbiesDesc: "Personal interests and community involvement that shape my character and values.",
        aboutTitle: "About Me",
        aboutDesc: "Get to know me better through some key personal details.",

        // Hobbies & Volunteer
        creativeHobbies: "Creative Hobbies",
        drawing: "Drawing & Illustration",
        drawingDesc: "Passionate about sketching and digital art. I enjoy creating illustrations that blend traditional techniques with modern digital tools, expressing creativity through visual storytelling.",
        handmade: "Handmade Creations",
        handmadeDesc: "Love crafting unique items with my hands, from decorative pieces to functional objects. This hobby enhances my attention to detail and problem-solving skills while providing a creative outlet.",
        volunteerActivities: "Volunteer Activities",
        cindh: "CINDH Social Club Volunteer",
        cindhDesc: "Active volunteer in CINDH, a social club dedicated to organizing community activities to help people in need. Participated in various humanitarian initiatives and social support programs.",
        itClub: "ENSIAS IT Club Event Manager",
        itClubDesc: "Lead the Event Cell at ENSIAS IT Club, a technical organization that hosts events to explore the IT world. Organize workshops, conferences, and tech meetups to foster learning and networking.",

        // About Me Items
        aboutItems: {
            name: "Name",
            city: "City",
            nationality: "Nationality",
            phone: "Phone",
            email: "Email",
            languages: "Languages"
        },
        aboutValues: {
            name: "Zineb Mouman",
            city: "Rabat",
            nationality: "Moroccan",
            phone: "+212 621-034162",
            email: "moumanzineb9@gmail.com",
            languages: "English, French, Arabic"
        },

        // Portfolio Section
        portfolioTitle: "Latest Projects",
        project1: "SQL vs NoSQL Comparison",
        project1Desc: "Comparative study between Firebase, MongoDB and PostgreSQL with web/mobile applications integrating AI modules, Docker deployment, and security assessment.",
        project2: "Recruitment Application",
        project2Desc: "Microservices platform for complete recruitment process management with OCR modules and AI for CV analysis.",
        project3: "Online Farmers Market",
        project3Desc: "Web application for product management, orders, delivery personnel, complaints, and optimized payments.",
        project4: "Medical Office Management",
        project4Desc: "Web application for managing medical records, patient appointments, and secure online access.",
        project5: "Private School Management",
        project5Desc: "Web platform for managing students, teachers, courses, registrations and online payments.",
        project6: "House Rental (Android)",
        project6Desc: "Android mobile application to search, rent and manage available houses.",
        liveProject: "Live Project",
        githubRepo: "Github Repository",

        // Contact Section
        contactTitle: "Let's Work Together",
        contactSubtitle: "Contact section",
        phone: "Phone",
        email: "Email",
        address: "Address",
        contactFormTitle: "Contact Me!",
        namePlaceholder: "Full Name",
        emailPlaceholder: "Email Address",
        phonePlaceholder: "Phone Number",
        subjectPlaceholder: "Email Subject",
        messagePlaceholder: "Your Message",
        sendBtn: "Send Message"
    },
    fr: {
        // Header
        home: "Accueil",
        services: "Services",
        resume: "CV",
        portfolio: "Portfolio",
        contact: "Contact",

        // Home Section
        title: "Zineb Mouman - Portfolio",
        homeTitle: "Zineb Mouman",
        homeSubtitle: "Je suis",
        professions: {
            software: "Ingénieure logiciel",
            devops: "Ingénieure DevOps",
            cloud: "Ingénieure cloud",
            it: "Passionnée d'informatique"
        },
        homeText: "Bonjour, je suis Zineb, étudiante en ingénierie logiciel spécialisée en Science des Données et IoT à l'ENSIAS, avec une solide formation en mathématiques et physique issue des classes préparatoires (MP). J'ai deux ans d'expérience pratique en développement web/mobile, DevOps, gestion de données et science des données. Actuellement, je me concentre sur des projets de microservices utilisant Kubernetes, Kafka et Docker. Au-delà des études, je dirige la Cellule Événements du ENSIAS IT Club, organisant des événements comme ITHOLIC, ce qui a renforcé mes compétences en leadership, gestion et travail d'équipe.",
        downloadCV: "Télécharger CV",

        // Services Section
        servicesTitle: "Mes Services",
        webDev: "Développement Web",
        webDesc: "Je conçois et construis des sites web dynamiques et responsives, garantissant une expérience utilisateur engageante et optimisée.",
        mobileDev: "Développement Mobile",
        mobileDesc: "Je crée des applications mobiles intuitives et performantes, apportant des idées innovantes au bout des doigts des utilisateurs.",
        dbManager: "Gestion de Bases de Données",
        dbDesc: "J'administre et optimise des bases de données pour assurer un stockage efficace, sécurisé et facilement accessible des données.",
        cloud: "Enthousiaste du Cloud",
        cloudDesc: "J'utilise des plateformes cloud pour construire des solutions évolutives et résilientes, améliorant les performances et la fiabilité du système.",
        devops: "Enthousiaste DevOps",
        devopsDesc: "Je mets en œuvre des pratiques DevOps pour automatiser les processus, optimiser les workflows et accélérer la livraison logicielle.",
        dataScience: "Data Scientist",
        dataDesc: "J'analyse des données pour en extraire des insights significatifs, aidant à orienter des décisions stratégiques et des solutions innovantes.",

        // Resume Section
        resumeTitle: "Pourquoi me recruter?",
        resumeDesc: "Découvrez ce qui fait de moi la candidate idéale pour votre équipe.",
        experience: "Expérience",
        education: "Éducation",
        skills: "Compétences",
        hobbiesVolunteer: "Loisirs & Bénévolat",
        about: "À propos",
        expTitle: "Mon Expérience",
        expDesc: "Expériences professionnelles incluant stages et travail bénévole.",
        eduTitle: "Ma Formation",
        eduDesc: "Parcours académique et formations.",
        skillsTitle: "Mes Compétences",
        skillsDesc: "Compétences techniques en langages, frameworks, bases de données, plateformes et outils.",
        hobbiesTitle: "Loisirs & Bénévolat",
        hobbiesDesc: "Intérêts personnels et engagement communautaire qui façonnent mon caractère et mes valeurs.",
        aboutTitle: "À propos",
        aboutDesc: "Apprenez à mieux me connaître à travers quelques détails personnels clés.",

        // Hobbies & Volunteer
        creativeHobbies: "Loisirs Créatifs",
        drawing: "Dessin & Illustration",
        drawingDesc: "Passionnée de croquis et d'art numérique. J'aime créer des illustrations qui mélangent techniques traditionnelles et outils numériques modernes, exprimant la créativité à travers la narration visuelle.",
        handmade: "Créations Artisanales",
        handmadeDesc: "J'adore fabriquer des objets uniques avec mes mains, des pièces décoratives aux objets fonctionnels. Ce passe-temps améliore mon attention aux détails et mes compétences de résolution de problèmes.",
        volunteerActivities: "Activités Bénévoles",
        cindh: "Bénévole Club Social CINDH",
        cindhDesc: "Bénévole active au CINDH, un club social dédié à l'organisation d'activités communautaires pour aider les personnes dans le besoin. Participation à diverses initiatives humanitaires et programmes de soutien social.",
        itClub: "Responsable Événements Club IT ENSIAS",
        itClubDesc: "Dirige la Cellule Événements du Club IT ENSIAS, une organisation technique qui organise des événements pour explorer le monde de l'informatique. Organisation d'ateliers, conférences et rencontres tech.",

        // About Me Items
        aboutItems: {
            name: "Nom",
            city: "Ville",
            nationality: "Nationalité",
            phone: "Téléphone",
            email: "Email",
            languages: "Langues"
        },
        aboutValues: {
            name: "Zineb Mouman",
            city: "Rabat",
            nationality: "Marocaine",
            phone: "+212 621-034162",
            email: "moumanzineb9@gmail.com",
            languages: "Anglais, Français, Arabe"
        },

        // Portfolio Section
        portfolioTitle: "Derniers Projets",
        project1: "Comparaison SQL vs NoSQL",
        project1Desc: "Étude comparative entre Firebase, MongoDB et PostgreSQL avec applications web/mobile intégrant des modules IA, déploiement Docker, et évaluation sécurité.",
        project2: "Application de Recrutement",
        project2Desc: "Plateforme microservices pour la gestion complète du processus de recrutement avec modules OCR et IA d'analyse de CVs.",
        project3: "Marché Fermier en ligne",
        project3Desc: "Application web de gestion de produits, commandes, livreurs, réclamations, et paiements optimisés.",
        project4: "Gestion de Cabinet Médical",
        project4Desc: "Application web pour la gestion des dossiers médicaux, rendez-vous patients, et accès sécurisé en ligne.",
        project5: "Gestion d'École Privée",
        project5Desc: "Plateforme web pour la gestion des étudiants, enseignants, cours, inscriptions et paiements en ligne.",
        project6: "Location de Maisons (Android)",
        project6Desc: "Application mobile Android pour rechercher, louer et gérer des maisons disponibles.",
        liveProject: "Voir le Projet",
        githubRepo: "Dépôt Github",

        // Contact Section
        contactTitle: "Travaillons Ensemble",
        contactSubtitle: "Section contact",
        phone: "Téléphone",
        email: "Email",
        address: "Adresse",
        contactFormTitle: "Contactez moi!",
        namePlaceholder: "Nom Complet",
        emailPlaceholder: "Adresse Email",
        phonePlaceholder: "Numéro de Téléphone",
        subjectPlaceholder: "Sujet du Message",
        messagePlaceholder: "Votre Message",
        sendBtn: "Envoyer"
    }
};

// Sélecteur de langue
const langBtn = document.querySelector('.lang-btn');
const langOptions = document.querySelector('.lang-options');

// Gestion du clic sur le bouton de langue
if (langBtn) {
    langBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (langOptions) {
            langOptions.classList.toggle('show');
        }
    });
}

// Fermer le menu quand on clique ailleurs
document.addEventListener('click', () => {
    if (langOptions) {
        langOptions.classList.remove('show');
    }
});

// Gestion du changement de langue
document.querySelectorAll('.lang-option').forEach(option => {
    option.addEventListener('click', (e) => {
        const lang = e.target.dataset.lang;
        changeLanguage(lang);
        if (langOptions) {
            langOptions.classList.remove('show');
        }

        // Mettre à jour le bouton principal
        if (langBtn) {
            langBtn.innerHTML = lang === 'fr'
                ? `<i class='bx bx-globe'></i><span>FR</span>`
                : `<i class='bx bx-globe'></i><span>EN</span>`;
        }
    });
});

// Fonction pour changer la langue
function changeLanguage(lang) {
    const t = translations[lang];

    // Mettre à jour le titre de la page
    document.title = t.title;

    // Header
    const headerLinks = document.querySelectorAll('header nav a');
    if (headerLinks.length >= 5) {
        headerLinks[0].textContent = t.home;
        headerLinks[1].textContent = t.services;
        headerLinks[2].textContent = t.resume;
        headerLinks[3].textContent = t.portfolio;
        headerLinks[4].textContent = t.contact;
    }

    // Home Section
    const homeSection = document.querySelector('.home-detail');
    if (homeSection) {
        const h1 = homeSection.querySelector('h1');
        const h2 = homeSection.querySelector('h2');
        const p = homeSection.querySelector('p');
        const btn = homeSection.querySelector('.btn');

        if (h1) h1.textContent = t.homeTitle;
        if (h2) {
            h2.innerHTML = `${t.homeSubtitle} 
                <span style="--i:4;" data-text="${t.professions.software}">${t.professions.software}</span>
                <span style="--i:3;" data-text="${t.professions.devops}">${t.professions.devops}</span>
                <span style="--i:2;" data-text="${t.professions.cloud}">${t.professions.cloud}</span>
                <span style="--i:1;" data-text="${t.professions.it}">${t.professions.it}</span>`;
        }
        if (p) p.textContent = t.homeText;
        if (btn) btn.textContent = t.downloadCV;
    }

    // Resume Section - Boutons
    const resumeBox = document.querySelector('.resume-box:first-child');
    if (resumeBox) {
        const h2 = resumeBox.querySelector('h2');
        const desc = resumeBox.querySelector('.desc');
        const buttons = resumeBox.querySelectorAll('.resume-btn');

        if (h2) h2.textContent = t.resumeTitle;
        if (desc) desc.textContent = t.resumeDesc;

        if (buttons.length >= 5) {
            buttons[0].textContent = t.experience;
            buttons[1].textContent = t.education;
            buttons[2].textContent = t.skills;
            buttons[3].textContent = t.hobbiesVolunteer;
            buttons[4].textContent = t.about;
        }
    }

    // Stocker la préférence de langue
    localStorage.setItem('preferredLanguage', lang);
}

// Charger la langue préférée au démarrage
document.addEventListener('DOMContentLoaded', () => {
    const preferredLanguage = localStorage.getItem('preferredLanguage') || 'en';
    changeLanguage(preferredLanguage);

    // Mettre à jour le bouton principal
    if (langBtn) {
        langBtn.innerHTML = preferredLanguage === 'fr'
            ? `<i class='bx bx-globe'></i><span>FR</span>`
            : `<i class='bx bx-globe'></i><span>EN</span>`;
    }
});

// Sélection des éléments pour le thème
const themeIcon = document.getElementById('theme-icon');
const body = document.body;

// Vérifier le thème stocké ou la préférence système
const savedTheme = localStorage.getItem('theme') ||
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
setTheme(savedTheme);

// Fonction pour basculer le thème
function toggleTheme() {
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
}

// Fonction pour appliquer le thème
function setTheme(theme) {
    body.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);

    // Mettre à jour l'icône
    if (themeIcon) {
        themeIcon.className = theme === 'dark' ? 'bx bx-sun' : 'bx bx-moon';
    }

    // Mettre à jour les couleurs spécifiques si nécessaire
    updateThemeColors(theme);
}

// Fonction pour mettre à jour les couleurs spécifiques
function updateThemeColors(theme) {
    // Exemple : ajuster la couleur du texte alternatif si nécessaire
    const alternateTextElements = document.querySelectorAll('.alternate-text-color');
    alternateTextElements.forEach(el => {
        el.style.color = theme === 'dark' ? '#ccc' : '#555';
    });
}

// Écouteur d'événement pour le bouton de thème
if (themeIcon) {
    themeIcon.addEventListener('click', toggleTheme);
}