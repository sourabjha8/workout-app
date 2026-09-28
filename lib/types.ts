// Shared data shapes go here as the schema takes form.

export interface Exercise {
  id: string;
  name: string;
}

export interface Routine {
  id: string;
  name: string;
  exercises: Exercise[];
}
