export type ThemeMode = 'light' | 'dark'

export type Difficulty = 'easy' | 'medium' | 'hard'

export type RecipeCategory = 'breakfast' | 'lunch' | 'dinner' | 'dessert' | 'drink'

export interface Ingredient {
  id: string
  name: string
  quantity: number
  unit: string
}

export interface RecipeStep {
  id: string
  order: number
  instruction: string
}

export interface MenuRecipe {
  id: string
  name: string
  category: RecipeCategory
  cuisine?: string
  difficulty: Difficulty
  prepTime: number
  cookTime: number
  servings: number
  ingredients: Ingredient[]
  steps: RecipeStep[]
  tags: string[]
  image?: string
  notes?: string
  isFavorite: boolean
  createdAt: string
  updatedAt: string
}

export type PlannerDay =
  | 'monday'
  | 'tuesday'
  | 'wednesday'
  | 'thursday'
  | 'friday'
  | 'saturday'
  | 'sunday'

export type MealSlot = 'breakfast' | 'lunch' | 'dinner'

export type PlannerDayMeals = Record<MealSlot, string | null>

export type WeeklyPlanner = Record<PlannerDay, PlannerDayMeals>

export type ToastTone = 'info' | 'success' | 'warning' | 'danger'

export interface ToastItem {
  id: number
  message: string
  tone: ToastTone
}

export interface ModalState<T = unknown> {
  isOpen: boolean
  kind: string | null
  payload?: T
}
