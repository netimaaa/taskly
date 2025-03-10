export interface TaskType {
  id: number;
  title: string;
  description: string;
  progress: number;
  priority: number;
  project: number;
  tags: number[];
  createdAt: string;
  comments?: Comment[];
}
export interface Comment {
  id: number;
  author: number;
  content: string;
  reply: number;
}

export interface User {
  id: number;
  mail: string;
  name: string;
  avatar: string;
  tasks: TaskType[];
}
export interface FilterItem {
  icon: React.ElementType;
  title: string;
  color?: string;
  id: number;
}
