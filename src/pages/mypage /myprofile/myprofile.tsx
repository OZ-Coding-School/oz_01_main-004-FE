import { useEffect } from "react";
import { useForm } from "react-hook-form";
import instance from "../../../api/axios";
import Button from "../../../components/Button/Button";
import Input from "../../../components/Input/Input";
import styles from "./myprofile.module.css";

export default function Myprofile() {
  // interface MyprofileInput {
  //   email: string;
  //   password: string;
  //   passwordCheck: string;
  //   nickname: string;
  // }
  const {
    handleSubmit,
    // formState: { isDirty },
    setValue,
  } = useForm({
    defaultValues: {
      image: null,
      password: "",
      nickname: "",
      email: "",
    },
  });
  const onClickMypage = async (data: any) => {
    console.log(data);
  };
  // const [imgPreview, setImgPreview] = useState("");
  // const image = watch("profile_image");
  // useEffect(() => {
  //   if (image && image.length > 0) {
  //     const file = image[0];
  //     setImgPreview(URL.createObjectURL(file));
  //   }
  // }, [image])

  useEffect(() => {
    async function getData() {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
            "Content-Type": "application/json",
          },
        };
        const response = await instance.get("users/detail/", config);
        setValue("email", response.data.email);
        setValue("nickname", response.data.nickname);
        console.log(setValue);
      } catch (error) {
        console.error("error", error);
      }
    }
    getData();
  }, []);

  return (
    <div className={styles.bigContainer}>
      <form
        className={styles.profileContainer}
        onSubmit={handleSubmit(onClickMypage)}
      >
        <div className={styles.profileDiv}>
          <div className={styles.profileImgContainer}>
            <div className={styles.profileImgDiv}>
              <img
                className={styles.profileImg}
                src="/Users/hanchaewon/Desktop/main-project/oz_01_main-004-FE/public/mypage/basicprofile.png"
              />
              <input type="file" style={{ display: "none" }} />
            </div>
            <Button size="sm" variant="secondary">
              이미지 변경
            </Button>
          </div>
          <div className="inputDiv">
            <Input
              inputSize="sm"
              variant="primary"
              placeholder="닉네임"
              style={{ marginBottom: "30px" }}
            />
            <Input
              inputSize="sm"
              variant="primary"
              style={{ backgroundColor: "#dad9d9", marginBottom: "30px" }}
              disabled
            />
            <Input
              inputSize="sm"
              variant="primary"
              placeholder="새로운 비밀번호를 입력하세요."
              style={{ marginBottom: "30px" }}
            />
            <Input
              inputSize="sm"
              variant="primary"
              placeholder="위 비밀번호와 동일하게 입력해 주세요."
              style={{ marginBottom: "30px" }}
            />
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
