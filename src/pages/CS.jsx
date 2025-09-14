import HeaderCS from "../components/CS/HeaderCS";
import FooterCS from "../components/CS/FooterCS";
import AnimatedBackgroundCS from "../components/CS/AnimatedBackgroundCS";
export default function CS() {
  return (
    // <motion.div
    //   className="committee-page"
    //   initial={{ opacity: 0, y: 50 }}
    //   animate={{ opacity: 1, y: 0 }}
    //   exit={{ opacity: 0, y: -50 }}
    //   transition={{ duration: 0.5 }}
    // >

    // </motion.div>
    <>
      <HeaderCS />
      <AnimatedBackgroundCS />
      <FooterCS />
    </>
  );
}
