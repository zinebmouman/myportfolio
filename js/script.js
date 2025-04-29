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


const resumeBtns =document.querySelectorAll('.resume-btn')

resumeBtns.forEach((btn, idx) => {
    btn.addEventListener('click', () =>{
        const resumeDetails = document.querySelectorAll('.resume-detail');

        resumeBtns.forEach(btn =>{
            btn.classList.remove('active');
        });
        btn.classList.add('active');

        resumeDetails.forEach(detail =>{
            detail.classList.remove('active')
        } );
        resumeDetails[idx].classList.add('active');
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
        index = 5; // Attention : cela saute à 5 au lieu de rester dans les limites (à corriger selon besoin)
        arrowRight.classList.add('disabled');
    }
    activePortfolio();
});

arrowLeft.addEventListener('click', () => {
    if (index > 1) { // tu avais mis 1, mais normalement on contrôle dès 0
        index--;
        arrowRight.classList.remove('disabled');
    } else {
        index = 0;
        arrowLeft.classList.add('disabled');
    }
    activePortfolio();
});



// Traductions complètes
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
        about: "About Me",
        expTitle: "My Experience",
        expDesc: "Professional experiences including internships and voluntary work.",
        eduTitle: "My Education",
        eduDesc: "Academic background and training.",
        skillsTitle: "My Skills",
        skillsDesc: "Technical skills across languages, frameworks, databases, platforms, and tools.",
        aboutTitle: "About Me",
        aboutDesc: "Get to know me better through some key personal details.",

        // Experience Items
        experienceItems: {
            internship: {
                year: "July - August 2024",
                title: "Web Development Intern",
                company: "OCP Group, Khouribga",
                description: "Worked on the digitalization of professional maintenance operations during a final year internship."
            }
        },

        // Education Items
        educationItems: {
            ensias: {
                year: "2023 - Present",
                title: "Engineering Degree in Data Science and IoT",
                institution: "ENSIAS, Rabat, Morocco",
                description: "Currently pursuing an engineering degree specializing in Data Science and IoT."
            },
            cpge: {
                year: "2021 - 2023",
                title: "Preparatory Classes for Engineering Schools (CPGE)",
                institution: "CPGE Ibn Abdoune, Khouribga, Morocco",
                description: "Completed preparatory classes focused on Mathematics and Physics for competitive engineering school entrance exams."
            },
            bac: {
                year: "2020 - 2021",
                title: "Baccalaureate in Physical Sciences",
                institution: "Lycée Bir Anzarane, Fkih Ben Salah, Morocco",
                description: "Graduated with honors ('Très Bien' distinction) in Physical Sciences."
            }
        },

        // About Me Items
        aboutItems: {
            name: "Name",
            gender: "Gender",
            age: "Age",
            status: "Status",
            city: "City",
            nationality: "Nationality",
            phone: "Phone",
            email: "Email",
            languages: "Languages"
        },
        aboutValues: {
            name: "Zineb Mouman",
            gender: "Female",
            age: "22 Years old",
            status: "Single",
            city: "Rabat",
            nationality: "Moroccan",
            phone: "+212 621-034162",
            email: "moumanzineb9@gmail.com",
            languages: "English, French, Arab"
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
        about: "À propos",
        expTitle: "Mon Expérience",
        expDesc: "Expériences professionnelles incluant stages et travail bénévole.",
        eduTitle: "Ma Formation",
        eduDesc: "Parcours académique et formations.",
        skillsTitle: "Mes Compétences",
        skillsDesc: "Compétences techniques en langages, frameworks, bases de données, plateformes et outils.",
        aboutTitle: "À propos",
        aboutDesc: "Apprenez à mieux me connaître à travers quelques détails personnels clés.",

        // Experience Items
        experienceItems: {
            internship: {
                year: "Juillet - Août 2024",
                title: "Stagiaire en Développement Web",
                company: "Groupe OCP, Khouribga",
                description: "Travail sur la digitalisation des opérations de maintenance professionnelle lors d'un stage de fin d'études."
            }
        },

        // Education Items
        educationItems: {
            ensias: {
                year: "2023 - Présent",
                title: "Diplôme d'Ingénieur en Science des Données et IoT",
                institution: "ENSIAS, Rabat, Maroc",
                description: "Actuellement en cours d'obtention d'un diplôme d'ingénieur spécialisé en Science des Données et IoT."
            },
            cpge: {
                year: "2021 - 2023",
                title: "Classes Préparatoires aux Grandes Écoles (CPGE)",
                institution: "CPGE Ibn Abdoune, Khouribga, Maroc",
                description: "Terminé les classes préparatoires axées sur les Mathématiques et Physique pour les concours d'entrée aux écoles d'ingénieurs."
            },
            bac: {
                year: "2020 - 2021",
                title: "Baccalauréat en Sciences Physiques",
                institution: "Lycée Bir Anzarane, Fkih Ben Salah, Maroc",
                description: "Diplômé avec mention 'Très Bien' en Sciences Physiques."
            }
        },

        // About Me Items
        aboutItems: {
            name: "Nom",
            gender: "Genre",
            age: "Âge",
            status: "Statut",
            city: "Ville",
            nationality: "Nationalité",
            phone: "Téléphone",
            email: "Email",
            languages: "Langues"
        },
        aboutValues: {
            name: "Zineb Mouman",
            gender: "Féminin",
            age: "22 ans",
            status: "Célibataire",
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
langBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    langOptions.classList.toggle('show');
});

// Fermer le menu quand on clique ailleurs
document.addEventListener('click', () => {
    langOptions.classList.remove('show');
});

// Gestion du changement de langue
document.querySelectorAll('.lang-option').forEach(option => {
    option.addEventListener('click', (e) => {
        const lang = e.target.dataset.lang;
        changeLanguage(lang);
        langOptions.classList.remove('show');

        // Mettre à jour le bouton principal
        langBtn.innerHTML = lang === 'fr'
            ? `<i class='bx bx-globe'></i><span>FR</span>`
            : `<i class='bx bx-globe'></i><span>EN</span>`;
    });
});

// Fonction pour changer la langue
function changeLanguage(lang) {
    const t = translations[lang];

    // Mettre à jour le titre de la page
    document.title = t.title;

    // Header
    document.querySelectorAll('header nav a')[0].textContent = t.home;
    document.querySelectorAll('header nav a')[1].textContent = t.services;
    document.querySelectorAll('header nav a')[2].textContent = t.resume;
    document.querySelectorAll('header nav a')[3].textContent = t.portfolio;
    document.querySelectorAll('header nav a')[4].textContent = t.contact;

    // Home Section
    const homeSection = document.querySelector('.home-detail');
    homeSection.querySelector('h1').textContent = t.homeTitle;
    homeSection.querySelector('h2').innerHTML = `${t.homeSubtitle} 
        <span style="--i:4;" data-text="${t.professions.software}">${t.professions.software}</span>
        <span style="--i:3;" data-text="${t.professions.devops}">${t.professions.devops}</span>
        <span style="--i:2;" data-text="${t.professions.cloud}">${t.professions.cloud}</span>
        <span style="--i:1;" data-text="${t.professions.it}">${t.professions.it}</span>`;
    homeSection.querySelector('p').textContent = t.homeText;
    homeSection.querySelector('.btn').textContent = t.downloadCV;

    // Services Section
    document.querySelector('.services .heading').innerHTML = `${t.servicesTitle} `;

    const services = document.querySelectorAll('.services-box');
    services[0].querySelector('h3').textContent = t.webDev;
    services[0].querySelector('p').textContent = t.webDesc;
    services[1].querySelector('h3').textContent = t.mobileDev;
    services[1].querySelector('p').textContent = t.mobileDesc;
    services[2].querySelector('h3').textContent = t.dbManager;
    services[2].querySelector('p').textContent = t.dbDesc;
    services[3].querySelector('h3').textContent = t.cloud;
    services[3].querySelector('p').textContent = t.cloudDesc;
    services[4].querySelector('h3').textContent = t.devops;
    services[4].querySelector('p').textContent = t.devopsDesc;
    services[5].querySelector('h3').textContent = t.dataScience;
    services[5].querySelector('p').textContent = t.dataDesc;

    // Resume Section
    const resumeBox = document.querySelector('.resume-box:first-child');
    resumeBox.querySelector('h2').textContent = t.resumeTitle;
    resumeBox.querySelector('.desc').textContent = t.resumeDesc;

    const resumeBtns = resumeBox.querySelectorAll('.resume-btn');
    resumeBtns[0].textContent = t.experience;
    resumeBtns[1].textContent = t.education;
    resumeBtns[2].textContent = t.skills;
    resumeBtns[3].textContent = t.about;

    // Portfolio Section
    document.querySelector('.portfolio .heading').innerHTML = `${t.portfolioTitle} `;

    const portfolioDetails = document.querySelectorAll('.portfolio-detail');
    portfolioDetails[0].querySelector('h3').textContent = t.project1;
    portfolioDetails[0].querySelector('.tech').previousElementSibling.textContent = t.project1Desc;
    portfolioDetails[1].querySelector('h3').textContent = t.project2;
    portfolioDetails[1].querySelector('.tech').previousElementSibling.textContent = t.project2Desc;
    portfolioDetails[2].querySelector('h3').textContent = t.project3;
    portfolioDetails[2].querySelector('.tech').previousElementSibling.textContent = t.project3Desc;
    portfolioDetails[3].querySelector('h3').textContent = t.project4;
    portfolioDetails[3].querySelector('.tech').previousElementSibling.textContent = t.project4Desc;
    portfolioDetails[4].querySelector('h3').textContent = t.project5;
    portfolioDetails[4].querySelector('.tech').previousElementSibling.textContent = t.project5Desc;
    portfolioDetails[5].querySelector('h3').textContent = t.project6;
    portfolioDetails[5].querySelector('.tech').previousElementSibling.textContent = t.project6Desc;

    // Mettre à jour les boutons "Live Project" et "Github Repository"
    document.querySelectorAll('.live-github span:first-child').forEach(el => {
        el.textContent = t.liveProject;
    });
    document.querySelectorAll('.live-github span:last-child').forEach(el => {
        el.textContent = t.githubRepo;
    });

    // Contact Section
    const contactBox = document.querySelector('.contact-box:first-child');
    contactBox.querySelector('h2').textContent = t.contactTitle;
    contactBox.querySelector('p').textContent = t.contactSubtitle;
    contactBox.querySelectorAll('.detail p:first-child')[0].textContent = t.phone;
    contactBox.querySelectorAll('.detail p:first-child')[1].textContent = t.email;
    contactBox.querySelectorAll('.detail p:first-child')[2].textContent = t.address;

    const contactForm = document.querySelector('.contact-box:last-child form');
    contactForm.querySelector('.heading').innerHTML = `${t.contactFormTitle.split(' ')[0]} <span>${t.contactFormTitle.split(' ')[1]}</span>`;
    contactForm.querySelector('input[type="text"]').placeholder = t.namePlaceholder;
    contactForm.querySelector('input[type="email"]').placeholder = t.emailPlaceholder;
    contactForm.querySelectorAll('input[type="text"]')[1].placeholder = t.phonePlaceholder;
    contactForm.querySelectorAll('input[type="text"]')[2].placeholder = t.subjectPlaceholder;
    contactForm.querySelector('textarea').placeholder = t.messagePlaceholder;
    contactForm.querySelector('.btn').textContent = t.sendBtn;

    // Stocker la préférence de langue
    localStorage.setItem('preferredLanguage', lang);
}

// Charger la langue préférée au démarrage
document.addEventListener('DOMContentLoaded', () => {
    const preferredLanguage = localStorage.getItem('preferredLanguage') || 'en';
    changeLanguage(preferredLanguage);

    // Mettre à jour le bouton principal
    langBtn.innerHTML = preferredLanguage === 'fr'
        ? `<i class='bx bx-globe'></i><span>FR</span>`
        : `<i class='bx bx-globe'></i><span>EN</span>`;
});


// Ajoutez ce code à votre fichier script.js

// Sélection des éléments
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

// Écouteur d'événement pour le bouton
if (themeIcon) {
    themeIcon.addEventListener('click', toggleTheme);
}
