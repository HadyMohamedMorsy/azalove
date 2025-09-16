// Helper function to get colors from saved characters
export const getSavedCharacterColors = () => {
  try {
    const savedCouples = localStorage.getItem("savedCouples");
    if (!savedCouples) return {};

    const couples = JSON.parse(savedCouples);
    const latestCouple = couples[couples.length - 1];
    if (!latestCouple) return {};

    const character1Colors = extractColorsFromLayers(
      latestCouple.character1 || []
    );
    const character2Colors = extractColorsFromLayers(
      latestCouple.character2 || []
    );

    return {
      Layer_2: character1Colors,
      Layer_4: character2Colors,
    };
  } catch (error) {
    console.error("Error getting saved colors:", error);
    return {};
  }
};

// Helper function to get colors from character selection
export const getColorsFromCharacterSelection = (characterSelection: any[]) => {
  const colorsByCharacter: Record<string, Record<string, string[]>> = {};

  characterSelection.forEach((char, index) => {
    const layerId = index === 0 ? "Layer_2" : "Layer_4";
    const colorsByBodyType: Record<string, string[]> = {};

    if (char.body && Array.isArray(char.body)) {
      char.body.forEach((bodyItem: any) => {
        if (bodyItem.bodyType && bodyItem.color) {
          if (!colorsByBodyType[bodyItem.bodyType]) {
            colorsByBodyType[bodyItem.bodyType] = [];
          }
          colorsByBodyType[bodyItem.bodyType].push(bodyItem.color);
        }
      });
    }

    // Also check for colorsCode if available
    if (char.colorsCode && Array.isArray(char.colorsCode)) {
      // If we don't have specific body type colors, use colorsCode as fallback
      if (Object.keys(colorsByBodyType).length === 0) {
        // Try to map colorsCode to body types
        if (char.bodyType && Array.isArray(char.bodyType)) {
          char.bodyType.forEach((bodyType: string, bodyIndex: number) => {
            if (char.colorsCode[bodyIndex]) {
              colorsByBodyType[bodyType] = [char.colorsCode[bodyIndex]];
            }
          });
        }
      }
    }

    colorsByCharacter[layerId] = colorsByBodyType;
  });

  return colorsByCharacter;
};

// Extract colors from layers grouped by body type
export const extractColorsFromLayers = (layers: any[]) => {
  const colorsByBodyType: Record<string, string[]> = {};

  layers.forEach((layer) => {
    if (!layer.svg || !layer.bodyType) return;

    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(layer.svg, "image/svg+xml");
      const paths = doc.querySelectorAll("path[fill]");

      const colors: string[] = [];
      paths.forEach((path) => {
        const fillColor = path.getAttribute("fill");
        if (fillColor && fillColor !== "none" && fillColor !== "transparent") {
          colors.push(fillColor);
        }
      });

      // Also check for colors in style attributes
      const styledPaths = doc.querySelectorAll("path[style]");
      styledPaths.forEach((path) => {
        const style = path.getAttribute("style");
        if (style) {
          const fillMatch = style.match(/fill:\s*([^;]+)/);
          if (
            fillMatch &&
            fillMatch[1] &&
            fillMatch[1] !== "none" &&
            fillMatch[1] !== "transparent"
          ) {
            colors.push(fillMatch[1].trim());
          }
        }
      });

      if (colors.length > 0) {
        colorsByBodyType[layer.bodyType] = Array.from(new Set(colors));
      }
    } catch (error) {
      console.error("Error parsing SVG:", error);
    }
  });

  return colorsByBodyType;
};

// Get colors for specific body type
export const getColorsForBodyType = (
  bodyTypeId: string | null,
  characterColors: any
): string[] => {
  if (!bodyTypeId || !characterColors) return [];

  // Direct match
  if (characterColors[bodyTypeId]) {
    return characterColors[bodyTypeId];
  }

  // Case-insensitive match
  const lowerBodyType = bodyTypeId.toLowerCase();
  for (const [key, value] of Object.entries(characterColors)) {
    if (key.toLowerCase() === lowerBodyType && Array.isArray(value)) {
      return value;
    }
  }

  // Return first available colors
  const firstColors = Object.values(characterColors).find(Array.isArray);
  return Array.isArray(firstColors) ? firstColors : [];
};

