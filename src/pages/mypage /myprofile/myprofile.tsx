import { ErrorMessage } from "@hookform/error-message";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import styled from "styled-components";
import instance from "../../../api/axios";
import Button from "../../../components/Button/Button";
import Input from "../../../components/Input/Input";
import styles from "./myprofile.module.css";

export default function Myprofile() {
  interface MyprofileInput {
    email: string;
    password: string;
    passwordCheck: string;
    nickname: string;
    profile_image: string;
  }
  const {
    handleSubmit,
    register,
    formState: { errors },
    watch,
    setValue,
  } = useForm<MyprofileInput>({
    mode: "onBlur",
  });

  //데이터수정하기
  const onClickMypage: SubmitHandler<MyprofileInput> = async (data) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access")}`,
          "Content-Type": "application/json",
        },
      };
      const signBody = {
        email: data.email,
        password: data.password,
        nickname: data.nickname,
      };
      await instance.put("users/detail/", signBody, config);
      alert("수정완료했습니다.");
    } catch (error) {
      console.error("error", error);
      // if (error.response) {
      //   if (error.response.status >= 400 && error.response.status < 500) {
      //     let errorMessage = error.response.data.message || "error occured";
      //     alert(`Error ${error.response.status}: ${errorMessage}`);
      //   } else {
      //     alert(`Server Error: ${error.response.status}`);
      //   }
      // } else {
      //   alert(`Network Error: ${error.message}`);
      // }
    }
  };

  //데이터 가져오기
  const getUser = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access")}`,
          "Content-Type": "application/json",
        },
      };
      const response = await instance.get("users/detail/", config);
      return response.data.user;
    } catch (error) {
      console.error("error", error);
      return {};
    }
  };
  const { data } = useQuery({
    queryKey: ["users"],
    queryFn: getUser,
    // 기본값을 설정하여 undefined 반환을 방지
    initialData: {},
  });

  useEffect(() => {
    if (data) {
      const { email, nickname, password, profile_image } = data as {
        email: string;
        nickname: string;
        password: string;
        profile_image: string;
      };
      setValue("email", email);
      setValue("nickname", nickname);
      setValue("password", password);
      setValue("profile_image", profile_image);
    }
  }, [data, setValue]);

  const [userImage, setUserImage] = useState<string | null>(null);
  const [, setPutUserImage] = useState(null);
  const defaultImg = "../public/mypage/basicProfile.jpg";

  //이미지 바꿔주기
  const handleImageChange = async (e: any) => {
    const file = e.target.files[0];
    setPutUserImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === "string") {
          localStorage.setItem("profile_image", reader.result);
          setUserImage(reader.result);
        }
      };
      reader.readAsDataURL(file);

      const imgformData = new FormData();
      imgformData.append("profile_image", file);

      try {
        const imgconfig = {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
            "Content-Type": "multipart/form-data",
          },
        };
        await instance.patch("users/profile-image/", imgformData, imgconfig);
      } catch (error) {
        console.error("img error", error);
      }
    }
  };

  const handleImgClick = () => {
    const fileInput = document.getElementById(
      "profileImageInput",
    ) as HTMLInputElement | null;
    if (fileInput) {
      fileInput.click();
    }
  };
  useEffect(() => {
    // Retrieve image URL from local storage upon component mount
    const storedImage = localStorage.getItem("profile_image");
    if (storedImage) {
      // 만약 로컬 스토리지에 이미지 URL이 존재한다면, 그 URL을 상태에 반영하거나 필요한 처리를 수행할 수 있습니다.
      setUserImage(storedImage);
    }
  }, []);

  const [showPassword, setShowPassword] = useState(false);
  const [eyeIcon, setEyeIcon] = useState(false);
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
    setEyeIcon(!eyeIcon);
  };

  return (
    <div className={styles.bigContainer}>
      <form
        className={styles.profileContainer}
        onSubmit={handleSubmit(onClickMypage)}
      >
        <div className={styles.profileDiv}>
          <div className={styles.profileImgContainer}>
            <div className={styles.profileImgDiv} onClick={handleImgClick}>
              <img
                className={styles.profileImg}
                src={userImage ? userImage : defaultImg}
                alt="프로필 이미지"
                {...register("profile_image")}
              />
              <input
                type="file"
                style={{ display: "none" }}
                accept="image/*"
                id="profileImageInput"
                {...register("profile_image")}
                onChange={handleImageChange}
              />
            </div>
            <div className={styles.imageBtn}>
              <Button
                type="button"
                size="sm"
                variant="secondary"
                onClick={handleImgClick}
              >
                이미지 변경
              </Button>
            </div>
          </div>
          <div className={styles.inputDiv}>
            <InputContainer>
              <Input
                inputSize="sm"
                variant="primary"
                placeholder="닉네임을 입력하세요."
                type="text"
                style={{ marginBottom: "30px" }}
                {...register("nickname", {
                  required: true,
                  maxLength: {
                    value: 8,
                    message: "8글자 이내로 입력해주세요.",
                  },
                  pattern: {
                    value: /^[ㄱ-ㅎ가-힣a-zA-Z0-9]{1,8}$/,
                    message: "특수문자는 사용하실 수 없습니다.",
                  },
                })}
              />
              <ErrorMessage
                errors={errors}
                name="nickname"
                render={({ message }) => <Message>{message}</Message>}
              />
            </InputContainer>
            <Input
              inputSize="sm"
              variant="primary"
              style={{ backgroundColor: "#dad9d9", marginBottom: "30px" }}
              disabled
              {...register("email")}
            />
            <InputContainer>
              <Input
                inputSize="sm"
                variant="primary"
                placeholder="비밀번호를 입력하세요."
                type={showPassword ? "text" : "password"}
                style={{ marginBottom: "30px" }}
                {...register("password", {
                  pattern: {
                    value:
                      /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/,
                    message: "영문,숫자,특수문자 조합 8자리 이상 입력해주세요.",
                  },
                  deps: ["passwordCheck"],
                })}
              />
              <EyeIcon
                onClick={toggleShowPassword}
                as={eyeIcon ? IoMdEye : IoMdEyeOff}
              />
              <ErrorMessage
                errors={errors}
                name="password"
                render={({ message }) => <Message>{message}</Message>}
              />
            </InputContainer>
            <InputContainer>
              <Input
                inputSize="sm"
                variant="primary"
                placeholder="위 비밀번호와 동일하게 입력해 주세요."
                type={showPassword ? "text" : "password"}
                style={{ marginBottom: "30px" }}
                {...register("passwordCheck", {
                  validate: (value) => {
                    const password = watch("password");
                    if (password) {
                      return value === password || "비밀번호를 확인해주세요.";
                    }
                    return true;
                  },
                })}
              />
              <EyeIcon
                onClick={toggleShowPassword}
                as={eyeIcon ? IoMdEye : IoMdEyeOff}
              />
              <ErrorMessage
                errors={errors}
                name="passwordCheck"
                render={({ message }) => <Message>{message}</Message>}
              />
            </InputContainer>
          </div>
        </div>
        <div className={styles.updateBtnDiv}>
          <Button size="sm" variant="primary">
            수정 완료
          </Button>
        </div>
      </form>
    </div>
  );
}

const Message = styled.p`
  width: 449px;
  color: red;
  margin: -25px 0 0 3px;
  font-size: 0.9rem;
`;

const InputContainer = styled.div`
  display: block;
  height: 75px;
  position: relative;
`;
const EyeIcon = styled(IoMdEyeOff)`
  position: absolute;
  top: 30%;
  right: 10px;
  transform: translateY(-50%);
  cursor: pointer;
`;
