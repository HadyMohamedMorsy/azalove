// Helper function to get colors from saved characters
export const getSavedCharacterColors = () => {
  try {
    const savedCouples = localStorage.getItem("savedCouples");
    if (!savedCouples) return {};

    const couples = JSON.parse(savedCouples);
    const latestCouple = couples[couples.length - 1];
    if (!latestCouple) return {};

    return {
      Layer_2: extractColorsFromLayers(latestCouple.character1 || []),
      Layer_4: extractColorsFromLayers(latestCouple.character2 || []),
    };
  } catch (error) {
    console.error("Error getting saved colors:", error);
    return {};
  }
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

  // Remove old styles
  groupElement.querySelectorAll("*").forEach((element) => {
    element.removeAttribute("style");
  });

  // Apply colors to paths
  const paths = groupElement.querySelectorAll("path");
  paths.forEach((path, index) => {
    const color = colors[index % colors.length];
    path.setAttribute("fill", color);
  });
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
          applyColorsToGroup(group, colors);
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
    const colorsByCharacter = getSavedCharacterColors();
    console.log("Saved character colors:", colorsByCharacter);

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

    // Return the filtered SVG
    return new XMLSerializer().serializeToString(svgElement);
  } catch (error) {
    console.error("Error filtering SVG:", error);
    return svgContent;
  }
};
