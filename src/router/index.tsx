import {Suspense} from "react";
import {Route, Routes} from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import {Styles} from "@/styles/styles";
import HomePage from "../pages/HomePage";
import WelcomePage from "../pages/WelcomePage";
import ManagementPage from "../pages/ManagementPage";
import RecoveryPage from "../pages/RecoveryPage";
import GuardianPage from "../pages/GuardianPage";

const Router = () => {
    return (
        <Suspense fallback={null}>
            <Styles/>
            <Header/>
            <Routes>
                <Route path="/" element={<WelcomePage/>}/>
                <Route path="/home" element={<HomePage/>}/>
                <Route path="/management" element={<ManagementPage/>}/>
                <Route path="/recovery" element={<RecoveryPage/>}/>
                <Route path="/guardian" element={<GuardianPage/>}/>
            </Routes>
            <Footer/>
        </Suspense>
    );
};

export default Router;
