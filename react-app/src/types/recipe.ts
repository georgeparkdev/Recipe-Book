export interface Recipe {
  title: string;
  yield: string;
  ingredients: Ingredient[];
  equipment: string[];
  total_time_seconds: number | null;
  steps: Step[];
  dietary_tags: string[];
  custom_tags: string[];
  source: string | null;
}

export interface Ingredient {
  quantity: number | string | null;
  unit: string | null;
  item: string;
  descriptor: string | null;
  optional: boolean;
}

export interface Step {
  number: number;
  action: string;
  duration_seconds: number | null;
  temperature_celsius: number | null;
  notes: string | null;
}

export interface RecipeWithId extends Recipe {
  id: string;
}
