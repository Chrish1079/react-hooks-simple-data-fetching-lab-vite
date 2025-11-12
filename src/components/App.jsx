import { useEffect, useState, useCallback } from 'react';

const DOG_API_URL = 'https://dog.ceo/api/breeds/image/random';

function App() {
  const [dogImage, setDogImage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  const fetchDogImage = useCallback(async () => {
    try {
      setIsLoading(true);
      setErrorMessage(null);

      const response = await fetch(DOG_API_URL);

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      const data = await response.json();

      setDogImage(data.message);
    } catch (error) {
      setDogImage(null);
      setErrorMessage('Something went wrong while fetching a dog image.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDogImage();
  }, [fetchDogImage]);

  return (
    <main className="app">
      <h1>Random Dog Viewer</h1>
      <button type="button" onClick={fetchDogImage}>
        Fetch New Dog
      </button>

      {isLoading && <p>Loading...</p>}

      {errorMessage && (
        <p role="alert">{errorMessage}</p>
      )}

      {dogImage && !isLoading && (
        <img src={dogImage} alt="A random dog" />
      )}
    </main>
  );
}

export default App;
