// Coordonnées et réglages centralisés : modifier ici met à jour tout le site.
export const site = {
  name: 'Véronique Grignet',
  title: 'Nutrithérapeute',
  city: 'Mons',
  region: 'Hainaut, Belgique',
  phone: '0456 58 79 70',
  phoneHref: 'tel:+32456587970',
  smsHref: 'sms:+32456587970',
  email: 'contact@grignet-nutritherapie.be',
  instagram: 'https://www.instagram.com/grignet_nutritherapie/',
  facebook: 'https://www.facebook.com/grignetnutritherapie',
  description:
    'Véronique Grignet, nutrithérapeute et éducatrice de santé à Mons. Un accompagnement vers un changement alimentaire durable, à votre rythme. Consultations et conférences.',
  // Clé Web3Forms (https://web3forms.com) liée à l'adresse e-mail ci-dessus.
  // Tant qu'elle vaut la valeur par défaut, le formulaire affiche un avertissement.
  web3formsKey: 'A_REMPLACER_PAR_LA_CLE_WEB3FORMS',
};

// Rubriques activables. Passer `boutique` à true quand le livre de recettes sera en vente.
export const features = {
  boutique: false,
};

export const nav = [
  { href: '/a-propos/', label: 'À propos' },
  { href: '/accompagnement/', label: 'Accompagnement' },
  { href: '/conferences/', label: 'Conférences' },
  ...(features.boutique ? [{ href: '/livres/', label: 'Livres' }] : []),
  { href: '/contact/', label: 'Contact' },
];
