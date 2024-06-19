import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { deleteStudiesId, postPasswordConfirm } from "../../api/index";
import InputField from "../InputField";
import ModalButton from "./ModalButton";

function Modal({ nickName, name, onClick, text, page }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const handleBackgroundClick = (e) => {
    if (e.target === e.currentTarget) {
      onClick();
    }
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (data) => {
    const password = data.password;

    try {
      const payload = { id, password };
      const response = await postPasswordConfirm(payload);

      if (response.data.message === "비밀번호가 일치합니다.") {
        switch (page) {
          case "edit":
            navigate(`/studies/${id}/edit`);
            break;
          case "habit":
            navigate(`/studies/${id}/habit`);
            break;
          case "focus":
            navigate(`/studies/${id}/focus`);
            break;
          case "delete":
            await deleteStudiesId(id);
            navigate("/");
            break;
          default:
            navigate("/");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <StyledModalBackground onClick={handleBackgroundClick}>
      <StyledModalContainer onSubmit={handleSubmit(onSubmit)}>
        <StyledModalWrapper>
          <StyledModalExitText onClick={onClick}>나가기</StyledModalExitText>
          <StyledModalTitle>
            {nickName}의 {name}
          </StyledModalTitle>
          <StyledModalText>권한이 필요해요!</StyledModalText>
          <InputField
            name="password"
            label="비밀번호"
            type="password"
            autoComplete="off"
            placeholder="비밀번호를 입력해 주세요"
            register={register}
            validation={{ required: "비밀번호를 입력해 주세요" }}
            error={errors.password}
            showPassword={showPassword}
            handleEyeButton={handleShowPassword}
          />
        </StyledModalWrapper>
        <ModalButton type="submit">{text}</ModalButton>
      </StyledModalContainer>
    </StyledModalBackground>
  );
}

export default Modal;

const StyledModalBackground = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  z-index: 1;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledModalContainer = styled.form`
  width: 648px;
  height: auto;
  flex-shrink: 0;
  border-radius: 20px;
  background: #fff;
  padding: 40px 24px;
  position: relative;
`;

const StyledModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const StyledModalTitle = styled.h1`
  color: var(--black-black_414141, #414141);
  text-align: center;
  font-size: 24px;
  font-weight: 800;
`;

const StyledModalExitText = styled.span`
  color: #578246;
  position: absolute;
  top: 46px;
  right: 24px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
`;

const StyledModalText = styled.p`
  color: var(--gray-gray_818181, #818181);
  font-size: 18px;
  font-weight: 500;
  text-align: center;
`;
