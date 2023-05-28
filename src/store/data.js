const data = [
  {
    id: 1,
    title: 'Un super projet',
    author: {
      id: 1,
      pseudo: 'SuperCodeur',
      avatar: 'https://randomuser.me/api/portraits/men/19.jpg',
    },
    content: 'Moi je passe pas mal de temps à la taverne. J’ai jamais entendu parlé de celui-là! Ouais… Ouais je me suis gouré… Vous binez pas… Même nous on a pas tout compris.',
    member_projet: [],
    technoProjet: [
      {
        id: 7,
        label: 'JavaScript',
        color: '#EAD41C',
      },
      {
        id: 6,
        label: 'PHP',
        color: '#4d588e',
      },
      {
        id: 5,
        label: 'HTML',
        color: '#D84924',
      },
    ],
    created_at: '2013-11-01',
    status: "En cours d'équipage",
  },
  {
    id: 2,
    title: 'Projet qui tue',
    author: {
      id: 2,
      pseudo: 'PHPMan',
      avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
    },
    content: 'Oui… Ben vous… Occupez vous d’les faire ça s’ra déjà pas mal! Oui mais nous on est trois, enfin, deux et demi. Ben attendez, je vais vous rendre la vôtre. Ben c’est bien ce que j’ai dit! Provençal le Gaulois… le Galois… Ouais je vois ce que vous voulez dire…',
    member_projet: [
      {
        id: 3,
        pseudo: 'Sir Arthur',
        avatar: 'https://randomuser.me/api/portraits/men/84.jpg',
      },
      {
        id: 2,
        pseudo: 'SuperCodeur',
        avatar: 'https://randomuser.me/api/portraits/men/19.jpg',
      },
    ],
    technoProjet: [
      {
        id: 1,
        label: 'Laravel',
        color: '#E3382B',
      },
      {
        id: 2,
        label: 'Angular',
        color: '#D2002F',
      },
      {
        id: 3,
        label: 'Docker',
        color: '#0069AD',
      },
    ],
    created_at: '2013-11-01',
    status: 'Equipe au complet',
  },
  {
    id: 3,
    title: 'Le projet dans un projet',
    author: {
      id: 3,
      pseudo: 'Sir Arthur',
      avatar: 'https://randomuser.me/api/portraits/men/84.jpg',
    },
    content: 'Non Provençal c’est mon nom. Moi, prochaine bataille rangée je reste à Kaamelott. Passer la tête? Pour me prendre une flêche dedans? Non merci!',
    member_projet: [
      {
        id: 1,
        pseudo: 'SuperCodeur',
        avatar: 'https://randomuser.me/api/portraits/men/19.jpg',
      },
    ],
    technoProjet: [
      {
        id: 5,
        label: 'HTML',
        color: '#D84924',
      },
      {
        id: 4,
        label: 'CSS',
        color: '#F2F2F2',
      },
      {
        id: 3,
        label: 'Docker',
        color: '#0069AD',
      },
    ],
    created_at: '2013-11-01',
    status: 'Levez les voiles',
  },
  {
    id: 4,
    title: 'Projet génial',
    author: {
      id: 1,
      pseudo: 'CodeMaster',
      avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    },
    content: 'Ce projet est vraiment incroyable ! Nous avons fait un excellent travail.',
    member_projet: [
      {
        id: 2,
        pseudo: 'TechGuru',
        avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
      },
      {
        id: 3,
        pseudo: 'DesignQueen',
        avatar: 'https://randomuser.me/api/portraits/women/3.jpg',
      },
    ],
    technoProjet: [
      {
        id: 1,
        label: 'React',
        color: '#61DAFB',
      },
      {
        id: 2,
        label: 'Node.js',
        color: '#43853D',
      },
      {
        id: 3,
        label: 'MongoDB',
        color: '#4DB33D',
      },
    ],
    created_at: '2023-01-15',
    status: 'En cours',
  },
  {
    id: 5,
    title: 'Projet fantastique',
    author: {
      id: 2,
      pseudo: 'GeekMaster',
      avatar: 'https://randomuser.me/api/portraits/men/4.jpg',
    },
    content: 'Ce projet est tout simplement fantastique ! Nous sommes très fiers du résultat.',
    member_projet: [
      {
        id: 1,
        pseudo: 'CodeNinja',
        avatar: 'https://randomuser.me/api/portraits/men/5.jpg',
      },
      {
        id: 3,
        pseudo: 'DesignGuru',
        avatar: 'https://randomuser.me/api/portraits/women/6.jpg',
      },
    ],
    technoProjet: [
      {
        id: 2,
        label: 'Vue.js',
        color: '#41B883',
      },
      {
        id: 3,
        label: 'Firebase',
        color: '#FFCA28',
      },
    ],
    created_at: '2023-02-28',
    status: 'En cours',
  },
  {
    id: 6,
    title: 'Projet de développement web',
    author: {
      id: 1,
      pseudo: 'WebMaster',
      avatar: 'https://randomuser.me/api/portraits/men/4.jpg',
    },
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce eget nisl vitae sapien vestibulum tempus vel et est. Suspendisse potenti. Integer non tristique tellus. Sed non fermentum lectus. Morbi pharetra, turpis at cursus interdum, lorem libero auctor velit, non vestibulum nunc magna vel magna. Nam nec velit euismod, dapibus felis a, malesuada sapien.',
    member_projet: [
      {
        id: 2,
        pseudo: 'CodeurJava',
        avatar: 'https://randomuser.me/api/portraits/men/5.jpg',
      },
      {
        id: 3,
        pseudo: 'DesignerGraphique',
        avatar: 'https://randomuser.me/api/portraits/women/6.jpg',
      },
    ],
    technoProjet: [
      {
        id: 1,
        label: 'React',
        color: '#61DBFB',
      },
      {
        id: 2,
        label: 'Node.js',
        color: '#68A063',
      },
    ],
    created_at: '2021-05-08',
    status: 'En cours de développement',
  },
  {
    id: 7,
    title: 'Application mobile de fitness',
    author: {
      id: 2,
      pseudo: 'FitnessAddict',
      avatar: 'https://randomuser.me/api/portraits/men/7.jpg',
    },
    content: 'Sed in turpis id sem congue mollis. Sed varius neque eu sapien sagittis molestie. Duis convallis libero sed leo lacinia, ac aliquam lorem imperdiet. Suspendisse potenti. Proin at mauris sit amet dolor efficitur venenatis vel sit amet ex. Praesent pharetra vel nibh vel dictum. Nullam pretium ex a urna tincidunt, vel auctor velit dapibus.',
    member_projet: [
      {
        id: 3,
        pseudo: 'PersonalTrainer',
        avatar: 'https://randomuser.me/api/portraits/men/8.jpg',
      },
      {
        id: 4,
        pseudo: 'Nutritionniste',
        avatar: 'https://randomuser.me/api/portraits/women/9.jpg',
      },
      {
        id: 5,
        pseudo: 'CoachSportif',
        avatar: 'https://randomuser.me/api/portraits/men/10.jpg',
      },
    ],
    technoProjet: [
      {
        id: 3,
        label: 'React Native',
        color: '#61DBFB',
      },
      {
        id: 4,
        label: 'Firebase',
        color: '#FFCA28',
      },
    ],
    created_at: '2021-04-01',
    status: 'En attente de validation',
  },
];

export default data;
