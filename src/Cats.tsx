import React, { useState, useEffect } from "react";
import './Cats.css';

interface Cat {
  id: string;
  url: string;
  width: number;
  height: number;
}

const Cats: React.FC = () => {
  const [cats, setCats] = useState<Cat[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const catUrl = "https://api.thecatapi.com/v1/images/search?limit=10";

  // Async function to fetch cat images
  const fetchCats = async () => {
    const response = await fetch(catUrl);
    const data: Cat[] = await response.json();
    setCats(data);
    setLoading(false);
  };

  // Fetch cat images from API when the component mounts
  useEffect(() => {
    fetchCats()
      .catch((err) => console.log("Hmm... ", err));
  }, []);

  // Delete a cat from the list (Altho why would you? Really?)
  // Real world - this would likely be an API call
  const deleteCat = (id: string) => {
    setCats(cats.filter((cat) => cat.id !== id));
  };

  return (
    <>
    <h2>Caaats</h2>
    { loading
      ? <p>Loading...</p>
      : <div className="container" data-testid="cat-box">
          {cats.map((cat) => (
          <div key={cat.id} className="cat-card">
            <img src={cat.url} alt="Cat" className="cat-pic" />
            <button onClick={() => deleteCat(cat.id)} className="">
              Delete me 🐈 ☠️ 🙁
            </button>
          </div>
          ))}
        </div>
    }
    </>
  );
};

export default Cats;
