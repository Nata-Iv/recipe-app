export default function IngredientsList(props) {
  const ingredientsListItem = props.ingredients.map((el) => (
    <li key={el}>{el}</li>
  ));
  return (
    <section
      className={`ingredientSectionContainer ${
        props.isClearing ? "hidden" : ""
      }`}
    >
      <h2>Ingredients on hand:</h2>
      <button onClick={props.startOver} className="clear-btn">
        Start over
      </button>
      <ul className="ingredients-list" aria-live="polite">
        {ingredientsListItem}
      </ul>
      {props.ingredients.length > 3 && (
        <div className="get-recipe-container">
          <div>
            <h3>Ready for a recipe?</h3>
            <p>Generate a recipe from your list of ingredients.</p>
          </div>
          <button disabled={props.isLoading} onClick={props.getRecipe}>
            Get a recipe
          </button>
        </div>
      )}
    </section>
  );
}
