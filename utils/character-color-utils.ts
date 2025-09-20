// Function to filter SVG based on selected characters using class
export const filterSvgByCharacters = (
  svgContent: string,
  characterSelection: any[]
): string => {
  if (!svgContent || !characterSelection || characterSelection.length === 0) {
    return svgContent;
  }

  try {
    // Parse SVG
    const parser = new DOMParser();
    const doc = parser.parseFromString(svgContent, "image/svg+xml");
    const svgElement = doc.querySelector("svg");

    if (!svgElement) {
      return svgContent;
    }

    // Get all selected classes from character selection
    const selectedClasses = new Set<string>();
    
    characterSelection.forEach((char) => {
        if (char.body && Array.isArray(char.body)) {
          char.body.forEach((bodyItem: any) => {
            if (bodyItem.label && bodyItem.bodyType) {
            // Add body type class
            selectedClasses.add(bodyItem.bodyType.toLowerCase());
            // Add label class
            selectedClasses.add(bodyItem.label.toLowerCase());
            // Add combination class
            selectedClasses.add(`${bodyItem.bodyType}-${bodyItem.label}`.toLowerCase());
            }
          });
        }
    });


    // Array of colors to exclude from comparison
    const excludedColors = ["#111009"];

    // Process Layer_2 - use id from books
    const layer2 = svgElement.querySelector('g[id="Layer_2"]');
    if (layer2) {
      filterLayerBySelectedClasses(layer2, selectedClasses);
      addClassesToPaths(layer2);
      applyColorsFromCharacters(layer2, characterSelection, excludedColors);
    }

    // Process Layer_4 - use id from books
    const layer4 = svgElement.querySelector('g[id="Layer_4"]');
    if (layer4) {
      filterLayerBySelectedClasses(layer4, selectedClasses);
      addClassesToPaths(layer4);
      applyColorsFromCharacters(layer4, characterSelection, excludedColors);
    }

    // Return the filtered SVG
    return new XMLSerializer().serializeToString(svgElement);
  } catch (error) {
    console.error("Error filtering SVG:", error);
    return svgContent;
  }
};

// Helper function to filter a layer by selected classes
export const filterLayerBySelectedClasses = (
  layerElement: Element,
  selectedClasses: Set<string>
) => {
  // Get all direct child groups (body types) - use id from books
  const bodyTypeGroups = Array.from(layerElement.children).filter(
    (child) => child.tagName === "g" && child.hasAttribute("id")
  );

  bodyTypeGroups.forEach((group) => {
    const groupId = group.getAttribute("id");
    
    if (!groupId) return;

    // Check if this group's id matches any selected class
    const isSelected = Array.from(selectedClasses).some(selectedClass => {
      return groupId.toLowerCase().includes(selectedClass.toLowerCase());
    });

    // If not selected, remove the group
    if (!isSelected) {
      group.remove();
    } else {
      // If selected, also filter its children (labels)
      const labelGroups = Array.from(group.children).filter(
        (child) => child.tagName === "g" && child.hasAttribute("id")
      );

      labelGroups.forEach((labelGroup) => {
        const labelId = labelGroup.getAttribute("id");
        if (!labelId) return;

        const isLabelSelected = Array.from(selectedClasses).some(selectedClass => {
          return labelId.toLowerCase().includes(selectedClass.toLowerCase());
        });

        if (!isLabelSelected) {
          labelGroup.remove();
        }
      });
    }
  });
};

// Helper function to add classes to paths based on their parent groups
export const addClassesToPaths = (layerElement: Element) => {
  // Get all groups in the layer
  const allGroups = Array.from(layerElement.querySelectorAll('g[id]'));

  allGroups.forEach((group) => {
    const groupId = group.getAttribute("id");
    if (!groupId) return;

    // Get all paths within this group
    const paths = group.querySelectorAll('path');
    
    paths.forEach((path, index) => {
      let fillColor = null;
      
      // Check fill attribute first
      fillColor = path.getAttribute("fill");
      
      // If no fill attribute, check style attribute
      if (!fillColor || fillColor === 'none' || fillColor === 'transparent') {
        const style = path.getAttribute("style");
        if (style) {
          const fillMatch = style.match(/fill:\s*([^;]+)/);
          if (fillMatch && fillMatch[1]) {
            fillColor = fillMatch[1].trim();
          }
        }
      }

      // Add class if fill color exists and is valid
      if (fillColor && fillColor !== 'none' && fillColor !== 'transparent') {
        // Remove # from color if it exists
        const cleanColor = fillColor.replace('#', '');
        // Add class with group id, index and color
        path.setAttribute("class", `${groupId}-${index}-${cleanColor}`);
      }
    });
  });
};

// Helper function to apply colors from character selection to book paths
export const applyColorsFromCharacters = (layerElement: Element, characterSelection: any[], excludedColors: string[]) => {
  // Get all paths with class attribute
  const paths = layerElement.querySelectorAll('path[class]');
  
  paths.forEach((path) => {
    const pathClass = path.getAttribute("class");
    if (!pathClass) return;

    // Parse class to get group, index, and color (e.g., "Woman_character-0-ca8450")
    const classParts = pathClass.split('-');
    if (classParts.length < 3) return;

    const groupName = classParts[0];
    const bookColor = classParts[2];

    // Check if this color should be excluded
    if (excludedColors.includes(`#${bookColor}`) || excludedColors.includes(bookColor)) {
      return; // Skip this path
    }

    // Find matching group in character selection and get its color
    let selectedColor = null;
    
    characterSelection.forEach((char) => {
      if (char.body && Array.isArray(char.body)) {
        char.body.forEach((bodyItem: any) => {
          if (bodyItem.label && bodyItem.label.toLowerCase() === groupName.toLowerCase() && bodyItem.color) {
            selectedColor = bodyItem.color; // Use the color from character selection
          }
        });
      }
    });

    // Apply the selected color if found
    if (selectedColor) {
      // Check if path has fill attribute or style attribute
      if (path.hasAttribute("fill")) {
        path.setAttribute("fill", selectedColor);
      } else {
        // Update style attribute
        const currentStyle = path.getAttribute("style") || "";
        const updatedStyle = currentStyle.replace(
          /fill:\s*[^;]+/g,
          `fill: ${selectedColor}`
        );
        path.setAttribute("style", updatedStyle);
      }
    }
  });
};