import { PacmanLoader } from "react-spinners";
import { useLoadingStore } from "../../../store/loading_store";

function Loading() {
  const { isLoading } = useLoadingStore();

  return isLoading ? (
    <div
      style={{
        paddingTop: "8vh",
        width: "92vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: "1800",
      }}
    >
      <div>
        <PacmanLoader color="rgba(214,54,68,1)" margin={5} size={30} />
      </div>
    </div>
  ) : null;
}

export default Loading;
