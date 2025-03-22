// src/store/useFormStore.js
import { create } from "zustand";

export const useFormStore = create((set) => ({
  formData: {
    name: "",
    email: "",
    ageGroup: "",
    subject: "",
    learningReasons: [],
    estimatedDays: "",
    studyFormats: [],
    aiFeedback: false,
    structuredSchedule: false,
  },
  setFormData: (data) => set({ formData: data }),
}));