export interface TaskType {
  id: number;
  title: string;
  description: string;
  progress: number;
  priority: number;
  project: number;
  tags: number[];
  createdAt: string;
}
