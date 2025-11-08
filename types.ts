export interface Task {
  id: number;
  text: string;
  completed: boolean;
  importance: 'normal' | 'important' | 'urgent';
  time: string | null;
  created_at: string;
}
