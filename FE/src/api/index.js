import instance from "./axiosInstance";

export const getStudies = async ({
  search = "",
  offset = 0,
  limit = 6,
  view = "newest",
}) => {
  return await instance.get(
    `/studies?search=${search}&limit=${limit}&offset=${offset}&view=${view}`
  );
};

export const postStudies = async ({
  name,
  description,
  nickName,
  password,
  background,
}) => {
  return await instance.post("/studies", {
    name,
    description,
    nickName,
    password,
    background,
  });
};

export const getStudiesId = async (id) => {
  return await instance.get(`/studies/${id}`);
};

export const deleteStudiesId = async (id) => {
  return await instance.delete(`/studies/${id}`);
};

export const postPasswordConfirm = async ({ id, password }) => {
  return await instance.post(`/studies/${id}/userCheck`, { password });
};

export const getStudyIdHabit = async (id) => {
  return await instance.get(`/studies/${id}/habit`);
};

export const postStudiesHabit = async ({ id, name }) => {
  return await instance.post(`/studies/${id}/habit`, { name });
};

export const patchHabits = async (id) => {
  return await instance.patch(`/habits/${id}`, {
    isCompleted: true,
  });
};

export const deleteHabits = async (id) => {
  return instance.delete(`/habits/${id}`);
};

export const postStudyIdPoints = async (id, points) => {
  return instance.post(`/${id}/points`, {
    additionalPoints: points,
  });
};
