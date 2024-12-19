import React from 'react';
import CommentsSection from './CommentsSection';  // Добавляем этот импорт

// Обновление страницы новеллы
const NovelPage = ({ novel, onBack, onSelectChapter, comments, onSaveComment }) => {
  return (
    <div className="p-4 max-w-lg mx-auto">
      <button onClick={onBack} className="text-blue-600 mb-4">
        ← Назад
      </button>
      <div className="flex space-x-4 mb-4">
        <img src={novel.cover} alt={novel.title} className="w-32 rounded-lg" />
        <div className="flex-1">
          <h2 className="text-xl font-bold">{novel.title}</h2>
          <p className="text-gray-600">{novel.author}</p>
          <div className="flex items-center mt-2">
            <span className="text-yellow-400 font-bold">★ {novel.rating.toFixed(1)}</span>
            <span className="ml-1 text-sm">({novel.ratingCount} оценок)</span>
          </div>
        </div>
      </div>
      <p className="mb-4 text-gray-700">{novel.description}</p>
      <div className="space-y-2 mb-6">
        {Array.from({ length: novel.chapters }, (_, i) => (
          <button
            key={i}
            onClick={() => onSelectChapter(i + 1)}
            className="block w-full text-left p-2 rounded hover:bg-gray-100"
          >
            Глава {i + 1}
          </button>
        ))}
      </div>
      <CommentsSection
        type="novel"
        id={novel.id}
        comments={comments}
        onSaveComment={onSaveComment}
      />
    </div>
  );
};

export { NovelPage };