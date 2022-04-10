import './App.scss';
import { Route, Routes} from "react-router-dom";
import Layout from "./components/hoc/Layout/Layout";
import Home from "./container/Home/Home";
import './App.scss';
import Login from "./container/Login/Login";
import SignUp from "./container/SignUp/SignUp";
import AllAnswers from "./container/AllAnswers/AllAnswers";
import WatchAnswer from "./container/WatchAnswer/WatchAnswer";
import ContactCard from "./components/ContactCard/ContactCard";
import CreateAsker from "./container/CreateAsker/CreateAsker";
import ShapeCard from "./components/UI/icons/ShapeCard";
import ShareAsker from "./container/ShareAsker/ShareAsker";
import ViewAsker from "./container/ViewAsker/ViewAsker";
import EditAsker from "./container/EditAsker/EditAsker";
import AskerOption from "./container/AskerOption/AskerOption";
import Dashboard from "./container/Dashboard/Dashboard";
import AskerSearch from "./container/AskerSearch/AskerSearch";
import StartAsker from "./container/StartAsker/StartAsker";
import NextQuestion from "./container/NextQuestion/NextQuestion";
import RecordAgain from "./container/RecordAgain/RecordAgain";
import Progress from "./container/Progress/Progress";
import AccountSettings from "./container/AccountSettings/AccountSettings";
import Settings from "./container/Settings/Settings";
import Answer from "./container/Answer/Answer";
import AskerComplete from "./container/AskerComplete/AskerComplete";
import SpinEffect from "./components/SpinEffect/SpinEffect";

const App = () => {
  return (
    <Layout>
      <Routes>
        {/* Log in Routes start*/}
        <Route path={"/"} element={<Home />}/>
        <Route path="/log-in" element={<Login />}/>
        <Route path="/sign-up" element={<SignUp />}/>
        <Route path="/all-answers" element={<AllAnswers />}/>
        <Route path="/watch-answer" element={<WatchAnswer />}/>
        <Route path="/contact-card" element={<ContactCard />}/>
        <Route path="/create-asker" element={<CreateAsker />}/>
        <Route path="/share-asker" element={<ShareAsker />}/>
        <Route path="/view-asker" element={<ViewAsker />}/>
        <Route path="/edit-asker" element={<EditAsker />}/>
        <Route path="/asker-option" element={<AskerOption />}/>
        <Route path="/dashboard" element={<Dashboard />}/>
        <Route path="/asker-search" element={<AskerSearch />}/>
        <Route path="/start-asker" element={<StartAsker />}/>
        <Route path="/next-question" element={<NextQuestion />}/>
        <Route path="/asker-complete" element={<AskerComplete />}/>
        <Route path="/record-again" element={<RecordAgain />}/>
        <Route path="/progress" element={<Progress />}/>
        <Route path="/settings" element={<Settings />}/>
        <Route path="/answer" element={<Answer />}/>
        <Route path="/spin" element={<SpinEffect />}/>
      </Routes>
    </Layout>
  );
}

export default App;
