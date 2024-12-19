import React from 'react';
import CommentsSection from './CommentsSection';

const NovelPage = ({ novel, onBack, onSelectChapter, currentChapter, comments, onSaveComment }) => {
  console.log('NovelPage rendering with novel:', novel);
  
  if (!novel) {
    console.log('Novel is null or undefined');
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4 max-w-lg mx-auto bg-white shadow-sm rounded-lg">
      <button 
        onClick={onBack} 
        className="text-blue-600 mb-4 hover:text-blue-800 transition-colors"
      >
        ← Назад
      </button>
      
      <div className="flex space-x-4 mb-4">
        <img 
          src={novel.cover} 
          alt={novel.title} 
          className="w-32 h-48 rounded-lg object-cover"
        />
        <div className="flex-1">
          <h2 className="text-xl font-bold">{novel.title}</h2>
          <p className="text-gray-600">{novel.author}</p>
          <div className="flex items-center mt-2">
            <span className="text-yellow-400 font-bold">★ {novel.rating.toFixed(1)}</span>
            <span className="ml-1 text-sm text-gray-600">({novel.ratingCount} оценок)</span>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {novel.tags.map((tag) => (
              <span 
                key={tag} 
                className="px-2 py-1 bg-gray-100 text-sm text-gray-600 rounded"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      <p className="mb-6 text-gray-700 leading-relaxed">{novel.description}</p>

      <div className="space-y-2 mb-6">
        <h3 className="font-semibold text-lg mb-3">Список глав</h3>
        {Array.from({ length: novel.chapters }, (_, i) => (
          <button
            key={i}
            onClick={() => onSelectChapter(i + 1)}
            className={`block w-full text-left p-3 rounded transition-colors
              ${currentChapter === i + 1 
                ? 'bg-blue-50 text-blue-700' 
                : 'hover:bg-gray-50'
              }`}
          >
            Глава {i + 1}
          </button>
        ))}
      </div>

      <div className="mt-8">
        <h3 className="font-semibold text-lg mb-4">Комментарии</h3>
        <CommentsSection
          type="novel"
          id={novel.id}
          comments={comments}
          onSaveComment={onSaveComment}
        />
      </div>
    </div>
  );
};

export { NovelPage };
