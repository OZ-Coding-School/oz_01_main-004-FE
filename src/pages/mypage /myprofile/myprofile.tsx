import Button from "../../../components/Button/Button";
import styles from "./myprofile.module.css";

export default function Myprofile() {
  // interface MyprofileInput {
  //   email: string;
  //   password: string;
  //   passwordCheck: string;
  //   nickname: string;
  //   profile_image: File;
  // }
  // const {
  //   handleSubmit,
  //   register,
  //   watch,
  //   formState: { isDirty },
  //   setValue,
  // } = useForm<MyprofileInput>();
  // const onClickMypage: SubmitHandler<MyprofileInput> = async (data) => {
  //   console.log(data);
  // };
  // const [imgPreview, setImgPreview] = useState("");
  // const image = watch("profile_image");
  // useEffect(() => {
  //   if (image && image.length > 0) {
  //     const file = image[0];
  //     setImgPreview(URL.createObjectURL(file));
  //   }
  // }, [image])

  return (
    <form
      className={styles.profileContainer}
      // onSubmit={handleSubmit(onClickMypage)}
    >
      <div className={styles.profileDiv}>
        <div className={styles.profileImgContainer}>
          <div className={styles.profileImgDiv}>
            <img className={styles.profileImg} />
            <input type="file" style={{ display: "none" }} />
          </div>
          <Button size="sm" variant="secondary">
            이미지 변경
          </Button>
        </div>
        <div>
          <input placeholder="닉네임" className={styles.inputBox} />
          <input disabled className={styles.inputBox} />
          <input
            placeholder="새로운 비밀번호를 입력하세요."
            className={styles.inputBox}
          />
          <input
            placeholder="위 비밀번호와 동일하게 입력해 주세요."
            className={styles.inputBox}
          />
        </div>
      </div>
      <div>
        <Button size="sm" variant="primary">
          수정 완료
        </Button>
      </div>
    </form>
  );
}
