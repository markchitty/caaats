import { Cat } from '../Cats';
import './CatCard.css';

interface CatCardProps {
  cat: Cat;
  onDelete: (id: string) => void;
}

const CatCard = ({ cat, onDelete }: CatCardProps) => {
  return (
    <div className="cat-card">
      <img src={cat.url} alt={`Cat ${cat.id}`} className="cat-pic" />
      <button onClick={() => onDelete(cat.id)} data-testid={`delete_${cat.id}`}>
        Delete me 🐈 ☠️ 🙁
      </button>
    </div>
  );
};

export default CatCard;
