// Создаем общий компонент для управления комментариями
import React, { useState, useEffect, useContext, useCallback } from 'react';

// Компонент для управления комментариями (главы и новеллы)
const CommentsSection = ({ type, id, comments, onSaveComment }) => {
  const [newComment, setNewComment] = useState('');

  const handleSave = useCallback(() => {
    if (newComment.trim()) {
      onSaveComment(type, id, newComment);
      setNewComment('');
    }
  }, [newComment, type, id, onSaveComment]);

  return (
    <div className="space-y-4">
      <textarea
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        placeholder={`Оставьте комментарий к ${type === 'chapter' ? 'главе' : 'новелле'}...`}
        className="w-full p-2 border rounded"
        rows="3"
      />
      <button
        onClick={handleSave}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Отправить
      </button>
      <div className="space-y-2">
        {comments.map((comment) => (
          <div key={comment.id} className="p-3 bg-gray-50 rounded">
            <p className="text-sm">{comment.text}</p>
            <p className="text-xs text-gray-500 mt-1">
              {new Date(comment.timestamp).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentsSection;