// Apply colors to SVG paths
export const applyColorsToGroup = (groupElement: Element, colors: string[]) => {
  if (!colors || colors.length === 0) return;

  // Apply colors to paths
  const paths = groupElement.querySelectorAll("path");
  paths.forEach((path, index) => {
    const color = colors[index % colors.length];

    // Set fill attribute
    path.setAttribute("fill", color);

    // Also update style attribute if it exists
    const currentStyle = path.getAttribute("style") || "";
    if (currentStyle) {
      const updatedStyle = currentStyle.replace(
        /fill:\s*[^;]+/g,
        `fill: ${color}`
      );
      path.setAttribute("style", updatedStyle);
    }
  });

  // Also apply colors to any nested groups
  const nestedGroups = groupElement.querySelectorAll("g");
  nestedGroups.forEach((group, index) => {
    const color = colors[index % colors.length];
    const groupPaths = group.querySelectorAll("path");
    groupPaths.forEach((path) => {
      path.setAttribute("fill", color);
      const currentStyle = path.getAttribute("style") || "";
      if (currentStyle) {
        const updatedStyle = currentStyle.replace(
          /fill:\s*[^;]+/g,
          `fill: ${color}`
        );
        path.setAttribute("style", updatedStyle);
      }
    });
  });
};

// Function to copy stroke properties from saved characters to SVG paths
export const copyStrokePropertiesFromSavedCharacters = (
  svgElement: Element
) => {
  try {
    const savedCouples = localStorage.getItem("savedCouples");
    if (!savedCouples) return;

    const couples = JSON.parse(savedCouples);
    const latestCouple = couples[couples.length - 1];
    if (!latestCouple) return;

    // Extract stroke properties from saved characters
    const strokeProperties = extractStrokePropertiesFromLayers([
      ...(latestCouple.character1 || []),
      ...(latestCouple.character2 || []),
    ]);

    if (Object.keys(strokeProperties).length === 0) return;

    // Apply stroke properties to SVG paths
    const allPaths = svgElement.querySelectorAll("path");
    allPaths.forEach((path, index) => {
      const bodyType = findBodyTypeForPath(path);
      if (bodyType && strokeProperties[bodyType]) {
        const strokeProps = strokeProperties[bodyType];

        // Apply stroke properties
        if (strokeProps.stroke) path.setAttribute("stroke", strokeProps.stroke);
        if (strokeProps.strokeWidth)
          path.setAttribute("stroke-width", strokeProps.strokeWidth);
        if (strokeProps.strokeLinejoin)
          path.setAttribute("stroke-linejoin", strokeProps.strokeLinejoin);
        if (strokeProps.strokeLinecap)
          path.setAttribute("stroke-linecap", strokeProps.strokeLinecap);

        // Update style attribute
        const currentStyle = path.getAttribute("style") || "";
        if (currentStyle) {
          let updatedStyle = currentStyle;
          if (strokeProps.stroke)
            updatedStyle = updatedStyle.replace(
              /stroke:\s*[^;]+/g,
              `stroke: ${strokeProps.stroke}`
            );
          if (strokeProps.strokeWidth)
            updatedStyle = updatedStyle.replace(
              /stroke-width:\s*[^;]+/g,
              `stroke-width: ${strokeProps.strokeWidth}`
            );
          if (strokeProps.strokeLinejoin)
            updatedStyle = updatedStyle.replace(
              /stroke-linejoin:\s*[^;]+/g,
              `stroke-linejoin: ${strokeProps.strokeLinejoin}`
            );
          if (strokeProps.strokeLinecap)
            updatedStyle = updatedStyle.replace(
              /stroke-linecap:\s*[^;]+/g,
              `stroke-linecap: ${strokeProps.strokeLinecap}`
            );

          // Add stroke properties if they don't exist
          if (strokeProps.stroke && !updatedStyle.includes("stroke:")) {
            updatedStyle += `; stroke: ${strokeProps.stroke}`;
          }
          if (
            strokeProps.strokeWidth &&
            !updatedStyle.includes("stroke-width:")
          ) {
            updatedStyle += `; stroke-width: ${strokeProps.strokeWidth}`;
          }
          if (
            strokeProps.strokeLinejoin &&
            !updatedStyle.includes("stroke-linejoin:")
          ) {
            updatedStyle += `; stroke-linejoin: ${strokeProps.strokeLinejoin}`;
          }
          if (
            strokeProps.strokeLinecap &&
            !updatedStyle.includes("stroke-linecap:")
          ) {
            updatedStyle += `; stroke-linecap: ${strokeProps.strokeLinecap}`;
          }

          path.setAttribute("style", updatedStyle);
        } else {
          // Create style attribute with stroke properties
          const fillColor = path.getAttribute("fill") || "#000000";
          let styleString = `fill: ${fillColor}`;
          if (strokeProps.stroke)
            styleString += `; stroke: ${strokeProps.stroke}`;
          if (strokeProps.strokeWidth)
            styleString += `; stroke-width: ${strokeProps.strokeWidth}`;
          if (strokeProps.strokeLinejoin)
            styleString += `; stroke-linejoin: ${strokeProps.strokeLinejoin}`;
          if (strokeProps.strokeLinecap)
            styleString += `; stroke-linecap: ${strokeProps.strokeLinecap}`;
          path.setAttribute("style", styleString);
        }
      }
    });
  } catch (error) {
    // Silent error handling
  }
};

