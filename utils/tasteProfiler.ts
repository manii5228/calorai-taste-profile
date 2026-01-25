type Food = {
  id: number;
  name: string;
  category: string;
  tags: string[];
};

type Cuisine = {
  id: number;
  name: string;
  description: string;
};

export function buildTasteProfile(
  foods: Food[],
  likedIds: number[],
  superLikeIds: number[],
  notSureIds: number[],
  cuisines: Cuisine[]
) {
  const cuisineScores: Record<string, number> = {};
  const tagScores: Record<string, number> = {};
  const categoryScores: Record<string, number> = {};

  const scoreFood = (food: Food, weight: number) => {
    categoryScores[food.category] =
      (categoryScores[food.category] || 0) + weight;

    food.tags.forEach(tag => {
      tagScores[tag] = (tagScores[tag] || 0) + weight;
    });

    cuisines.forEach(cuisine => {
      const text = `${food.name} ${food.tags.join(' ')}`.toLowerCase();
      if (
        text.includes(cuisine.name.toLowerCase()) ||
        cuisine.description.toLowerCase().split(',').some(k =>
          text.includes(k.trim())
        )
      ) {
        cuisineScores[cuisine.name] =
          (cuisineScores[cuisine.name] || 0) + weight;
      }
    });
  };

  foods.forEach(food => {
    if (superLikeIds.includes(food.id)) scoreFood(food, 3);
    else if (likedIds.includes(food.id)) scoreFood(food, 2);
    else if (notSureIds.includes(food.id)) scoreFood(food, 1);
  });

  return {
    cuisineScores,
    tagScores,
    categoryScores,
  };
}
