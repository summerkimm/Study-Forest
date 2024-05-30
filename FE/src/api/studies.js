import instance from "./axiosInstance";

export const postStudies = async ({
  name,
  description,
  nickName,
  password,
  background,
}) => {
  return await instance.post(`/studies`, {
    name,
    description,
    nickName,
    password,
    background,
  });
};
