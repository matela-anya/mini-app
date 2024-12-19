import React, { useState, useEffect } from 'react';
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

  // Добавляем эффект для отслеживания изменений
  useEffect(() => {
    console.log('Current view changed to:', currentView);
    console.log('Selected novel:', selectedNovel);
  }, [currentView, selectedNovel]);

  const handleSelectNovel = (id) => {
    console.log('Selecting novel with id:', id);
    const novel = novelsData.find(n => n.id === id);
    console.log('Found novel:', novel);
    setSelectedNovel(novel);
    setCurrentView('novel');
  };

  const handleBack = () => {
    console.log('Going back to profile');
    setCurrentView('profile');
    setSelectedNovel(null);
  };

  return (
    <div className="min-h-screen">
      <div className="p-4 max-w-4xl mx-auto">
        {currentView === 'profile' ? (
          <>
            <ProfilePage 
              novels={novelsData} 
              onSelectNovel={handleSelectNovel} 
            />
            <div className="hidden">Debug: Profile View</div>
          </>
        ) : currentView === 'novel' && selectedNovel ? (
          <>
            <NovelPage
              novel={selectedNovel}
              onBack={handleBack}
              comments={comments[selectedNovel.id] || []}
              onSaveComment={(type, id, comment) => {
                console.log('Saving comment:', { type, id, comment });
                const newComment = {
                  id: Date.now(),
                  text: comment,
                  timestamp: new Date().toISOString(),
                };
                setComments(prev => ({
                  ...prev,
                  [id]: [...(prev[id] || []), newComment],
                }));
              }}
            />
            <div className="hidden">Debug: Novel View</div>
          </>
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </div>
  );
};

export default App;
