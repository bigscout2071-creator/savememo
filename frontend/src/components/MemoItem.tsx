import React from 'react';
import { Memo } from '../types/index';

interface MemoItemProps {
  memo: Memo;
  onEdit: (memo: Memo) => void;
  onDelete: (id: string) => void;
}

export const MemoItem: React.FC<MemoItemProps> = ({ memo, onEdit, onDelete }) => {
  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition">
      <h2 className="text-xl font-bold mb-2 dark:text-white">{memo.title}</h2>
      <p className="text-gray-600 dark:text-gray-400 mb-3 line-clamp-3">{memo.content}</p>
      {memo.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-3">
          {memo.tags.map(tag => (
            <span key={tag} className="px-2 py-1 text-sm bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 rounded">
              {tag}
            </span>
          ))}
        </div>
      )}
      <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
        <span>{new Date(memo.created_at).toLocaleDateString()}</span>
        <div className="flex gap-2">
          <button onClick={() => onEdit(memo)} className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">
            Edit
          </button>
          <button onClick={() => onDelete(memo.id)} className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};
