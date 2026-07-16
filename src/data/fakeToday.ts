export const FAKE_TODAY = {
  date: new Date('2026-07-12T14:20:00'),
  weather: {
    temp: 11,
    condition: 'rain' as const,
    sunset: '20:53',
  },
  availabilityOptions: [
    { id: '30min', label: '30 min' },
    { id: 'few_hours', label: 'a few hours' },
    { id: 'full_day', label: 'all day' },
    { id: 'weekend', label: 'the whole weekend' },
  ],
  moodOptions: [
    { id: 'cosy', label: 'cosy' },
    { id: 'adventurous', label: 'adventurous' },
    { id: 'creative', label: 'creative' },
    { id: 'social', label: 'social' },
    { id: 'lazy', label: 'lazy' },
    { id: 'nostalgic', label: 'nostalgic' },
  ],
  selectedAvailability: 'few_hours',
  selectedMood: 'cosy',
  lifePack: {
    title: 'Rainy Sunday',
    moodLine:
      "You haven't touched your film camera in two months. It's raining. Perfect excuse.",
    items: [
      {
        id: 'wish-perfect-days',
        title: 'Perfect Days',
        category: 'watch_read',
        whyThis: "You added this three days ago and haven't watched it.",
        imaginedAgo: '3 days ago',
      },
      {
        id: 'wish-film-photos',
        title: 'Shoot a roll around the house',
        category: 'make_learn',
        whyThis:
          'Your film-photography tag has been dormant for 67 days. Rain on the windows counts.',
        imaginedAgo: '4 months ago',
        hasPolaroid: true,
      },
      {
        id: 'wish-earl-grey',
        title: 'Proper afternoon tea at home',
        category: 'micro_joys',
        whyThis: 'Cosy mood, a few hours free — this one has been waiting since spring.',
        imaginedAgo: '3 months ago',
      },
    ],
    connectiveTissue: [
      'Make an Earl Grey first',
      'Take five photos around your room afterwards',
    ],
    rerollsRemaining: 2,
  },
  nostalgia: {
    id: 'wish-picnic-heath',
    title: 'Picnic on Hampstead Heath',
    imaginedAgo: '2 years ago',
    addedDate: 'Feb 2024',
  },
}
