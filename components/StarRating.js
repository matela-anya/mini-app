// Добавляем компонент "Рейтинг звёзд"
const StarRating = ({ rating, maxStars = 5, onRate }) => {
  const [hoveredStar, setHoveredStar] = useState(0);

  return (
    <div className="flex space-x-1">
      {Array.from({ length: maxStars }, (_, i) => i + 1).map((star) => (
        <button
          key={star}
          onClick={() => onRate(star)}
          onMouseEnter={() => setHoveredStar(star)}
          onMouseLeave={() => setHoveredStar(0)}
          className={`w-8 h-8 ${
            star <= (hoveredStar || rating) ? 'text-yellow-400' : 'text-gray-300'
          }`}
        >
          ★
        </button>
      ))}
    </div>
  );
};

export { StarRating };
