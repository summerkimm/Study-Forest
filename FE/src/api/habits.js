import axios from "axios";

export const patchHabits = async (id) => {
  return await axios.patch(`/habits/${id}`, {
    isCompleted: true,
  });
};
