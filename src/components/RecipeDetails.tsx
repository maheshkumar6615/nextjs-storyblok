import React from "react";
import Image from "next/image";

interface RecipeDetailProps {
  printCTALabel: string,
  prepTimeSuffix: string,
  totalTimeSuffix: string,
  prepTimeHeadline: string,
  servingsHeadline: string,
  keepAwakeModeText: string,
  nutritionCTALabel: string,
  totalTimeHeadline: string,
  directionsHeadline: string,
  keepAwakeLabelText: string,
  videoPlayButtonCTA: string,
  displayYoutubeVideo: boolean,
  ingredientsHeadline: string,
  copyIngredientsTooltip: string,
  displayKeepAwakeToggle: boolean,
  displayCopyIngredientsButton: boolean,
  blok: {
    lang: string;
    recipe: {
      recipeToPrimaryImage: string;
      recipeWebName: string;
      recipeDescription: string;
      prepTime: string;
      totalTime: string;
      ingredients: { amount: string; description: string }[];
      directions: string[];
    };
  };
}

const RecipeDetails = ({ blok }: RecipeDetailProps) => {
  const { recipe } = blok;

  return (
    <div className="recipedetails">
      <div className="recipe-detail-highlights section--in-viewport" itemScope itemType="http://schema.org/Recipe">
        <section className="section--in-viewport">
          <div className="content_wrapper recipe-highlights-container">
            <div className="recipe-image">
              <Image
                itemProp="image"
                src={
                  recipe.recipeToPrimaryImage?.startsWith("//")
                    ? `https:${recipe.recipeToPrimaryImage}`
                    : recipe.recipeToPrimaryImage
                }
                alt={recipe.recipeWebName}
                width={500}
                height={300}
                className="recipe-main-image"
              />
            </div>


            <div className="recipe-details">
              <h1 itemProp="name" className="recipe-title"
                dangerouslySetInnerHTML={{
                  __html: recipe.recipeWebName || "Recipe Title is null",
                }}>
              </h1>
              <p itemProp="description" className="recipe-description">
                {recipe.recipeDescription}
              </p>

              <div className="recipe-highlights">
                <div className="recipe-highlight--preptime" itemProp="prepTime">
                  PREP TIME (MIN): <strong>{recipe.prepTime}</strong>
                </div>
                <div className="recipe-highlight--totaltime" itemProp="totalTime">
                  TOTAL TIME (MIN): <strong>{recipe.totalTime}</strong>
                </div>
              </div>

              <div className="recipe-detail-actions">
                <a href="#" data-event="print" className="button-cta button-print">
                  PRINT
                </a>
              </div>
            </div>
          </div>

          
          <div className="content_wrapper recipe-ingredients-directions">
            
            <div className="recipe-ingredients">
              <h2>Ingredients</h2>
              <ul className="ingredients-list">
                <li>8 Rice Krispies Treats®</li>
                <li>14oz White Canned Frosting or White Icing</li>
                <li>Assorted decorations (16 edible eyeballs)</li>
              </ul>
            </div>

            <div className="recipe-instructions" itemProp="recipeInstructions">
              <h2>Directions</h2>
              <p>1. Unwrap Rice Krispies Treats® and place 2 apart on a baking sheet lined with parchment paper or wax paper.</p>
              <p>2. Apply white icing or frosting to create the mummy wrapping and add edible eyes.</p>
              <p>3. Share your spooky treat and enjoy!</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default RecipeDetails;