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
    techno_projet: [
      {
        id: 7,
        label: 'JavaScript',
        color: '##EAD41C',
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
    techno_projet: [
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
    techno_projet: [
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
];

export default data;
