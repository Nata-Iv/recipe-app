import ReactMarkdown from "react-markdown";

export default function ClaudeRecipe(props) {
  return (
    <section
      className={`suggested-recipe-container ${
        props.isClearing ? "hidden" : ""
      }`}
      aria-live="polite"
    >
      <h3>Chef Claude Recommends:</h3>
      <ReactMarkdown>{props.recipe}</ReactMarkdown>
    </section>
  );
}
