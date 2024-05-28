import { ErrorMessage } from "@hookform/error-message";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import instance from "../../api/axios";
import Button from "../../components/Button/Button";
import styles from "./index.module.css";

const SignUp: React.FC = () => {
  interface IFormInput {
    email: string;
    password: string;
    passwordCheck: string;
    nickname: string;
  }
  const {
    register,
    handleSubmit,
    watch,
    setError,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<IFormInput>({
    mode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
      passwordCheck: "",
      nickname: "",
    },
  });

  const [, setEmailValid] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [eyeIcon, setEyeIcon] = useState(false);
  const navigate = useNavigate();
  const handleSignUpSuccess = () => {
    navigate("/login");
  };
  const handleEmailChange = (value: string) => {
    setEmailValid(null);
    setValue("email", value);
  };

  const checkEmailDuplicate = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();
    setLoading(true);
    try {
      const email = getValues("email"); // Get the email value directly
      if (email) {
        const response = await instance.post("users/email-check/", {
          email,
        });
        setEmailValid(response.data.is_valid);
        if (response.data.is_valid) {
          setError("email", {
            type: "manual",
            message: "사용가능한 이메일 입니다.",
          });
        }
        // alert("사용가능한 이메일 입니다.");
      }
      setLoading(true);
    } catch (error: any) {
      if (error.response && error.response.status === 409) {
        setEmailValid(false);
        setError("email", {
          type: "manual",
          message: "이미 사용중인 이메일 입니다.",
        });
        setLoading(false);
      } else {
        console.error("checking email", error);
        setLoading(false);
      }
    }
  };

  //등록하기 함수
  const onClickSignup: SubmitHandler<IFormInput> = async (data) => {
    try {
      const signBody = {
        email: data.email,
        password: data.password,
        nickname: data.nickname,
      };
      await instance.post("users/sign-up/", signBody);
      alert("어서오세요!");
      handleSignUpSuccess();
    } catch (error) {
      alert(error);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
    setEyeIcon(!eyeIcon);
  };

  return (
    <div className={styles.container}>
      <div className={styles.layout}>
        <h1>회원가입하고 레시피를 공유해보세요!</h1>
        <form onSubmit={handleSubmit(onClickSignup)}>
          <div className={styles.emailDiv}>
            <div className={styles.title}>이메일</div>
            <div className={styles.emailInput}>
              <input
                className={styles.emailBox}
                placeholder="이메일ID를 입력해주세요."
                type="text"
                id="email"
                {...register("email", {
                  required: true,
                  pattern: {
                    value:
                      /^[A-Za-z0-9_]+[A-Za-z0-9]*[@]{1}[A-Za-z0-9]+[A-Za-z0-9]*[.]{1}[A-Za-z]{1,3}$/,
                    message: "이메일의 형식이 올바르지 않습니다.",
                  },
                  onChange: (e) => handleEmailChange(e.target.value),
                })}
              />
              <Button
                size="md"
                variant="primary"
                onClick={checkEmailDuplicate}
                disabled={loading}
              >
                {loading ? "확인완료" : "중복확인"}
              </Button>
            </div>
            <ErrorMessage
              errors={errors}
              name="email"
              render={({ message }) => <Message>{message}</Message>}
            />
          </div>
          <div className={styles.inputDiv}>
            <div className={styles.title}>비밀번호</div>
            <PasswordInputContainer>
              <input
                className={styles.inputBox}
                placeholder="영문,숫자,특수문자가 포함된 8~16자리 이내"
                type={showPassword ? "text" : "password"}
                id="password"
                {...register("password", {
                  required: true,
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
            </PasswordInputContainer>
            <ErrorMessage
              errors={errors}
              name="password"
              render={({ message }) => <Message>{message}</Message>}
            />
          </div>
          <div className={styles.inputDiv}>
            <div className={styles.title}>비밀번호 확인</div>
            <PasswordInputContainer>
              <input
                className={styles.inputBox}
                placeholder="위 비밀번호와 동일하게 입력해 주세요."
                type={showPassword ? "text" : "password"}
                id="passwordCheck"
                {...register("passwordCheck", {
                  required: true,
                  validate: (value) =>
                    value === watch("password")
                      ? true
                      : "비밀번호를 확인해 주세요.",
                })}
              />
              <EyeIcon
                onClick={toggleShowPassword}
                as={eyeIcon ? IoMdEye : IoMdEyeOff}
              />
            </PasswordInputContainer>
            <ErrorMessage
              errors={errors}
              name="passwordCheck"
              render={({ message }) => <Message>{message}</Message>}
            />
          </div>
          <div className={styles.inputDiv}>
            <div className={styles.title}>닉네임</div>
            <input
              className={styles.inputBox}
              placeholder="닉네임을 입력해주세요."
              type="text"
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
          </div>
          <Button
            size="lg"
            variant="primary"
            style={{ marginTop: "60px", width: "491px" }}
          >
            가입완료
          </Button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;

const Message = styled.p`
  width: 449px;
  color: red;
  margin: 3px 0 0 3px;
`;

const PasswordInputContainer = styled.div`
  position: relative;
`;
const EyeIcon = styled(IoMdEyeOff)`
  position: absolute;
  top: 48%;
  right: 10px;
  transform: translateY(-50%);
  cursor: pointer;
`;