// Extract stroke properties from layers
export const extractStrokePropertiesFromLayers = (layers: any[]) => {
  const strokePropertiesByBodyType: Record<string, any> = {};

  layers.forEach((layer) => {
    if (!layer.svg || !layer.bodyType) return;

    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(layer.svg, "image/svg+xml");
      const paths = doc.querySelectorAll("path");

      paths.forEach((path) => {
        const stroke = path.getAttribute("stroke");
        const strokeWidth = path.getAttribute("stroke-width");
        const strokeLinejoin = path.getAttribute("stroke-linejoin");
        const strokeLinecap = path.getAttribute("stroke-linecap");

        // Check style attribute for stroke properties
        const style = path.getAttribute("style") || "";
        const strokeFromStyle = style.match(/stroke:\s*([^;]+)/)?.[1]?.trim();
        const strokeWidthFromStyle = style
          .match(/stroke-width:\s*([^;]+)/)?.[1]
          ?.trim();
        const strokeLinejoinFromStyle = style
          .match(/stroke-linejoin:\s*([^;]+)/)?.[1]
          ?.trim();
        const strokeLinecapFromStyle = style
          .match(/stroke-linecap:\s*([^;]+)/)?.[1]
          ?.trim();

        if (stroke || strokeFromStyle) {
          if (!strokePropertiesByBodyType[layer.bodyType]) {
            strokePropertiesByBodyType[layer.bodyType] = {};
          }

          strokePropertiesByBodyType[layer.bodyType] = {
            stroke: stroke || strokeFromStyle,
            strokeWidth: strokeWidth || strokeWidthFromStyle,
            strokeLinejoin: strokeLinejoin || strokeLinejoinFromStyle,
            strokeLinecap: strokeLinecap || strokeLinecapFromStyle,
          };
        }
      });
    } catch (error) {
      // Silent error handling
    }
  });

  return strokePropertiesByBodyType;
};

