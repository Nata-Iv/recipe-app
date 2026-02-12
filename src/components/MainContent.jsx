import React from "react";
import ClaudeRecipe from "./ClaudeRecipe";
import IngredientsList from "./IngredientsList";

export default function Article() {
  const [ingredients, setIngredients] = React.useState([
    "Chicken",
    "Oregano",
    "Tomatoes",
    "Ground beef",
  ]);

  const [recipe, setRecipe] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isClearing, setIsClearing] = React.useState(false);

  async function getRecipe() {
    setIsLoading(true);

    try {
      const res = await fetch("/.netlify/functions/getRecipe", {
        method: "POST",
        body: JSON.stringify({ ingredients: ingredients }),
      });
      const recipeMarkdown = await res.text();
      setRecipe(recipeMarkdown);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  function addIngredient(formData) {
    const newIngredient = formData.get("ingredient")?.trim();
    if (!newIngredient) return;
    setIngredients((prev) => [...prev, newIngredient]);
  }

  function startOver() {
    setIsClearing(true);

    setTimeout(() => {
      setIngredients([]);
      setRecipe(null);
      setIsClearing(false);
    }, 500);
  }

  return (
    <main>
      <h3 className="main-headline">
        Enter your ingredients and watch a tasty recipe in seconds!
      </h3>
      <form action={addIngredient} type="text" className="add-ingredient-form">
        <div className="input-group">
          <input
            type="text"
            placeholder="e.g. oregano"
            aria-label="Add ingredient"
            name="ingredient"
          />
          <label
            className={
              ingredients.length > 3 ? "label-hidden" : "label-visible"
            }
          >
            Add at least 4 ingredients
          </label>
        </div>
        <button disabled={isLoading}>Add ingredient</button>
      </form>
      {ingredients.length > 0 && (
        <IngredientsList
          isLoading={isLoading}
          getRecipe={getRecipe}
          ingredients={ingredients}
          startOver={startOver}
          isClearing={isClearing}
        />
      )}

      {isLoading ? (
        <section className="loading-container">
          <p>Chef Claude is thinking... 🍳</p>
        </section>
      ) : (
        recipe && <ClaudeRecipe recipe={recipe} isClearing={isClearing} />
      )}
    </main>
  );
}
