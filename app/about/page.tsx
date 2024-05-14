import Faqs from "../../components/Faqs/Faqs";
import FinalCTA1 from "../../components/FinalCTA1/FinalCTA1";
import Methodology from "../../components/Methodology/Methodology";
import Owner from "../../components/Owner/Owner";
import PageIntro from "../../components/PageIntro/PageIntro";

const about = () => {
  return (
    <>
          <PageIntro
            heading='About the company'
            copy='Embodying sustainable practices for the future'
          />
      <Owner reverse='reverse' />
      <Methodology />
      <Faqs />
      <FinalCTA1 />
    </>
  );
};
export default about;
