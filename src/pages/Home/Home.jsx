import Hero from "../../components/Hero/Hero";
import Categories from "../../components/Categories/Categories";

const Home = ({ openSignup }) => {
  return (
    <>
      <Hero openSignup={openSignup} />
      <Categories />
    </>
  );
};

export default Home;
