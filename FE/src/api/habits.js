import axios from "axios";

export const patchHabits = async (id) => {
  return await axios.patch(`/habits/${id}`, {
    isCompleted: true,
  });
};

export const deleteHabits = async (id) => {
  return axios.delete(`/habits/${id}`);
}
