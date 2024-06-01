import * as s from "superstruct";

const nickNamePattern = /^(?:[a-zA-Z0-9가-힣]{1,10})$/;
const passwordPattern = /^(?=.*[a-z])(?=.*\d)[a-z\d]{6,}$/;

const nickNameValidator = s.define('nickName', value => nickNamePattern.test(value));
const passwordValidator = s.define('password', value => passwordPattern.test(value));
const nameValidator = s.define('name', value => typeof value === 'string' && value.length <= 10);

export const CheckPassword = s.object({
  password : passwordValidator,
})

export const CreateStudy = s.object({
  name: nameValidator,             
  nickName: nickNameValidator, 
  description: s.string(),     
  background : s.string(),
  password: passwordValidator, 
});

export const PatchStudy = s.partial(CreateStudy)

export const CreateHabit = s.object({
  name : s.string(),
})

export const PatchHabit = s.object({
  name : s.optional(s.string()),
  isCompleted : s.optional(s.boolean()),
})

export const CreateReaction = s.object({
  emoji : s.string(),
  emojiType : s.string(),
  studiesId : s.integer(),
})

export const CreatePoint = s.object({
  additionalPoints : s.min(s.integer(), 0),
})
