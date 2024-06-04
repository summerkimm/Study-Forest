import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";
import { postStudies } from "../api/index";
import Image1 from "../assets/images/image-card1.png";
import Image2 from "../assets/images/image-card2.png";
import Image3 from "../assets/images/image-card3.png";
import Image4 from "../assets/images/image-card4.png";
import InputField from "../components/InputField";
import RadioField from "../components/RadioField";
import { onMobile, onTablet } from "../styles/media-queries";

const backgroundOptions = [
  { value: "green" },
  { value: "yellow" },
  { value: "sky_blue" },
  { value: "pink" },
  { value: "image_1", src: Image1 },
  { value: "image_2", src: Image2 },
  { value: "image_3", src: Image3 },
  { value: "image_4", src: Image4 },
];

function CreateStudyPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [selectedBackground, setSelectedBackground] = useState("");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      nickName: "",
      name: "",
      description: "",
      password: "",
      background: "",
    },
  });

  const handleBackgroundChange = (value) => {
    setSelectedBackground(value);
  };

  const passwordCheck = watch("password");

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleShowPasswordConfirm = () => {
    setShowPasswordConfirm(!showPasswordConfirm);
  };

  const handleOnSubmit = async (data) => {
    const dataWithBackground = { ...data, background: selectedBackground };

    const { name, background, description, password, nickName } =
      dataWithBackground;

    try {
      const response = await postStudies({
        name,
        nickName,
        description,
        background,
        password,
      });

      if (response.status === 201) {
        const newId = response?.data.id;
        navigate(`/studies/${newId}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <StyledContainer onSubmit={handleSubmit(handleOnSubmit)}>
      <StyledTitle>스터디 만들기</StyledTitle>
      <InputField
        name="nickName"
        type="text"
        label="닉네임"
        placeholder="닉네임을 입력해 주세요"
        register={register}
        validation={{
          required: "*닉네임을 입력해 주세요",
          maxLength: {
            value: 10,
            message: "*최대 10자까지 입력할 수 있습니다",
          },
        }}
        error={errors.nickName}
      />
      <InputField
        name="name"
        type="text"
        label="이름"
        placeholder="스터디 이름을 입력해 주세요"
        register={register}
        validation={{
          required: "*스터디 이름을 입력해 주세요",
          maxLength: {
            value: 10,
            message: "*최대 10자까지 입력할 수 있습니다",
          },
        }}
        error={errors.name}
      />
      <StyledTextAreaContainer>
        <StyledLabel>소개</StyledLabel>
        <StyledTextArea
          name="description"
          {...register("description", {
            required: "*소개 멘트를 작성해 주세요",
            maxLength: {
              value: 200,
              message: "*최대 200자까지 입력할 수 있습니다",
            },
          })}
          placeholder="소개 멘트를 작성해 주세요"
          hasError={!!errors.description}
        />
        {errors.description && (
          <StyledErrorMessage>{errors.description.message}</StyledErrorMessage>
        )}
      </StyledTextAreaContainer>
      <StyledLabel>배경을 선택해 주세요</StyledLabel>
      <StyledBackgroundContainer>
        {backgroundOptions.map((option) => (
          <RadioField
            key={option.value}
            register={register}
            name="background"
            value={option.value}
            src={option.src}
            validation={{ required: "*배경을 선택해 주세요" }}
            error={errors.background}
            isSelected={selectedBackground === option.value}
            onChange={() => handleBackgroundChange(option.value)}
          />
        ))}
      </StyledBackgroundContainer>
      {errors.background && (
        <StyledErrorMessage>{errors.background.message}</StyledErrorMessage>
      )}
      <InputField
        name="password"
        type="password"
        label="비밀번호"
        autoComplete="off"
        placeholder="비밀번호를 입력해 주세요"
        register={register}
        validation={{
          required: "*비밀번호를 입력해 주세요",
          pattern: {
            value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
            message:
              "*영어와 숫자를 포함한 6자 이상의 비밀번호를 입력해 주세요",
          },
        }}
        error={errors.password}
        showPassword={showPassword}
        handleEyeButton={handleShowPassword}
      />
      <InputField
        name="passwordConfirm"
        type="password"
        label="비밀번호 확인"
        autoComplete="off"
        placeholder="비밀번호를 다시 한 번 입력해 주세요"
        register={register}
        validation={{
          required: "*비밀번호를 다시 한 번 입력해 주세요",
          validate: (value) =>
            value === passwordCheck || "*비밀번호가 일치하지 않습니다",
        }}
        error={errors.passwordConfirm}
        showPassword={showPasswordConfirm}
        handleEyeButton={handleShowPasswordConfirm}
      />

      <button type="submit">만들기</button>
    </StyledContainer>
  );
}

export default CreateStudyPage;

const StyledContainer = styled.form`
  margin: 40px auto 0 auto;
  width: 696px;
  height: auto;
  border-radius: 20px;
  background: #fff;

  display: flex;
  padding: 24px 24px 40px 24px;
  flex-direction: column;
  align-items: flex-start;
  gap: 24px;

  ${onTablet} {
    margin: 20px auto 0 auto;
  }

  ${onMobile} {
    width: 344px;
    padding: 16px 16px 20px 16px;
    margin: 20px auto 0 auto;
  }
`;

const StyledTitle = styled.h1`
  color: #414141;
  font-size: 24px;
  font-weight: 800;

  ${onMobile} {
    font-size: 16px;
  }
`;

const StyledTextAreaContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const StyledLabel = styled.label`
  color: #414141;
  font-size: 18px;
  font-weight: 600;

  ${onMobile} {
    font-size: 16px;
  }
`;

const StyledTextArea = styled.textarea`
  width: 100%;
  height: 98px;
  border-radius: 15px;
  border: 1px solid var(--gray-gray_DDDDDD, #ddd);
  background: #fff;
  padding: 15px 20px;
  resize: none;

  color: var(--gray-gray_818181, #818181);
  font-size: 16px;
  font-weight: 400;
  overflow-y: auto;

  ${(props) =>
    props.hasError &&
    css`
      border-color: var(--red-error_C41013, #c41013);
    `}

  ${onMobile} {
    font-size: 14px;
  }
`;

const StyledBackgroundContainer = styled.div`
  width: 100%;
  height: auto;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;

  ${onMobile} {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const StyledErrorMessage = styled.p`
  color: var(--red-error_C41013, #c41013);
  font-size: 14px;
  font-weight: 400;
  margin-top: -8px;
`;
