import React from "react";
import Image from "next/image";

interface RelatedRecipe {
  image: string;
  title: string;
  description: string;
  seoName: string;
}

interface RelatedRecipesProps {
  blok: {
    relatedRecipesLabel: string;
    maximumRecipes: string;
    recipe: {
      relatedRecipes: RelatedRecipe[];
    };
  };
}

const RelatedRecipes = ({ blok }: RelatedRecipesProps) => {
  const { relatedRecipesLabel, maximumRecipes, recipe } = blok;
  const { relatedRecipes } = recipe;

  const maxRecipes = maximumRecipes && !isNaN(parseInt(maximumRecipes, 10))
  ? parseInt(maximumRecipes, 10)
  : relatedRecipes.length;
  const displayedRecipes = relatedRecipes?.slice(0, maxRecipes);

  return (
    <div className="recipe-related">
      <section>
        <div className="content_wrapper">
          <h2>{relatedRecipesLabel}</h2>
          <div className="recipe-list">
            {displayedRecipes?.map((item, index) => (
              <div key={index} className="recipe-list-item">
                <a href={item.seoName}>
                  <div className="recipe-list-image">
                    <Image
                      src={
                        item.image?.startsWith("//")
                          ? `https:${item.image}`
                          : item.image
                      }
                      alt={item.title}
                      width={300}
                      height={200}
                      className="recipe-image"
                    />
                  </div>
                  <div className="recipe-list-description">
                    <h3 dangerouslySetInnerHTML={{ __html: item.title || "Title is null" }}></h3>
                    <p
                      dangerouslySetInnerHTML={{ __html: item.description || "Description is null" }}
                    ></p>
                    <span className="button-cta">Try this recipe</span>
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default RelatedRecipes;
