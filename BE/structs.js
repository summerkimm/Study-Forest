import * as s from "superstruct";
import isUuid from 'is-uuid';

const Uuid = s.define('Uuid', (value) => isUuid.v4(value));

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

export const CreateReaction = s.object({
  emoji : s.string(),
  emojiType : s.string(),
  studiesId : Uuid,
})

export const CreatePoint = s.object({
  additionalPoints : s.min(s.integer(), 0),
})
