import { useNavigate } from "react-router-dom";

const useFormNavigate = () => {
  const navigate = useNavigate();

  return {
    toInfo: () => navigate("?step=info"),
    toPhoto: () => navigate("?step=photo"),
    toVideo: () => navigate("?step=video"),
    toReview: () => navigate("?step=review"),
    toFinalize: () => navigate("?step=finalize"),
  };
};

export default useFormNavigate;
