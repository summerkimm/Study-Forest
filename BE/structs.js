import * as s from "superstruct";

const nickNamePattern = /^(?:[a-zA-Z]+|[가-힣]+|\d+)$/;
const passwordPattern = /^(?=.*[a-z])(?=.*\d)[a-z\d]{6,}$/;

const nickNameValidator = s.define('nickName', value => nickNamePattern.test(value));
const passwordValidator = s.define('password', value => passwordPattern.test(value));

export const CreateStudy = s.object({
  name: s.string(),           
  nickName: nickNameValidator, 
  description: s.string(),     
  background : s.string(),
  password: passwordValidator, 
});

export const PatchStudy = s.partial(CreateStudy)

export const CreateHabit = s.object({
  name : s.string(),
})

export const CreateReaction = s.object({
  emoji : s.string(),
  emojiType : s.string()
})