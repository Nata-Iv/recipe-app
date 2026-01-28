import React from "react";
import ClaudeRecipe from "./ClaudeRecipe";
import IngredientsList from "./IngredientsList";

export default function Article() {
  const [ingredients, setIngredients] = React.useState([
    "Chicken",
    "Oregano",
    "Tomatoes",
    "ground beef",
  ]);
  const [recipeShown, setRecipeShown] = React.useState(false);

  function toggleRecipeShown() {
    setRecipeShown((prev) => !prev);
  }

  function addIngredient(formData) {
    const newIngredient = formData.get("ingredient");
    setIngredients((prev) => [...prev, newIngredient]);
  }
  return (
    <main>
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
        <button>+ Add ingredient</button>
      </form>
      {ingredients.length > 0 && (
        <IngredientsList
          toggleRecipeShown={toggleRecipeShown}
          ingredients={ingredients}
        />
      )}
      {recipeShown && <ClaudeRecipe />}
    </main>
  );
}
