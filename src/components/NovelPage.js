import React from 'react';
import { useParams } from 'react-router-dom';
import CommentsSection from './CommentsSection';

const NovelPage = ({ novel, onBack, comments, onSaveComment }) => {
  const { id } = useParams();
  
  // Добавляем дебаг информацию
  console.log('NovelPage rendered with:', { novel, id, comments });

  if (!novel) {
    return (
      <div className="p-4 max-w-lg mx-auto">
        <button onClick={onBack} className="text-blue-600 mb-4">
          ← Назад
        </button>
        <div className="text-center py-8">
          Загрузка...
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 max-w-lg mx-auto bg-white shadow rounded-lg">
      <button onClick={onBack} className="text-blue-600 mb-4 hover:text-blue-700">
        ← Назад
      </button>
      <div className="flex space-x-4 mb-4">
        <img src={novel.cover} alt={novel.title} className="w-32 rounded-lg shadow" />
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
            className="block w-full text-left p-2 rounded hover:bg-gray-100 transition-colors"
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
