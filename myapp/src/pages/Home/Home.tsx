
import LandingPage from "../../components/landingpage/LandingPage"
import { auth } from "../../firebase/firebase";

type Props = {}

function Home({}: Props) {  const currentUser = auth.currentUser;

  if (currentUser) {

  
  }
  return (
    <>
      {" "}
      <LandingPage></LandingPage>
    
    </>
  );
}

export default Home