// Helper function to find body type for a path element
const findBodyTypeForPath = (path: Element): string | null => {
  let currentElement = path.parentElement;
  while (currentElement) {
    if (currentElement.tagName === "g" && currentElement.hasAttribute("id")) {
      const id = currentElement.getAttribute("id");
      if (id && (id.includes("Layer_2") || id.includes("Layer_4"))) {
        // Find the body type group
        const bodyTypeGroups = currentElement.querySelectorAll("g[id]");
        for (let i = 0; i < bodyTypeGroups.length; i++) {
          const group = bodyTypeGroups[i];
          const groupId = group.getAttribute("id");
          if (groupId && groupId !== "Layer_2" && groupId !== "Layer_4") {
            return groupId;
          }
        }
      }
    }
    currentElement = currentElement.parentElement;
  }
  return null;
};

// Enhanced function to apply colors with better mapping
export const applyColorsToGroupEnhanced = (
  groupElement: Element,
  colors: string[]
) => {
  if (!colors || colors.length === 0) return;

  // Get all paths in order
  const allPaths = groupElement.querySelectorAll("path");

  // Apply colors in a more intelligent way
  allPaths.forEach((path, index) => {
    const color = colors[index % colors.length];

    // Set fill attribute
    path.setAttribute("fill", color);

    // Add black stroke for borders
    path.setAttribute("stroke", "#000000");
    path.setAttribute("stroke-width", "0.5");
    path.setAttribute("stroke-linejoin", "round");
    path.setAttribute("stroke-linecap", "round");

    // Also update style attribute if it exists
    const currentStyle = path.getAttribute("style") || "";
    if (currentStyle) {
      let updatedStyle = currentStyle.replace(
        /fill:\s*[^;]+/g,
        `fill: ${color}`
      );
      updatedStyle = updatedStyle.replace(
        /stroke:\s*[^;]+/g,
        `stroke: #000000`
      );
      updatedStyle = updatedStyle.replace(
        /stroke-width:\s*[^;]+/g,
        `stroke-width: 0.5`
      );
      updatedStyle = updatedStyle.replace(
        /stroke-linejoin:\s*[^;]+/g,
        `stroke-linejoin: round`
      );
      updatedStyle = updatedStyle.replace(
        /stroke-linecap:\s*[^;]+/g,
        `stroke-linecap: round`
      );

      // Add stroke properties if they don't exist
      if (!updatedStyle.includes("stroke:")) {
        updatedStyle +=
          "; stroke: #000000; stroke-width: 0.5; stroke-linejoin: round; stroke-linecap: round";
      }

      path.setAttribute("style", updatedStyle);
    } else {
      // If no style attribute, create one with stroke properties
      path.setAttribute(
        "style",
        `fill: ${color}; stroke: #000000; stroke-width: 0.5; stroke-linejoin: round; stroke-linecap: round`
      );
    }
  });

  // Don't apply colors to nested groups - let each group handle its own colors
  // This prevents color bleeding between different body parts
};

// Helper function to filter a layer by body types and their labels
export const filterLayerByBodyTypes = (
  layerElement: Element,
  selectedBodyTypes: string[],
  selectedLabelsByBodyType: Record<string, string[]>,
  layerName: string,
  characterColors: Record<string, string[]> = {}
) => {
  // Get all direct child groups (body types)
  const bodyTypeGroups = Array.from(layerElement.children).filter(
    (child) => child.tagName === "g" && child.hasAttribute("id")
  );

  bodyTypeGroups.forEach((group) => {
    const groupId = group.getAttribute("id");

    // Check if this body type is selected (case-insensitive comparison)
    const isBodyTypeSelected =
      groupId &&
      selectedBodyTypes.some(
        (selectedBodyType) =>
          selectedBodyType.toLowerCase() === groupId.toLowerCase()
      );

    if (groupId && !isBodyTypeSelected) {
      group.remove();
    } else if (groupId) {
      // If this body type is selected, filter its labels (children)
      // Find the matching body type key (case-insensitive)
      const matchingBodyTypeKey = selectedBodyTypes.find(
        (selectedBodyType) =>
          selectedBodyType.toLowerCase() === groupId.toLowerCase()
      );
      const labelsForThisBodyType = matchingBodyTypeKey
        ? selectedLabelsByBodyType[matchingBodyTypeKey] || []
        : [];

      filterLabelsInBodyType(group, labelsForThisBodyType, groupId);

      // Apply colors to this body type group
      if (Object.keys(characterColors).length > 0) {
        const colors = getColorsForBodyType(groupId, characterColors);
        if (colors.length > 0) {
          applyColorsToGroupEnhanced(group, colors);
        }
      }
    }
  });
};

