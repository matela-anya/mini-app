// Компонент для профиля
const ProfilePage = ({ novels, onSelectNovel }) => {
  return (
    <div className="p-4 max-w-lg mx-auto">
      <div className="flex items-start space-x-4 mb-6">
        <img src="/api/placeholder/96/96" alt="Avatar" className="w-16 h-16 rounded-full" />
        <div>
          <h2 className="text-xl font-bold">KoreanFan</h2>
          <p className="text-gray-600 mb-2">Переводчик корейских новелл</p>
          <p className="text-sm text-gray-700">
            Привет! Я увлеченный переводчик корейских новелл с 5-летним опытом.
            Моя цель - познакомить русскоязычных читателей с лучшими произведениями
            корейской веб-литературы. Наслаждайтесь чтением!
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {novels.map((novel) => (
          <div key={novel.id} className="border rounded-lg p-4 shadow-sm">
            <div className="flex space-x-4">
              <img src={novel.cover} alt={novel.title} className="w-24 h-36 object-cover rounded" />
              <div className="flex-1">
                <h3 className="font-bold">{novel.title}</h3>
                <p className="text-sm text-gray-600 mb-2">{novel.author}</p>
                <div className="flex items-center mb-2">
                  <span className="text-yellow-400 font-bold">★ {novel.rating}</span>
                  <span className="ml-1 text-sm">({novel.ratingCount} оценок)</span>
                </div>
                <div className="flex flex-wrap gap-1 mb-2">
                  {novel.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
                <button
                  onClick={() => onSelectNovel(novel.id)}
                  className="text-blue-600 text-sm transition-all duration-200 hover:text-blue-800 hover:underline"
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
};

export { ProfilePage };
