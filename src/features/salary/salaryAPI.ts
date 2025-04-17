// src/features/salary/salaryAPI.ts
import apiClient from "@/services/apiClient";

const salaryAPI = {
  submitSalary: async (formData: FormData) => {
    const response = await apiClient.post("/salary/add", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },
};

export default salaryAPI;