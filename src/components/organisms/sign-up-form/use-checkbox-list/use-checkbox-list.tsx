import { useEffect, useState } from "react";

export const useCheckboxList = () => {
  const [categoryValues, setCategoryValues] = useState<string[]>([]);
  const [categoriesErrorMessage, setCategoriesErrorMessage] =
    useState<string>("");

  const handleCategoriesChange = (value: string, checked: boolean) => {
    setCategoryValues((prevCategoryValues) => {
      const newCategoryValues = checked
        ? [...prevCategoryValues, value]
        : prevCategoryValues.filter((v) => v !== value);
      return newCategoryValues;
    });
  };

  const handleCheckboxClick = (e: Event) => {
    const target = e.target as HTMLElement;
    const value = target.getAttribute("value");
    const checked = target.getAttribute("checked"); 

    if (value) {
      handleCategoriesChange(value, checked === "true" ? false : true);
    }
  };

  useEffect(() => {
    const checkboxes = document.querySelectorAll(
      ".sign-up-form__categories-list .sign-up-form__categories-checkbox"
    );
    checkboxes.forEach((checkbox) => {
      checkbox.addEventListener("click", handleCheckboxClick);
    });

    return () => {
      checkboxes.forEach((checkbox) => {
        checkbox.removeEventListener("click", handleCheckboxClick);
      });
    };
  }, []);

  useEffect(() => {
    if (categoryValues.length < 3) {
      setCategoriesErrorMessage("Debe seleccionar al menos 3 categorías.");
    } else {
      setCategoriesErrorMessage("");
    }
  }, [categoryValues]);

  return {
    categoryValues,
    categoriesErrorMessage,
  };
};
