import React, { useState } from 'react';
import { ProfilePage } from './components/ProfilePage';
import { NovelPage } from './components/NovelPage';
import CommentsSection from './components/CommentsSection';

const novelsData = [
  {
    id: 1,
    title: 'Возрождение восьмого класса',
    author: 'Ли Су Хён',
    chapters: 120,
    cover: '/api/placeholder/100/150',
    description: 'Увлекательная история о путешествии во времени и второй попытке прожить школьные годы.',
    tags: ['Фэнтези', 'Школа', 'Романтика'],
    rating: 4.8,
    ratingCount: 120,
  },
];

const App = () => {
  const [currentView, setCurrentView] = useState('profile');
  const [selectedNovel, setSelectedNovel] = useState(null);
  const [currentChapter, setCurrentChapter] = useState(null); // Добавляем состояние для текущей главы
  const [comments, setComments] = useState({});

  const handleSaveComment = (type, id, comment) => {
    const newComment = {
      id: Date.now(),
      text: comment,
      timestamp: new Date().toISOString(),
    };

    setComments((prev) => ({
      ...prev,
      [id]: [...(prev[id] || []), newComment],
    }));
  };

  // Добавляем обработчик выбора главы
  const handleSelectChapter = (chapterNumber) => {
    setCurrentChapter(chapterNumber);
    // Здесь можно добавить логику для загрузки содержимого главы
    console.log(`Selected chapter ${chapterNumber}`);
  };

  return (
    <div>
      {currentView === 'profile' && (
        <ProfilePage
          novels={novelsData}
          onSelectNovel={(id) => {
            setSelectedNovel(novelsData.find((novel) => novel.id === id));
            setCurrentView('novel');
          }}
        />
      )}
      {currentView === 'novel' && selectedNovel && (
        <NovelPage
          novel={selectedNovel}
          onBack={() => {
            setCurrentView('profile');
            setCurrentChapter(null); // Сбрасываем текущую главу при возврате
          }}
          onSelectChapter={handleSelectChapter} // Передаем обработчик
          currentChapter={currentChapter} // Передаем текущую главу
          comments={comments[selectedNovel.id] || []}
          onSaveComment={handleSaveComment}
        />
      )}
    </div>
  );
};

export default App;
