export function getDietType(tagScores: Record<string, number>) {
  if ((tagScores['vegan'] || 0) > 5) return 'Vegan';
  if ((tagScores['vegetable'] || 0) > 6) return 'Vegetarian';
  if ((tagScores['protein'] || 0) > 6) return 'Protein Heavy';
  return 'Omnivore';
}

export function getLifestyleHighlights(tagScores: Record<string, number>) {
  const highlights: string[] = [];

  if ((tagScores['fruit'] || 0) > 4) highlights.push('Fruit Lover');
  if ((tagScores['indulgent'] || 0) > 5) highlights.push('Fast Food Lover');
  if ((tagScores['healthy'] || 0) > 5) highlights.push('Health Conscious');
  if ((tagScores['protein'] || 0) > 6) highlights.push('High Protein Diet');
  if ((tagScores['fat'] || 0) > 4) highlights.push('Fat Friendly');

  return highlights.length ? highlights : ['Balanced Eater'];
}

export function getTopCuisines(cuisineScores: Record<string, number>) {
  return Object.entries(cuisineScores)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([name]) => name);
}
