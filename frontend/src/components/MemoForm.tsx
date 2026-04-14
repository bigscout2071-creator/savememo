import React, { useState } from 'react';
import { Memo } from '../types/index';

interface MemoFormProps {
  initialMemo?: Memo;
  onSave: (memo: Omit<Memo, 'id' | 'created_at' | 'updated_at'>) => void;
  onCancel: () => void;
}

export const MemoForm: React.FC<MemoFormProps> = ({ initialMemo, onSave, onCancel }) => {
  const [title, setTitle] = useState(initialMemo?.title || '');
  const [content, setContent] = useState(initialMemo?.content || '');
  const [tags, setTags] = useState(initialMemo?.tags?.join(', ') || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      title,
      content,
      tags: tags.split(',').map(t => t.trim()).filter(t => t),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 mb-4 border rounded dark:bg-gray-700 dark:text-white"
        required
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full p-2 mb-4 border rounded h-32 dark:bg-gray-700 dark:text-white"
        required
      />
      <input
        type="text"
        placeholder="Tags (comma separated)"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        className="w-full p-2 mb-4 border rounded dark:bg-gray-700 dark:text-white"
      />
      <div className="flex gap-2">
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Save
        </button>
        <button type="button" onClick={onCancel} className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400">
          Cancel
        </button>
      </div>
    </form>
  );
};
