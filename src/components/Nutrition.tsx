import React from "react";

interface NutritionProps {
  staticContent: {
    selectSizeLabel: string;
    ingredientsTitle: string;
    smartLabelCTAText: string;
    nutritionSectionTitle: string;
    smartLabelInstructions: string;
  };
}

const Nutrition = ({ staticContent }: NutritionProps) => {
  // Hardcoded ingredients
  const ingredients = `Toasted rice cereal (rice, sugar, salt, malt flavor), corn syrup, fructose, vegetable oil (soybean and palm oil with TBHQ for freshness), sugar, corn syrup solids. Contains 2% or less of vegetable glycerin, dextrose, gelatin, natural and artificial flavors (contains milk), salt, DATEM, acetylated monoglycerides, soy lecithin, BHT for freshness.`;

  // Hardcoded nutrition details
  const nutritionDetails = [
    { gtin: "00038000126710", marketingSize: "32.6oz" },
    { gtin: "00038000265013", marketingSize: "0.78oz" },
    { gtin: "00038000350559", marketingSize: "12.4oz" },
    { gtin: "00038000265006", marketingSize: "6.2oz" },
    { gtin: "00038000077814", marketingSize: "31.2oz" },
  ];

  return (
    <div className="nutritionoverride">
      <section className="product-nutrition">
        <div className="content_wrapper">
          {/* Section Title */}
          <h2>{staticContent.nutritionSectionTitle}</h2>
          <div className="product-nutrition-row">
            {/* Ingredients Section */}
            <div className="product-nutrition-highlights">
              <h3>{staticContent.ingredientsTitle}</h3>
              <p>{ingredients}</p>
            </div>

            {/* Smart Label Section */}
            <div className="product-nutrition-smartlabel">
              <div className="product-nutrition-smartlabel-title">
                <p>{staticContent.smartLabelInstructions}</p>
                <svg
                  tabIndex={0}
                  aria-label="smartlabel logo"
                  className="smart-label-logo"
                  width="200"
                  height="40"
                  viewBox="0 0 312 68"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* SVG content */}
                </svg>
              </div>

              {/* Select Size Dropdown */}
              <label htmlFor="sizes">{staticContent.selectSizeLabel}</label>
              <span className="select-wrapper">
                <select
                  id="sizes"
                  name="smartLabel"
                  aria-label={staticContent.selectSizeLabel}
                  className="smartlabel-select js-smartlabel-select"
                >
                  {nutritionDetails.map((item, index) => (
                    <option key={index} value={item.gtin}>
                      {item.marketingSize}
                    </option>
                  ))}
                </select>
              </span>

              {/* Smart Label CTA */}
              {nutritionDetails[0]?.gtin && (
                <a
                  id="smartlabel-cta"
                  href={`http://smartlabel.kelloggs.com/Product/Index/${nutritionDetails[0].gtin}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="button-cta button-cta-white track colors"
                >
                  {staticContent.smartLabelCTAText}
                </a>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Nutrition;