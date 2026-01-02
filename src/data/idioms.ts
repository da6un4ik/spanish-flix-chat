export interface Idiom {
  id: string;
  expression: string;
  meaning: string; // На испанском
  example: string; // На испанском
  literal: string; // Дословный перевод (можно оставить для справки)
  imageUrl: string;
  videoUrl?: string; // Ссылка на фрагмент
  category: string;
}

export const idioms: Idiom[] = [
  {
    id: '1',
    expression: 'Estar en las nubes',
    meaning: 'Estar despistado или pensando en cosas lejanas a la realidad.',
    example: 'Juan no escuchó la instrucción porque estaba en las nubes.',
    literal: 'To be in the clouds',
    imageUrl: 'https://images.unsplash.com/photo-1534067783941-51c9c23ecefd',
    videoUrl: '/videos/estar_en_las_nubes.mp4', // <--- УКАЖИТЕ ПУТЬ
    category: 'Estado mental'
  },
  // Добавьте остальные идиомы в таком же формате
];
