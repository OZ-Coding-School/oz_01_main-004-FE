import Quill from "quill";
import "quill/dist/quill.bubble.css";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import { useEffect, useRef, useState } from "react";
import { LuUpload } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import instance from "../../api/axios";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import Dropdown from "../../components/category/dropdown";
import TagButton from "../../components/tagbutton/tagbutton";
import { FoodIngredients, FoodTypes } from "../community/fooddata.api";
import styles from "./index.module.css";

interface FormState {
  thumbnail: File | null;
  title: string | "";
  content: string | "";
  food_type: number | null;
  food_ingredient: number | null;
  level: string | null;
}
export default function WritePost() {
  const quillRef = useRef<Quill>();
  const [, setQuillHtml] = useState("");
  const navigate = useNavigate();
  const [uuid_list, setUuid_list] = useState<string[]>([]);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const [formState, setFormState] = useState<FormState>({
    thumbnail: null,
    title: "",
    content: "",
    food_type: null,
    food_ingredient: null,
    level: null,
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string,
  ) => {
    setFormState((prevState) => ({
      ...prevState,
      [field]: e.target.value,
    }));
  };

  const handleSelect = (
    item: { id: any; name?: string; img?: string },
    type: string,
  ) => {
    setFormState((prevState) => ({
      ...prevState,
      [type]: item.id,
    }));
  };

  const tags = ["하수", "중수", "고수"];
  const handleTagSelect = (selectedTag: string | null) => {
    setSelectedTag(selectedTag);
    setFormState((prevState) => ({
      ...prevState,
      level: selectedTag,
    }));
  };

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation();
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  const handleImgChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviewUrl(URL.createObjectURL(file));
        setFormState((prevState) => ({
          ...prevState,
          thumbnail: file,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    if (!quillRef.current) {
      const quillElement = document.querySelector(`#quill`);
      if (quillElement) {
        quillRef.current = new Quill(quillElement, {
          modules: {
            toolbar: {
              container: [
                [{ size: ["small", false, "large", "huge"] }],
                [{ align: [] }],
                ["bold", "italic", "underline", "strike"],
                [{ list: "ordered" }, { list: "bullet" }],
                ["image"],
                [{ color: [] }, { background: [] }],
              ],
              handlers: {
                image: imageHandler,
              },
            },
          },
          placeholder: "Compose an epic...",
          theme: "snow", // or 'bubble'
        });
      }
    }
  }, []);

  useEffect(() => {
    if (quillRef.current) {
      quillRef.current.on("text-change", () => {
        setQuillHtml(quillRef.current?.root.innerHTML || "");
        setFormState((prevState) => ({
          ...prevState,
          content: quillRef.current?.root.innerHTML || "",
        }));
      });
    }
  }, []);

  async function imageHandler() {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    // Bind imageHandler
    input.click();
    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file) {
        console.error("No file selected");
        return;
      }
      const formData = new FormData();
      formData.append("image", file, file.name);
      if (file) {
        try {
          const res = await instance.post("recipes/image-upload/", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          if (res.data && res.data.image_info) {
            const image_url = res.data.image_info.image;
            const image_id = res.data.image_info.image_uuid;
            setUuid_list((prevUuid_list) => [...prevUuid_list, image_id]);

            if (quillRef.current) {
              const quill = quillRef.current;
              const range = quill.getSelection(true);
              const index = range ? range.index : quill.getLength();
              quill.insertEmbed(index, "image", image_url);
              quill.setSelection(index + 1, 0);
            }
          } else {
            console.error("invalid data", res.data);
          }
        } catch (error) {
          console.error("err", error);
        }
      }
    };
  }
  async function onsubmit(e: React.FormEvent) {
    e.preventDefault();
    const { thumbnail, title, food_type, food_ingredient, level, content } =
      formState;
    try {
      if (
        quillRef.current &&
        thumbnail &&
        title &&
        food_type &&
        food_ingredient &&
        level
      ) {
        const formData = new FormData();
        formData.append("thumbnail", thumbnail);
        formData.append("title", title);
        formData.append("content", quillRef.current.root.innerHTML);
        formData.append("food_type", food_type.toString());
        formData.append("food_ingredient", food_ingredient.toString());
        formData.append("level", level);
        formData.append("uuid_list", JSON.stringify(uuid_list));

        // const config = {
        //   headers: {
        //     Authorization: `Bearer ${localStorage.getItem("access")}`,
        //     "Content-Type": "multipart/form-data",
        //   },
        // };

        const response = await instance.post("recipes/list/", formData);
        const recipeId = response.data.recipe.id;

        alert("게시물을 등록하였습니다.");
        navigate(`/detailPost/${recipeId}/`);
      } else {
        console.error("form data is missing", {
          content,
          thumbnail,
          title,
          food_type,
          food_ingredient,
          level,
          uuid_list,
        });
      }
    } catch (error) {
      console.error("form err", error);
    }
  }

  const [foodType, setfoodType] = useState([]);
  const [foodIngredient, setfoodIngredient] = useState([]);

  useEffect(() => {
    const FoodData = async () => {
      try {
        const foodTypes = await FoodTypes();
        setfoodType(foodTypes);
        const foodIngredients = await FoodIngredients();
        setfoodIngredient(foodIngredients);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    FoodData();
  }, []);

  return (
    <form
      className={styles.bigContainer}
      onSubmit={onsubmit}
      encType="multipart/form-data"
    >
      <div className={styles.titleDiv}>
        <div className={styles.imgDiv} onClick={handleClick}>
          {!imagePreviewUrl ? (
            <>
              <div className={styles.addImgtext}>커버사진을 추가해주세요.</div>
              <LuUpload style={{ width: "30px", height: "30px" }} />
              <Button
                type="button"
                size="sm"
                variant="secondary"
                style={{
                  border: "1px solid grey",
                  color: "black",
                  marginTop: "20px",
                }}
              >
                커버 사진 추가
              </Button>
            </>
          ) : (
            <img
              src={imagePreviewUrl}
              alt="Cover Preview"
              className={styles.coverImg}
            />
          )}
          <input
            type="file"
            accept="image/*"
            hidden
            className="coverImgInput"
            ref={fileInputRef}
            onChange={handleImgChange}
            name="thumnail"
          />
        </div>
        <div>
          <div>제목</div>
          <Input
            inputSize="md"
            variant="primary"
            name="title"
            onChange={(e) => handleInputChange(e, "title")}
          />
        </div>
      </div>
      <div className={styles.contentDiv}>
        <div>내용</div>
        <div id={"quill"} style={{ height: "600px" }}></div>
      </div>
      <div className={styles.typeDiv}>
        <div className={styles.categoryDiv}>
          <div style={{ marginBottom: "15px" }}>
            주요 카테고리를 선택해주세요.
          </div>
          <div className={styles.dropdownDiv}>
            <Dropdown
              onSelect={(item) => handleSelect(item, "food_type")}
              options={foodType}
              defaultLabel="종류별"
              selectedOption={null}
            />
            <Dropdown
              onSelect={(item) => handleSelect(item, "food_ingredient")}
              options={foodIngredient}
              defaultLabel="재료별"
              selectedOption={null}
            />
          </div>
        </div>
        <div className={styles.tagDiv}>
          <div style={{ marginBottom: "15px" }}>
            요리 난이도를 선택해주세요.
          </div>
          <TagButton
            tags={tags}
            onSelect={handleTagSelect}
            selectedTag={selectedTag}
          />
        </div>
      </div>
      <div className={styles.writeBtn}>
        <Button
          size="md"
          variant="secondary"
          style={{ margin: "0 20px 50px 0" }}
          onClick={() => navigate(-1)}
        >
          취소
        </Button>
        <Button size="md" variant="primary" type="submit">
          작성완료
        </Button>
      </div>
    </form>
  );
}
