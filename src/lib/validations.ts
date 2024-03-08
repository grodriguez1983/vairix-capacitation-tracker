import { OfficeType } from "@/types/offices";

export const validateOfficeData = (name: string, type: string) => {
  const errors = {
    name: "",
    type: "",
  };

  // Validate name
  if (!name) {
    errors.name = "Name is required";
  } else if (name.length > 15) {
    errors.name = "Name should be no more than 15 characters";
  }

  // Validate type
  const validTypes = Object.values(OfficeType) as string[];
  if (!type) {
    errors.type = "Type is required";
  } else if (!validTypes.includes(type)) {
    errors.type = `Types available: ${validTypes.join(", ")}.`;
  }

  return {
    errors,
    isValid: !errors.name && !errors.type,
  };
};

export const validateUpdateOfficeData = (name: string, type: string) => {
  const errors = {
    name: "",
    type: "",
  };

  // Validate name
  if (name.length > 15) {
    errors.name = "Name should be no more than 15 characters";
  }

  // Validate type
  const validTypes = Object.values(OfficeType) as string[];
  if (!type) {
    errors.type = "Type is required";
  } else if (!validTypes.includes(type)) {
    errors.type = `Types available: ${validTypes.join(", ")}.`;
  }

  return {
    errors,
    isValid: !errors.name && !errors.type,
  };
};
