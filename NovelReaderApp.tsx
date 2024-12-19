import React, { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight, Menu, Sun, Moon } from 'lucide-react';

const NovelApp = () => {
  const [currentView, setCurrentView] = useState('profile');
  const [fontSize, setFontSize] = useState(16);
  const [theme, setTheme] = useState('light');
  const [currentChapter, setCurrentChapter] = useState(1);
  const [userRating, setUserRating] = useState(0);
  const [isRatingHovered, setIsRatingHovered] = useState(0);
  const [chapterComments, setChapterComments] = useState({});
  const [newComment, setNewComment] = useState('');
  const [novelComments, setNovelComments] = useState([]);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [novelRatings, setNovelRatings] = useState({
    totalRating: 4.8,
    count: 120,
    userRating: 0
  });

  // Функция для сохранения комментария к главе
  const saveChapterComment = (chapterId, comment) => {
    if (comment.trim()) {
      const newComment = {
        id: Date.now(),
        text: comment,
        timestamp: new Date().toISOString(),
        username: 'Читатель' // В реальном приложении брать из Telegram
      };

      setChapterComments(prev => ({
        ...prev,
        [chapterId]: [...(prev[chapterId] || []), newComment]
      }));
      setNewComment('');
    }
  };

  const novels = [
    { 
      id: 1, 
      title: "Возрождение восьмого класса", 
      author: "Ли Су Хён", 
      chapters: 120, 
      cover: "/api/placeholder/100/150", 
      description: "Увлекательная история о путешествии во времени и второй попытке прожить школьные годы.",
      tags: ["Фэнтези", "Школа", "Романтика"],
      rating: 4.8,
      ratingCount: 120
    },
    { 
      id: 2, 
      title: "Поднятие уровня в одиночку", 
      author: "Чу Гон", 
      chapters: 270, 
      cover: "/api/placeholder/100/150", 
      description: "История о выживании в мире, где каждый день - это битва за существование.",
      tags: ["Приключения", "Боевик", "ЛитРПГ"],
      rating: 4.6,
      ratingCount: 95
    }
  ];

  const StarRating = ({ rating, onRate, currentRating, showHover = true }) => {
    const [hoverRating, setHoverRating] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);

    const handleRate = (value) => {
      setIsAnimating(true);
      onRate(value);
      setTimeout(() => setIsAnimating(false), 300);
    };

    return (
      <div className="flex flex-col items-center">
        <div className="flex space-x-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => handleRate(star)}
              onMouseEnter={() => showHover && setHoverRating(star)}
              onMouseLeave={() => showHover && setHoverRating(0)}
              className="focus:outline-none transform transition-transform duration-200 hover:scale-110"
            >
              <Star 
                className={`w-8 h-8 transition-all duration-200 ${
                  (hoverRating ? hoverRating >= star : rating >= star)
                    ? 'text-yellow-400 fill-current'
                    : 'text-gray-300'
                } ${isAnimating && rating >= star ? 'animate-pulse' : ''}`}
              />
            </button>
          ))}
        </div>
        {currentRating > 0 && (
          <div className="mt-2 text-sm text-gray-600">
            Ваша оценка: {currentRating} из 5
          </div>
        )}
      </div>
    );
  };

  const getThemeClasses = () => {
    switch (theme) {
      case 'dark':
        return 'bg-gray-900 text-white';
      case 'beige':
        return 'bg-amber-50 text-gray-900';
      default:
        return 'bg-white text-gray-900';
    }
  };

  const renderProfile = () => (
    <div className="p-4 max-w-lg mx-auto">
      <div className="flex items-start space-x-4 mb-6">
        <img src="/api/placeholder/96/96" alt="Avatar" className="w-16 h-16 rounded-full" />
        <div>
          <h2 className="text-xl font-bold">KoreanFan</h2>
          <p className="text-gray-600 mb-2">Переводчик корейских новелл</p>
          <p className="text-sm text-gray-700">
            Привет! Я увлеченный переводчик корейских новелл с 5-летним опытом. 
            Моя цель - познакомить русскоязычных читателей с лучшими произведениями 
            корейской веб-литературы. Я тщательно отбираю новеллы для перевода, 
            стараясь сохранить уникальный стиль каждого автора. Наслаждайтесь 
            чтением и не стесняйтесь оставлять комментарии!
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {novels.map(novel => (
          <div key={novel.id} className="border rounded-lg p-4 shadow-sm">
            <div className="flex space-x-4">
              <img src={novel.cover} alt={novel.title} className="w-24 h-36 object-cover rounded" />
              <div className="flex-1">
                <h3 className="font-bold">{novel.title}</h3>
                <p className="text-sm text-gray-600 mb-2">{novel.author}</p>
                <div className="flex items-center mb-2">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="ml-1 text-sm">{novel.rating}</span>
                </div>
                <div className="flex flex-wrap gap-1 mb-2">
                  {novel.tags.slice(0, 3).map(tag => (
                    <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
                <button 
                  onClick={() => setCurrentView('novel')}
                  className="text-blue-600 text-sm transition-all duration-200 hover:text-blue-800 hover:underline transform hover:translate-x-1"
                >
                  Читать ({novel.chapters} глав)
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderNovel = () => (
    <div className="p-4 max-w-lg mx-auto">
      <button 
        onClick={() => setCurrentView('profile')}
        className="flex items-center text-blue-600 mb-4"
      >
        <ChevronLeft className="w-4 h-4" />
        <span>Назад</span>
      </button>

      {isImageModalOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4"
          onClick={() => setIsImageModalOpen(false)}
        >
          <img 
            src="/api/placeholder/360/540" 
            alt="Cover Full" 
            className="max-h-[90vh] rounded-lg shadow-xl transform transition-transform duration-300 hover:scale-105"
          />
        </div>
      )}

      <div className="flex space-x-4 mb-4">
        <img 
          src="/api/placeholder/120/180" 
          alt="Cover" 
          className="w-32 rounded-lg shadow-md cursor-pointer transition-transform duration-200 hover:scale-105 hover:shadow-lg" 
          onClick={() => setIsImageModalOpen(true)}
        />
        <div className="flex-1">
          <h2 className="text-xl font-bold mb-1">{novels[0].title}</h2>
          <p className="text-gray-600 mb-2">{novels[0].author}</p>
          <div className="flex flex-wrap gap-1.5 mb-3">
            {novels[0].tags.map(tag => (
              <span key={tag} className="inline-flex text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full transition-all duration-200 hover:bg-blue-100 hover:text-blue-700 cursor-default">
                {tag}
              </span>
            ))}
          </div>
          <div className="flex items-center space-x-3">
            <div className="flex items-baseline">
              <span className="text-2xl font-bold text-blue-600">{novelRatings.totalRating.toFixed(1)}</span>
              <span className="text-sm text-gray-500 ml-1">/ 5</span>
            </div>
            <span className="text-sm text-gray-500">•</span>
            <span className="text-sm text-gray-500">{novelRatings.count} оценок</span>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <div className="flex flex-col items-center">
          <p className="text-sm text-gray-600 mb-2">Оцените новеллу</p>
          <StarRating 
            rating={novelRatings.userRating} 
            currentRating={novelRatings.userRating}
            onRate={(newRating) => {
              setNovelRatings(prev => ({
                ...prev,
                userRating: newRating,
                totalRating: ((prev.totalRating * prev.count) + newRating) / (prev.count + 1),
                count: prev.count + 1
              }));
            }} 
          />
        </div>
      </div>

      <p className="text-gray-700 mb-4">{novels[0].description}</p>

      <div className="space-y-2 mb-6">
        {[...Array(5)].map((_, i) => (
          <button
            key={i}
            onClick={() => {
              setCurrentChapter(i + 1);
              setCurrentView('reader');
            }}
            className="block w-full text-left p-2 rounded transition-all duration-200 hover:bg-blue-50 hover:text-blue-700 hover:pl-4"
          >
            Глава {i + 1}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Оставьте комментарий к новелле..."
          className="w-full p-2 border rounded"
          rows="3"
        />
        <button
          onClick={() => {
            if (newComment.trim()) {
              setNovelComments(prev => [...prev, {
                id: Date.now(),
                text: newComment,
                timestamp: new Date().toISOString()
              }]);
              setNewComment('');
            }
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Отправить
        </button>

        <div className="space-y-2">
          {novelComments.map(comment => (
            <div key={comment.id} className="p-3 bg-gray-50 rounded">
              <p className="text-sm">{comment.text}</p>
              <p className="text-xs text-gray-500 mt-1">
                {new Date(comment.timestamp).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderReader = () => (
    <div className={`min-h-screen p-4 ${getThemeClasses()}`}>
      <div className="max-w-lg mx-auto">
        <div className="flex justify-between items-center mb-4">
          <button 
            onClick={() => setCurrentView('novel')}
            className="flex items-center"
          >
            <Menu className="w-4 h-4 mr-1" />
            <span>Оглавление</span>
          </button>
          
          <div className="flex space-x-2">
            <button 
              onClick={() => setFontSize(prev => Math.max(12, prev - 2))}
              className="w-8 h-8 flex items-center justify-center rounded border border-gray-200 transition-all duration-200 hover:bg-gray-100 active:scale-95 hover:border-gray-300"
            >
              A-
            </button>
            <button 
              onClick={() => setFontSize(prev => Math.min(24, prev + 2))}
              className="w-8 h-8 flex items-center justify-center rounded border border-gray-200 transition-all duration-200 hover:bg-gray-100 active:scale-95 hover:border-gray-300"
            >
              A+
            </button>
            <button 
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
              className="w-8 h-8 flex items-center justify-center rounded border border-gray-200 transition-all duration-200 hover:bg-gray-100 active:scale-95 hover:border-gray-300"
            >
              {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">Глава {currentChapter}</h2>
          <p style={{ fontSize: `${fontSize}px` }} className="leading-relaxed">
            Текст главы здесь. Это пример текста новеллы, который будет отображаться 
            на странице чтения. Размер шрифта и тему можно изменять с помощью кнопок выше.
          </p>
        </div>

        <div className="flex justify-between mb-6">
          {currentChapter > 1 && (
            <button
              onClick={() => setCurrentChapter(prev => prev - 1)}
              className="flex items-center px-3 py-1.5 rounded-lg transition-all duration-200 hover:bg-gray-100 active:scale-95 hover:shadow-sm"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Предыдущая</span>
            </button>
          )}
          
          {currentChapter < 120 && (
            <button
              onClick={() => setCurrentChapter(prev => prev + 1)}
              className="flex items-center ml-auto px-3 py-1.5 rounded-lg transition-all duration-200 hover:bg-gray-100 active:scale-95 hover:shadow-sm"
            >
              <span>Следующая</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>

        <div className="space-y-4">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Оставьте комментарий к главе..."
            className={`w-full p-2 border rounded ${
              theme === 'dark' ? 'bg-gray-800 border-gray-700' : ''
            }`}
            rows="3"
          />
          <button
            onClick={() => saveChapterComment(currentChapter, newComment)}
            className="bg-blue-600 text-white px-4 py-2 rounded transition-all duration-200 hover:bg-blue-700 active:scale-95 hover:shadow-md"
          >
            Отправить
          </button>

          <div className="space-y-2">
            {(chapterComments[currentChapter] || []).map(comment => (
              <div 
                key={comment.id} 
                className={`p-3 rounded ${
                  theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'
                }`}
              >
                <div className="flex justify-between items-start">
                  <p className="font-medium text-sm">{comment.username}</p>
                  <span className="text-xs text-gray-500">
                    {new Date(comment.timestamp).toLocaleString()}
                  </span>
                </div>
                <p className="text-sm mt-1">{comment.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  switch (currentView) {
    case 'novel':
      return renderNovel();
    case 'reader':
      return renderReader();
    default:
      return renderProfile();
  }
};

export default NovelApp;