// Helper function to filter labels within a body type
export const filterLabelsInBodyType = (
  bodyTypeElement: Element,
  selectedLabels: string[],
  bodyTypeName: string
) => {
  // Get all direct child groups (labels) within this body type
  const labelGroups = Array.from(bodyTypeElement.children).filter(
    (child) => child.tagName === "g" && child.hasAttribute("id")
  );

  labelGroups.forEach((labelGroup) => {
    const labelId = labelGroup.getAttribute("id");

    // Check if this label is selected (case-insensitive comparison)
    const isLabelSelected =
      labelId &&
      selectedLabels.some(
        (selectedLabel) => selectedLabel.toLowerCase() === labelId.toLowerCase()
      );

    if (labelId && !isLabelSelected) {
      labelGroup.remove();
    }
  });
};

// Function to filter SVG based on selected characters
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

    // Get colors from saved characters
    const savedColors = getSavedCharacterColors();
    // Get colors from character selection
    const selectionColors = getColorsFromCharacterSelection(characterSelection);

    // Merge colors (selection colors take priority)
    const colorsByCharacter = {
      Layer_2: { ...savedColors.Layer_2, ...selectionColors.Layer_2 },
      Layer_4: { ...savedColors.Layer_4, ...selectionColors.Layer_4 },
    };

    // Get selected body types and their labels for each character
    const selectedBodyTypes = characterSelection.reduce((acc, char) => {
      if (char.bodyType && Array.isArray(char.bodyType)) {
        acc.push(...char.bodyType);
      }
      return acc;
    }, [] as string[]);

    // Get selected labels for each character with body type mapping
    const selectedLabelsByBodyType = characterSelection.reduce(
      (acc, char) => {
        if (char.body && Array.isArray(char.body)) {
          char.body.forEach((bodyItem: any) => {
            if (bodyItem.label && bodyItem.bodyType) {
              if (!acc[bodyItem.bodyType]) {
                acc[bodyItem.bodyType] = [];
              }
              acc[bodyItem.bodyType].push(bodyItem.label);
            }
          });
        }
        return acc;
      },
      {} as Record<string, string[]>
    );

    // Flatten all selected labels for general filtering
    const selectedLabels = Object.values(selectedLabelsByBodyType).flat();

    // Process Layer_2
    const layer2 = svgElement.querySelector('g[id="Layer_2"]');
    if (layer2) {
      const layer2Colors = colorsByCharacter["Layer_2"] || {};
      filterLayerByBodyTypes(
        layer2,
        selectedBodyTypes,
        selectedLabelsByBodyType,
        "Layer_2",
        layer2Colors
      );
    }

    // Process Layer_4
    const layer4 = svgElement.querySelector('g[id="Layer_4"]');
    if (layer4) {
      const layer4Colors = colorsByCharacter["Layer_4"] || {};
      filterLayerByBodyTypes(
        layer4,
        selectedBodyTypes,
        selectedLabelsByBodyType,
        "Layer_4",
        layer4Colors
      );
    }

    // Copy stroke properties from saved characters to SVG paths
    copyStrokePropertiesFromSavedCharacters(svgElement);

    // Return the filtered SVG
    return new XMLSerializer().serializeToString(svgElement);
  } catch (error) {
    console.error("Error filtering SVG:", error);
    return svgContent;
  }
};
