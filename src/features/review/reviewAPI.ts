import apiClient from "@/services/apiClient";

const reviewAPI = {
  submitReview: async (formData: FormData) => {
    const response = await apiClient.post("/reviews/add", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  updateReview: async (reviewId: string, formData: FormData) => {
    const response = await apiClient.put(
      `/reviews/edit/${reviewId}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  },

  getReview: async (reviewId: string) => {
    const response = await apiClient.get(`/reviews/${reviewId}`);
    return response.data;
  },

  deleteReview: async (reviewId: string) => {
    const response = await apiClient.delete(`/reviews/delete/${reviewId}`);
    return response.data;
  },
};

export default reviewAPI;
