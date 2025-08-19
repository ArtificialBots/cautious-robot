export interface FileItem {
  id: string;
  name: string;
  content: string;
  type: 'html' | 'css' | 'javascript' | 'json' | 'markdown';
}

export type FileType = FileItem['type'];