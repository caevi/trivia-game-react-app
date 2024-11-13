import React, { useState } from 'react';

const categories = [
  { name: "Geography", apiUrl: "https://opentdb.com/api.php?amount=5&category=22" },
  { name: "Politics", apiUrl: "https://opentdb.com/api.php?amount=5&category=24" },
  { name: "Sports", apiUrl: "https://opentdb.com/api.php?amount=5&category=21" },
  { name: "Celebrities", apiUrl: "https://opentdb.com/api.php?amount=5&category=26" },
  { name: "Animals", apiUrl: "https://opentdb.com/api.php?amount=5&category=27" },
];

function CategorySelection({ setCategoryURL, setStartQuiz }) {
  const [selectedCategory, setSelectedCategory] = useState(''); // Track the selected category

  // Function to handle category selection
  const handleCategoryClick = (apiUrl) => {
    setSelectedCategory(apiUrl); // Save the selected category URL
  };

  // Function to continue to the quiz
  const continueQuiz = () => {
    if (selectedCategory) {
      setCategoryURL(selectedCategory); // Set the selected category URL
      setStartQuiz(true);               // Start the quiz
    } else {
      alert('Please select a category.');
    }
  };

  return (
    <div className="category-selection">

      <h2>Choose your trivia category!</h2>
       
      <div className="category-buttons">
        {categories.map((category) => (
          <button
            key={category.name}
            onClick={() => handleCategoryClick(category.apiUrl)} // Select category on click
            className={selectedCategory === category.apiUrl ? 'selected' : ''} // Highlight selected category
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Continue button centered at the bottom */}
      <div className="continue-button">
        <button onClick={continueQuiz} disabled={!selectedCategory}>
          Continue
        </button>
      </div>
    </div>
  );
}

export default CategorySelection;
