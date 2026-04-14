import React, { useState, useEffect } from 'react';
import { MemoForm } from './components/MemoForm';
import { MemoItem } from './components/MemoItem';
import { SearchBar } from './components/SearchBar';
import { ThemeToggle } from './components/ThemeToggle';
import { useMemos } from './context/MemoContext';
import { Memo } from './types/index';

export const App: React.FC = () => {
  const { memos, loading, error, addMemo, updateMemo, deleteMemo, searchMemos } = useMemos();
  const [isDark, setIsDark] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingMemo, setEditingMemo] = useState<Memo | null>(null);
  const [searchResults, setSearchResults] = useState<Memo[] | null>(null);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const handleSearch = async (query: string) => {
    if (query.trim()) {
      const results = await searchMemos(query);
      setSearchResults(results);
    } else {
      setSearchResults(null);
    }
  };

  const handleSave = async (memo: Omit<Memo, 'id' | 'created_at' | 'updated_at'>) => {
    if (editingMemo) {
      await updateMemo(editingMemo.id, memo);
      setEditingMemo(null);
    } else {
      await addMemo(memo);
    }
    setIsFormOpen(false);
  };

  const displayMemos = searchResults || memos;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-50">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow">
        <div className="max-w-6xl mx-auto px-4 py-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold">📝 SaveMemo</h1>
          <ThemeToggle isDark={isDark} onToggle={() => setIsDark(!isDark)} />
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Search and Create */}
        <div className="flex gap-4 mb-8">
          <div className="flex-1">
            <SearchBar onSearch={handleSearch} />
          </div>
          <button
            onClick={() => {
              setEditingMemo(null);
              setIsFormOpen(!isFormOpen);
            }}
            className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 font-semibold"
          >
            + New Memo
          </button>
        </div>

        {/* Form */}
        {isFormOpen && (
          <div className="mb-8">
            <MemoForm
              initialMemo={editingMemo || undefined}
              onSave={handleSave}
              onCancel={() => {
                setIsFormOpen(false);
                setEditingMemo(null);
              }}
            />
          </div>
        )}

        {/* Status Messages */}
        {error && <div className="mb-4 p-4 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-100 rounded">{error}</div>}
        {loading && <div className="mb-4 p-4 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 rounded">Loading...</div>}

        {/* Memos Grid */}
        {displayMemos.length === 0 ? (
          <div className="text-center py-12 text-gray-500 dark:text-gray-400">
            <p className="text-lg">{searchResults ? 'No memos found' : 'No memos yet. Create one to get started!'}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {displayMemos.map(memo => (
              <MemoItem
                key={memo.id}
                memo={memo}
                onEdit={(m) => {
                  setEditingMemo(m);
                  setIsFormOpen(true);
                }}
                onDelete={deleteMemo}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};
