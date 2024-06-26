import Quill from "quill";
import "quill/dist/quill.bubble.css";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { LuUpload } from "react-icons/lu";
import { useNavigate, useParams } from "react-router-dom";

import instance from "../../../api/axios";
import Button from "../../../components/Button/Button";
import Input from "../../../components/Input/Input";
import Dropdown from "../../../components/category/dropdown";
import TagButton from "../../../components/tagbutton/tagbutton";
import { FoodIngredients, FoodTypes } from "../../community/fooddata.api";
import styles from "./modifypost.module.css";

interface FormState {
  thumbnail: File | string | null;
  title: string | "";
  content: string | "";
  food_type: number | null;
  food_ingredient: number | null;
  level: string | null;
}
const tags = ["하수", "중수", "고수"];
interface FoodType {
  id: number;
  name: string;
  img: string;
}

export default function ModifyPost() {
  const { id } = useParams();
  const quillRef = useRef<Quill>();
  const [, setQuillHtml] = useState("");
  const navigate = useNavigate();
  const [imgAddList, setImgAddList] = useState<string[]>([]);
  const [defaultFoodTypeLabel, setDefaultFoodTypeLabel] =
    useState<string>("종류별");
  const [defaultFoodIngredientLabel, setDefaultFoodIngredientLabel] =
    useState<string>("재료별");

  const [formState, setFormState] = useState<FormState>({
    thumbnail: null,
    title: "",
    content: "",
    food_type: null,
    food_ingredient: null,
    level: null,
  });

  const [foodType, setfoodType] = useState<FoodType[]>([]);
  const [foodIngredient, setfoodIngredient] = useState<FoodType[]>([]);
  const [defaultTag, setDefaultTag] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const [uuid_list, setUuid_list] = useState<string[]>([]);

  const handleTagSelect = (selectedTag: string | null) => {
    setFormState((prevState) => ({
      ...prevState,
      level: selectedTag,
    }));
  };

  //같은것이 실행되서 이게 덮임
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

  function extractImageUrls(content: string): string[] {
    const imgTagRegex = /<img\s+src="([^"]+)"\s*\/?>/g;
    const urls: string[] = [];
    let match;
    while ((match = imgTagRegex.exec(content)) !== null) {
      urls.push(match[1]);
    }
    return urls;
  }

  //정보 가져오기
  useEffect(() => {
    async function getPostData() {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
        };
        const response = await instance.get(`recipes/detail/${id}/`, config);
        const thumbnail_url = response.data.recipe.thumbnail;
        setFormState({
          ...formState,
          thumbnail: thumbnail_url,
          title: response.data.recipe.title,
          content: response.data.recipe.content,
          food_type: response.data.recipe.food_type.id,

          food_ingredient: response.data.recipe.food_ingredient.id,
          level: response.data.recipe.level,
        });
        if (quillRef.current) {
          quillRef.current.clipboard.dangerouslyPasteHTML(
            response.data.recipe.content,
          );
        }
        setImagePreviewUrl(thumbnail_url);
        setDefaultFoodTypeLabel(response.data.recipe.food_type.food_name);
        setDefaultFoodIngredientLabel(
          response.data.recipe.food_ingredient.food_name,
        );
        setDefaultTag(response.data.recipe.level);
        // content에서 이미지 URL 추출 및 설정
        const extractedImages = extractImageUrls(response.data.recipe.content);

        setImgAddList(extractedImages);
      } catch (error) {
        console.error("getDataError", error);
        return {};
      }
    }
    getPostData();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string,
  ) => {
    setFormState((prevState) => ({
      ...prevState,
      [field]: e.target.value,
    }));
  };

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
        const newContent = quillRef.current?.root.innerHTML || "";
        setQuillHtml(newContent);
        setFormState((prevState) => ({
          ...prevState,
          content: newContent,
        }));

        // content가 변경될 때마다 이미지 URL을 추출하여 imgAddList를 업데이트
        const extractedImages = extractImageUrls(newContent);
        setImgAddList(extractedImages);
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
          const res = await instance.post("recipes/image-upload/", formData);
          if (res && res.data && res.data.image_info) {
            const image_url = res.data.image_info.image;
            const image_id = res.data.image_info.image_uuid;
            setImgAddList((prevImgAddlist) => [...prevImgAddlist, image_url]);
            setUuid_list((prevUuid_list) => [...prevUuid_list, image_id]);

            if (quillRef.current) {
              const quill = quillRef.current;
              const range = quill.getSelection(true);
              const index = range ? range.index : quill.getLength();
              quill.insertEmbed(index, "image", image_url);
              quill.setSelection(index + 1, 0);
            }
          }
        } catch (error) {
          console.error("err", error);
        }
      }
    };
  }

  //수정해서 보내기......
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
        if (thumbnail instanceof File) {
          formData.append("thumbnail", thumbnail);
        } else if (typeof thumbnail === "string") {
          formData.append("thumbnail_url", thumbnail);
        }
        formData.append("title", title);
        formData.append("content", quillRef.current.root.innerHTML);
        formData.append("food_type", food_type.toString());
        formData.append("food_ingredient", food_ingredient.toString());
        formData.append("level", level);
        formData.append("image_url_list", JSON.stringify(imgAddList));
        formData.append("uuid_list", JSON.stringify(uuid_list));

        const config = {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
            "Content-Type": "multipart/form-data",
          },
        };

        const response = await instance.put(
          `recipes/detail/${id}/`,
          formData,
          config,
        );
        if (response && response.data && response.data.recipe) {
          const recipeId = response.data.recipe.id;
          alert("게시물을 수정하였습니다.");
          navigate(`/detailPost/${recipeId}/`);
        }
      } else {
        console.error("form data is missing", {
          content,
          thumbnail,
          title,
          food_type,
          food_ingredient,
          level,
          imgAddList,
          uuid_list,
        });
      }
    } catch (error) {
      console.error("form err", error);
    }
  }

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
              <LuUpload size={50} />
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
            name="thumbnail"
          />
        </div>
        <div>
          <div>제목</div>
          <Input
            inputSize="md"
            variant="primary"
            name="title"
            value={formState.title || ""}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleInputChange(e, "title")
            }
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
            {foodType.length > 0 && (
              <Dropdown
                options={foodType}
                defaultLabel={defaultFoodTypeLabel}
                selectedOption={formState.food_type}
                onSelect={(item: { id: number; name: string; img: string }) =>
                  setFormState((prevState) => ({
                    ...prevState,
                    food_type: item.id,
                  }))
                }
              />
            )}
            {foodIngredient.length > 0 && (
              <Dropdown
                options={foodIngredient}
                defaultLabel={defaultFoodIngredientLabel}
                selectedOption={formState.food_ingredient}
                onSelect={(item: { id: number; name: string; img: string }) =>
                  setFormState((prevState) => ({
                    ...prevState,
                    food_ingredient: item.id,
                  }))
                }
              />
            )}
          </div>
        </div>
        <div className={styles.tagDiv}>
          <div style={{ marginBottom: "15px" }}>
            요리 난이도를 선택해주세요.
          </div>
          <TagButton
            tags={tags}
            onSelect={handleTagSelect}
            selectedTag={defaultTag}
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
          수정완료
        </Button>
      </div>
    </form>
  );
}
