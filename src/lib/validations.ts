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

export const validateUpdateUserData = (name: string, email: string) => {
  const errors = {
    name: "",
    email: "",
  };

  // Validate name
  if (name.length > 50) {
    errors.name = "Name should be no more than 50 characters";
  }

  // Validate email
  // The email regex checks for the following pattern:
  // - At least one character before the "@" symbol
  // - An "@" symbol
  // - At least one character after the "@" symbol, followed by a dot "."
  // - At least one character after the dot "."
  // - No whitespace allowed in any part of the email
  // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // if (!emailRegex.test(email)) {
  //   errors.email = "Invalid email address";
  // }

  return {
    errors,
    isValid: !errors.name && !errors.email,
  };
};
