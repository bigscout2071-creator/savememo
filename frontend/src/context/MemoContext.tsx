import React, { createContext, useContext, useState, useEffect } from 'react';
import { Memo, MemoContextType } from '../types/index';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

const MemoContext = createContext<MemoContextType | undefined>(undefined);

export const MemoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [memos, setMemos] = useState<Memo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch memos
  const fetchMemos = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/memos`);
      if (!response.ok) throw new Error('Failed to fetch memos');
      const data = await response.json();
      setMemos(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  // Add memo
  const addMemo = async (memo: Omit<Memo, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const response = await fetch(`${API_URL}/memos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(memo),
      });
      if (!response.ok) throw new Error('Failed to add memo');
      const newMemo = await response.json();
      setMemos([newMemo, ...memos]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    }
  };

  // Update memo
  const updateMemo = async (id: string, updates: Partial<Memo>) => {
    try {
      const response = await fetch(`${API_URL}/memos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });
      if (!response.ok) throw new Error('Failed to update memo');
      const updated = await response.json();
      setMemos(memos.map(m => m.id === id ? updated : m));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    }
  };

  // Delete memo
  const deleteMemo = async (id: string) => {
    try {
      const response = await fetch(`${API_URL}/memos/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete memo');
      setMemos(memos.filter(m => m.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    }
  };

  // Search memos
  const searchMemos = async (query: string) => {
    try {
      const response = await fetch(`${API_URL}/memos/search/query?q=${encodeURIComponent(query)}`);
      if (!response.ok) throw new Error('Failed to search memos');
      return await response.json();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      return [];
    }
  };

  useEffect(() => {
    fetchMemos();
  }, []);

  return (
    <MemoContext.Provider value={{ memos, loading, error, addMemo, updateMemo, deleteMemo, searchMemos }}>
      {children}
    </MemoContext.Provider>
  );
};

export const useMemos = () => {
  const context = useContext(MemoContext);
  if (!context) {
    throw new Error('useMemos must be used within MemoProvider');
  }
  return context;
};
