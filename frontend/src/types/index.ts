export interface Memo {
  id: string;
  title: string;
  content: string;
  tags: string[];
  created_at: string;
  updated_at: string;
}

export interface MemoContextType {
  memos: Memo[];
  loading: boolean;
  error: string | null;
  addMemo: (memo: Omit<Memo, 'id' | 'created_at' | 'updated_at'>) => Promise<void>;
  updateMemo: (id: string, memo: Partial<Memo>) => Promise<void>;
  deleteMemo: (id: string) => Promise<void>;
  searchMemos: (query: string) => Promise<Memo[]>;
}
