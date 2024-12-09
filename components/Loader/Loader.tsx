import { CircleLoader } from "react-spinners";
import tw from "tailwind-styled-components";

const LoaderWrapper = tw.div`
  flex
  justify-center
  items-center
  fixed
  top-0
  left-0
  w-full
  h-full
  bg-black
  z-50
`;

const Loader = () => {
  return (
    <LoaderWrapper>
      <CircleLoader color="#3498db" size={80} />
    </LoaderWrapper>
  );
};

export default Loader;
