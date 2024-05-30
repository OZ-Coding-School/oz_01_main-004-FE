export const onlyAccessHeaders = {
  headers: {
    Authorization: `Bearer ${localStorage.getItem("access")}`,
  },
};

export const headers = {
  headers: {
    Authorization: `Bearer ${localStorage.getItem("access")}`,
    "Content-Type": "application/json",
  },
};

export const multiPartHeaders = {
  headers: {
    Authorization: `Bearer ${localStorage.getItem("access")}`,
    "Content-Type": "multipart/form-data",
  },
};
