import React from "react";

interface CookingInstructionsProps {
  instructions: string;
}

const CookingInstructions: React.FC<CookingInstructionsProps> = ({ instructions }) => {
  const parseInstructions = (instructions: string) => {
    const parts = instructions.split(/<bold>(.*?)<\/bold>/g);
    const elements = [];

    for (let i = 0; i < parts.length; i++) {
      if (i % 2 === 0) {
        // Regular text
        const lines = parts[i].split('\n').filter(line => line.trim() !== '');
        lines.forEach((line, index) => {
          elements.push(<p key={`text-${i}-${index}`} className="text-gray-700 mb-2" dangerouslySetInnerHTML={{ __html: line }} />);
        });
      } else {
        // Bold text
        elements.push(<h4 key={`bold-${i}`} className="text-lg font-bold mt-6 mb-2" dangerouslySetInnerHTML={{ __html: parts[i] }} />);
        const nextPart = parts[i + 1];
        if (nextPart) {
          const listItems = nextPart.split('\n').filter(line => line.trim() !== '');
          elements.push(
            <ol key={`list-${i}`} className="list-decimal list-inside mb-4">
              {listItems.map((item, index) => (
                <li key={`list-item-${i}-${index}`} dangerouslySetInnerHTML={{ __html: item }} className="mb-2" />
              ))}
            </ol>
          );
          i++;
        }
      }
    }

    return elements;
  };

  return (
    <div className="cooking-instructions p-4">
      <h3 className="text-xl font-bold mb-4">Cooking Instructions</h3>
      <div className="instructions">
        {parseInstructions(instructions)}
      </div>
    </div>
  );
};

export default CookingInstructions;