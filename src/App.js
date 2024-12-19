import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
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

const AppContent = () => {
  const navigate = useNavigate();
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
    <Routes>
      <Route 
        path="/" 
        element={
          <ProfilePage
            novels={novelsData}
            onSelectNovel={(id) => {
              const novel = novelsData.find((n) => n.id === id);
              setSelectedNovel(novel);
              navigate(`/novel/${id}`);
            }}
          />
        }
      />
      <Route 
        path="/novel/:id" 
        element={
          <NovelPage
            novel={selectedNovel}
            onBack={() => navigate('/')}
            comments={selectedNovel ? comments[selectedNovel.id] || [] : []}
            onSaveComment={handleSaveComment}
          />
        }
      />
    </Routes>
  );
};

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <AppContent />
      </div>
    </Router>
  );
};

export default App;
