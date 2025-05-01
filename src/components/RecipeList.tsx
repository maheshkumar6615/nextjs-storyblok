import { storyblokEditable } from "@storyblok/react/rsc";
import Image from "next/image";
import React from "react";

interface Recipe {
  recipeToPrimaryImage: string;
  seoName: string;
  stepId: string;
  recipeWebName: string;
  prepTime: string;
  totalTime: string;
  recipeDescription: string;
}

interface RecipeListProps {
  blok: {
    recipes: Recipe[];
    lang: string;
    maximumRecipes: number;
    relatedRecipesLabel: string;
  };
}

const RecipeList = ({ blok }: RecipeListProps) => {
  const recipes = blok.recipes || [];
  const maxRecipes = blok.maximumRecipes || recipes.length;
  const displayedRecipes = recipes.slice(0, maxRecipes);

  return (
    <div className="content_wrapper recipe-list-wrapper" {...storyblokEditable(blok)}>
      <h2 className="recipe-list-title">{blok.relatedRecipesLabel || "Related Recipes"}</h2>
      <div className="recipes-list">
        {displayedRecipes.map((recipe, index) => (
          <div key={index} className="recipes-list-recipe">
            <a
              href={`/ricekrispies/${blok.lang}/recipes/${recipe.seoName}`}
              title={recipe.recipeWebName}
              className="track"
            >
              <div className="recipe-primary-image">
                {recipe.recipeToPrimaryImage ? (
                  <Image
                    src={
                      recipe.recipeToPrimaryImage.startsWith("//")
                        ? `https:${recipe.recipeToPrimaryImage}`
                        : recipe.recipeToPrimaryImage
                    }
                    alt={recipe.recipeWebName || "Recipe Image"}
                    width={300}
                    height={300}
                    layout="responsive"
                  />
                ) : (
                  <p>No image available</p>
                )}
              </div>

              <div className="recipe-list-content">
                <div
                  className="recipe-list-title"
                  dangerouslySetInnerHTML={{ __html: recipe.recipeWebName }}
                ></div>
              </div>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecipeList;