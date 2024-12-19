import React, { useState } from 'react';
import { ProfilePage } from './components/ProfilePage';
import { NovelPage } from './components/NovelPage';
import CommentsSection from './components/CommentsSection';

// Пример данных для новелл
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
          onBack={() => setCurrentView('profile')}
          comments={comments[selectedNovel.id] || []}
          onSaveComment={handleSaveComment}
        />
      )}
    </div>
  );
};

export default App;
