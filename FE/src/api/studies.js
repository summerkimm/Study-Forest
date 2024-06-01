import instance from "./axiosInstance";

// export const getStudies = async ({
//   search = "",
//   offset = 0,
//   limit = 6,
//   view = "newest",
// }) => {
//   return await instance.get(
//     `/studies?search=${search}&limit=${limit}&offset=${offset}&view=${view}`
//   );
// };

export const getStudies = async () => {
  return await instance.get("/studies");
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

export const postPasswordConfirm = async ({ id, password }) => {
  console.log(id, password);
  return await instance.post(`/studies/${id}/user`, {
    password,
  });
};
