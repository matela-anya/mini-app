import React, { useState } from 'react';
import { ProfilePage } from './components/ProfilePage';
import { NovelPage } from './components/NovelPage';

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

  console.log('Current view:', currentView);
  console.log('Selected novel:', selectedNovel);

  return (
    <div className="min-h-screen bg-gray-50">
      {currentView === 'profile' && (
        <ProfilePage
          novels={novelsData}
          onSelectNovel={(id) => {
            console.log('Selecting novel with id:', id);
            const novel = novelsData.find((n) => n.id === id);
            console.log('Found novel:', novel);
            setSelectedNovel(novel);
            setCurrentView('novel');
          }}
        />
      )}
      {currentView === 'novel' && selectedNovel && (
        <NovelPage
          novel={selectedNovel}
          onBack={() => {
            setCurrentView('profile');
            setSelectedNovel(null);
          }}
          comments={comments[selectedNovel.id] || []}
          onSaveComment={handleSaveComment}
        />
      )}
    </div>
  );
};

export default App;
