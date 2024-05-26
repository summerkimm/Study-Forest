import { useState } from "react";
import styled from "styled-components";
import Image1 from "../assets/images/image-card1.png";
import Image2 from "../assets/images/image-card2.png";
import Image3 from "../assets/images/image-card3.png";
import Image4 from "../assets/images/image-card4.png";
import Input from "../components/Input";
import color from "../styles/colors";

function CreateStudyPage() {
  const [formData, setFormData] = useState({
    name: "",
    nickName: "",
    description: "",
    background: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleClickBackground = (selectedBackground) => {
    setFormData({
      ...formData,
      background: selectedBackground,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <StyledContainer>
        <StyledTitle>스터디 만들기</StyledTitle>
        <Input
          name="nickName"
          label="닉네임"
          type="text"
          placeholder="닉네임을 입력해 주세요"
          value={formData.nickName}
          onChange={handleChange}
        />
        <Input
          name="name"
          label="스터디 이름"
          type="text"
          placeholder="닉네임을 입력해 주세요"
          value={formData.name}
          onChange={handleChange}
        />
        <StyledTextAreaContainer>
          <StyledLabel>소개</StyledLabel>
          <StyledTextArea
            name="description"
            value={formData.description}
            placeholder="소개 멘트를 작성해 주세요"
            onChange={handleChange}
          />
        </StyledTextAreaContainer>
        <StyledLabel>배경을 선택해 주세요</StyledLabel>
        <StyledBackgroundContainer>
          <StyledBackgroundImage
            onClick={() => handleClickBackground("image-1")}
          >
            <img src={Image1} alt="배경이미지1" />
          </StyledBackgroundImage>
          <StyledBackgroundImage
            onClick={() => handleClickBackground("image-2")}
          >
            <img src={Image2} alt="배경이미지2" />
          </StyledBackgroundImage>
          <StyledBackgroundImage
            onClick={() => handleClickBackground("image-3")}
          >
            <img src={Image3} alt="배경이미지3" />
          </StyledBackgroundImage>
          <StyledBackgroundImage
            onClick={() => handleClickBackground("image-4")}
          >
            <img src={Image4} alt="배경이미지4" />
          </StyledBackgroundImage>
          <StyledBackgroundDiv
            style={{ background: `${color.green}` }}
            onClick={() => handleClickBackground("green")}
          ></StyledBackgroundDiv>
          <StyledBackgroundDiv
            style={{ background: `${color.pink}` }}
            onClick={() => handleClickBackground("pink")}
          ></StyledBackgroundDiv>
          <StyledBackgroundDiv
            style={{ background: `${color.blue}` }}
            onClick={() => handleClickBackground("sky-blue")}
          ></StyledBackgroundDiv>
          <StyledBackgroundDiv
            style={{ background: `${color.yellow}` }}
            onClick={() => handleClickBackground("yellow")}
          ></StyledBackgroundDiv>
        </StyledBackgroundContainer>
        <Input
          name="password"
          label="비밀번호"
          type="password"
          placeholder="비밀번호를 입력해 주세요"
          value={formData.password}
          onChange={handleChange}
        />
        <Input
          label="비밀번호 확인"
          type="password"
          placeholder="비밀번호를 다시 한 번 입력해 주세요"
        />
        <button type="submit">만들기</button>
      </StyledContainer>
    </form>
  );
}

export default CreateStudyPage;

const StyledContainer = styled.div`
  margin: 0 auto;
  width: 700px;
  height: auto;
  border-radius: 20px;
  background: #fff;

  display: flex;
  padding: 24px 24px 40px 24px;
  flex-direction: column;
  align-items: flex-start;
  gap: 24px;
`;

const StyledTitle = styled.h1`
  color: #414141;
  font-size: 24px;
  font-weight: 800;
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
`;

const StyledTextArea = styled.textarea`
  width: 100%;
  height: 98px;
  border-radius: 15px;
  border: 1px solid var(--gray-gray_DDDDDD, #ddd);
  background: #fff;
  padding: 15px 20px;
  box-sizing: border-box;
  resize: none;

  color: var(--gray-gray_818181, #818181);
  font-size: 16px;
  font-weight: 400;
`;

const StyledBackgroundContainer = styled.div`
  width: 100%;
  height: auto;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
`;

const StyledBackgroundDiv = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 16px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  cursor: pointer;
`;

const StyledBackgroundImage = styled(StyledBackgroundDiv)`
  overflow: hidden;
`;
