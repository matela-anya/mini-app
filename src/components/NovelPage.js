import React, { useState } from 'react';
// Временно закомментируем импорт комментариев для отладки
// import CommentsSection from './CommentsSection';

const NovelPage = ({ novel, onBack, comments, onSaveComment }) => {
  const [selectedChapter, setSelectedChapter] = useState(null);
  
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

  const handleChapterClick = (chapterNumber) => {
    console.log(`Выбрана глава ${chapterNumber}`);
    setSelectedChapter(chapterNumber);
  };

  return (
    <div className="p-4 max-w-lg mx-auto bg-white shadow rounded-lg">
      <button onClick={onBack} className="text-blue-600 mb-4 hover:text-blue-700">
        ← Назад
      </button>
      <div className="flex space-x-4 mb-4">
        <img 
          src={novel.cover} 
          alt={novel.title} 
          className="w-32 rounded-lg shadow"
        />
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
        <h3 className="font-semibold text-lg mb-3">Список глав</h3>
        {Array.from({ length: novel.chapters }, (_, i) => (
          <button
            key={i}
            onClick={() => handleChapterClick(i + 1)}
            className={`block w-full text-left p-3 rounded transition-colors
              ${selectedChapter === i + 1 
                ? 'bg-blue-50 text-blue-700 font-medium' 
                : 'hover:bg-gray-50'
              }`}
          >
            Глава {i + 1}
          </button>
        ))}
      </div>

      {selectedChapter && (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <h4 className="font-medium mb-2">Глава {selectedChapter}</h4>
          <p className="text-gray-600">
            Содержимое главы {selectedChapter} будет добавлено позже.
          </p>
        </div>
      )}

      {/* Временно закомментируем секцию комментариев
      <div className="mt-8">
        <h3 className="font-semibold text-lg mb-4">Комментарии к новелле</h3>
        <CommentsSection
          type="novel"
          id={novel.id}
          comments={comments}
          onSaveComment={onSaveComment}
        />
      </div>
      */}
    </div>
  );
};

export { NovelPage };
