import { createBrowserRouter } from "react-router-dom";
import Home from "../Pages/Home";
import PublicLayout from "../Components/Layout/PublicLayout";
import TermCondition from "../Pages/Term-Condition/TermCondition";
import PrivacyPolicy from "../Pages/privacy-policy/PrivacyPolicy";
import Contact from "../Pages/Contact/Contact";
import Login from "../Pages/Login/Login";
import Signup from "../Pages/Signup/Signup";
import About from "../Pages/About/About";
import Courses from "../Pages/Courses/Courses";
import User from "../Pages/User";
import Profile from "../Pages/User/Profile/Profile";
import Passbook from "../Pages/User/Passbook/Passbook";
import Cradit from "../Pages/User/Passbook/Cradit";
import Dabit from "../Pages/User/Passbook/Dabit";
import Withdraw from "../Pages/User/Withdraw/Withdraw";
import UserFeed from "../Pages/User/Feed/UserFeed";
import VerifyUser from "../Components/Layout/VerifyUser";
import App from '../App';
import Password from "../Pages/User/Password/Password";
import Referance from "../Pages/User/Referance";
import Dashboard from "../Pages/Dashboard";
import VerifyAdmin, { VerifyCM, VerifyChecker, VerifyConsultant, VerifyGroupLeader, VerifyManager, VerifySC, VerifySeniorGroupLeader, VerifyTeacher, VerifyTrainer } from "../Components/Layout/VerifyAdmin";
import SGL from "../Pages/Dashboard/Admin/SGL/SGL";
import Users from "../Pages/Dashboard/Admin/Users/Users";
import SeniorCnnsultent from "../Pages/Dashboard/Admin/SC/SeniorCnnsultent";
import Consultant from "../Pages/Dashboard/Admin/Consultent/Consultent";
import ConsultantOSC from "../Pages/Dashboard/SeniorConsultent/Consultents/ConsultentsOfSC";
import SingleConsultant from "../Pages/Dashboard/SeniorConsultent/Consultents/Single";
import Settings from "../Pages/Dashboard/Admin/Settings/Settings";
import Requests from "../Pages/Dashboard/SeniorConsultent/Requests/Requests";
import ConsultantUM from "../Pages/Dashboard/Consultent";
import Request from "../Pages/Dashboard/Consultent/Request";
import Withdrawals from "../Pages/Dashboard/Admin/Withdrawals/Withdrawals";
import NotFound from "../Components/Shared/NotFound";
import SENIOR_GL from "../Pages/Dashboard/SUB_ADMIN/SENIOR_GL";
import Teachers from "../Pages/Dashboard/Admin/Teacher/Teacher";
import Courses_Admin from "../Pages/Dashboard/Admin/Courses/Courses";
import CourseDetails from "../Pages/Courses/CourseDetails";
import Students from "../Pages/Dashboard/SUB_ADMIN/TEACHER";
import Assignments from "../Pages/Dashboard/SUB_ADMIN/TEACHER/Assignments/Assignments";
import CoursesUser from "../Pages/User/Courses/CoursesUser";
import CourseSingleDetails from "../Pages/User/Courses/CourseSingleDetails";
import Trainer_Page from "../Pages/Dashboard/SUB_ADMIN/Trainer";
import Reset from "../Pages/Reset/Reset";
import Trainer_admin from "../Pages/Dashboard/Admin/Trainer_admin/Trainer_Admin";
import Checker_admin from "../Pages/Dashboard/Admin/Checker/Checkers_admin";
import Manager_admin from "../Pages/Dashboard/Admin/Managers_admin/Managers_admin";
import TimeZone from "../Pages/Time-Zone/TimeZone";
import Count from "../Pages/Dashboard/Count/Count";
import Search from '../Pages/Search/Search';
import ApplyFor from "../Pages/Apply/ApplyFor";
import Groups from "../Pages/User/Groups/Groups";
import Classes from "../Pages/User/Classes";
import Notice from "../Pages/Dashboard/Admin/Settings/Notice";
import Statistics from "../Pages/Dashboard/Count_Result/Count_Result";
import AboutUs from "../Pages/Home/AboutUs";

const commonRoutes = [

    {
        path: 'profile',
        element: <Profile />,
    },
    {
        path: 'withdraw',
        element: <Withdraw />,
    },
    {
        path: 'password',
        element: <Password />,
    },
    {
        path: 'passbook',
        element: <Passbook />,
        children: [
            {
                index: true,
                element: <Cradit />,
            },
            {
                path: 'cradit',
                element: <Cradit />,
            },
            {
                path: 'debit',
                element: <Dabit />,
            }
        ]
    },
    {
        path: 'ref-history',
        element: <Referance />,
    },
]

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '/',
                element: <PublicLayout />,
                children: [
                    {
                        index: true,
                        element: <Home />,
                    },
                    {
                        path: 'terms-condition',
                        element: <TermCondition />,
                    }, {
                        path: 'apply-for',
                        element: <ApplyFor />,
                    },
                    {
                        path: 'privacy-policy',
                        element: <PrivacyPolicy />,
                    },
                    {
                        path: 'contact',
                        element: <Contact />,
                    },
                    {
                        path: 'courses',
                        element: <Courses />,
                    },
                    {
                        path: 'courses/:id',
                        element: <CourseDetails />,
                    },
                    {
                        path: 'about',
                        element: <div className="pt-[200px] pb-5">
                        <AboutUs />
                        </div>,
                    },
                    {
                        path: 'login',
                        element: <Login />,
                    },
                    {
                        path: 'reset',
                        element: <Reset />,
                    },
                    {
                        path: 'signup',
                        element: <Signup />,
                    },
                    {
                        path: '*',
                        element: <NotFound />,
                    }
                ],
            },
            {
                path: 'admin',
                element: <VerifyAdmin>
                    <Dashboard />
                </VerifyAdmin>,
                children: [
                    {
                        index: true,
                        element: <Users />,
                    },
                    {
                        path: 'count',
                        element: <Count role={"admin"} />,
                    },
                    {
                        path: 'groups',
                        element: <Courses_Admin mode={"groups"} />,
                    },
                    {
                        path: 'search',
                        element: <Search />,
                    },
                    {
                        path: 'sgl',
                        element: <SGL />,
                    },

                    {
                        path: 'teachers',
                        element: <Teachers />,
                    },
                    {
                        path: 'trainer',
                        element: <Trainer_admin />,
                    },
                    {
                        path: 'checker',
                        element: <Checker_admin />,
                    },
                    {
                        path: 'manager',
                        element: <Manager_admin />,
                    },
                    {
                        path: 'courses',
                        element: <Courses_Admin />,
                    },
                    ...commonRoutes,
                    {
                        path: 'gl',
                        element: <ConsultantOSC page={"gl"} />,
                    },
                    {
                        path: 'gl/:id',
                        element: <SingleConsultant page={"gl"} />,
                    },
                    {
                        path: 'gl-picker',
                        element: <SENIOR_GL />,
                    },
                    {
                        path: 'sc',
                        element: <SeniorCnnsultent />,
                    }, {
                        path: 'consultants',
                        element: <Consultant />,
                    },
                    {
                        path: 'settings',
                        element: <Settings />,
                    },
                    {
                        path: 'users',
                        element: <Users />,
                    },
                    {
                        path: 'withdrawals',
                        element: <Withdrawals />,
                    }, {
                        path: 'notice',
                        element: <Notice />,
                    },
                    {
                        path: '*',
                        element: <NotFound />,
                    }

                ]
            },
            {
                path: 'user',
                element: <VerifyUser>
                    <User />
                </VerifyUser>,
                children: [
                    {
                        index: true,
                        element: <UserFeed />,
                    },
                    ...commonRoutes,
                    {
                        path: '*',
                        element: <NotFound />,
                    },
                    {
                        path: "courses",
                        element: <CoursesUser />,
                    },
                    {
                        path: "classes",
                        element: <Classes />,
                    },
                    {
                        path: "courses/:id",
                        element: <CourseSingleDetails />,
                    },
                ]
            },
            {
                path: 'sc',
                element: <VerifySC>
                    <Dashboard />
                </VerifySC>,
                children: [
                    {
                        index: true,
                        element: <Profile />,
                    },
                    ...commonRoutes,
                    {
                        path: 'requests',
                        element: <Requests />,
                    },
                    {
                        path: 'consultants',
                        element: <ConsultantOSC />,
                    },
                    {
                        path: "statistics",
                        element: <Statistics />,
                    },
                    {
                        path: 'search',
                        element: <Search />,
                    },
                    {
                        path: 'count',
                        element: <Count role={"consultant"} />,
                    },
                    {
                        path: 'consultants/:id',
                        element: <SingleConsultant page={"consultant"} />,
                    },
                    {
                        path: '*',
                        element: <NotFound />,
                    }
                ]
            },
            {
                path: 'consultant',
                element: <VerifyConsultant>
                    <Dashboard />
                </VerifyConsultant>,
                children: [
                    {
                        index: true,
                        element: <Profile />,
                    },
                    ...commonRoutes,
                    {
                        path: 'users',
                        element: <ConsultantUM />,
                    },
                    {
                        path: 'time-zone',
                        element: <TimeZone />,
                    },
                    {
                        path: "statistics",
                        element: <Statistics />,
                    },
                    {
                        path: 'requests',
                        element: <Request />,
                    },
                    {
                        path: '*',
                        element: <NotFound />,
                    }
                ]
            },
            {
                path: 'cm',
                element: <VerifyCM>
                    <Dashboard />
                </VerifyCM>,
                children: [
                    {
                        index: true,
                        element: <Profile />,
                    },
                    ...commonRoutes,
                    {
                        path: 'sc',
                        element: <SeniorCnnsultent />,
                    },
                    {
                        path: 'search',
                        element: <Search />,
                    },
                    {
                        path: 'consultants',
                        element: <Consultant />,
                    },
                    {
                        path: 'count',
                        element: <Count role={"manager"} />,
                    },
                    {
                        path: '*',
                        element: <NotFound />,
                    }
                ]
            },
            {
                path: 'gl',
                element: <VerifyGroupLeader>
                    <Dashboard />
                </VerifyGroupLeader>,
                children: [
                    {
                        index: true,
                        element: <Profile />,
                    },
                    ...commonRoutes,
                    {
                        path: 'trainers',
                        element: <ConsultantOSC page={"trainer"} />,
                    },
                    {
                        path: 'trainers/:id',
                        element: <SingleConsultant page={"trainer"} />,
                    },
                    {
                        path: "statistics",
                        element: <Statistics />,
                    },
                    {
                        path: 'users',
                        element: <Users />,
                    },
                    {
                        path: '*',
                        element: <NotFound />,
                    }
                ]
            },
            {
                path: 'sgl',
                element: <VerifySeniorGroupLeader>
                    <Dashboard />
                </VerifySeniorGroupLeader>,
                children: [
                    {
                        index: true,
                        element: <Profile />,
                    },
                    ...commonRoutes,
                    {
                        path: 'gl',
                        element: <ConsultantOSC page={"gl"} />,
                    },
                    {
                        path: "statistics",
                        element: <Statistics />,
                    },
                    {
                        path: 'gl/:id',
                        element: <SingleConsultant page={"gl"} />,
                    },
                    {
                        path: 'search',
                        element: <Search />,
                    },
                    {
                        path: 'count',
                        element: <Count role={"gl"} />,
                    },
                    {
                        path: '*',
                        element: <NotFound />,
                    }
                ]
            }, {
                path: 'teacher',
                element: <VerifyTeacher>
                    <Dashboard />
                </VerifyTeacher>,
                children: [
                    {
                        index: true,
                        element: <Students />,
                    },
                    {
                        path: "course",
                        element: <Students />,
                    },
                    ...commonRoutes,
                    {
                        path: '*',
                        element: <NotFound />,
                    }
                ]
            },
            {
                path: 'checker',
                element: <VerifyChecker>
                    <Dashboard />
                </VerifyChecker>,
                children: [
                    {
                        index: true,
                        element: <Assignments />,
                    },
                    {
                        path: "assignments",
                        element: <Assignments />,
                    },
                    ...commonRoutes,
                    {
                        path: '*',
                        element: <NotFound />,
                    }
                ]
            },
            {
                path: 'trainer',
                element: <VerifyTrainer>
                    <Dashboard />
                </VerifyTrainer>,
                children: [
                    {
                        index: true,
                        element: <Trainer_Page />,
                    },
                    {
                        path: "users",
                        element: <Trainer_Page />,
                    },
                    {
                        path: "statistics",
                        element: <Statistics />,
                    },
                    ...commonRoutes,
                    {
                        path: '*',
                        element: <NotFound />,
                    }
                ]
            },
            {
                path: 'manager',
                element: <VerifyManager>
                    <Dashboard />
                </VerifyManager>,
                children: [
                    {
                        index: true,
                        element: <Trainer_Page />,
                    },
                    {
                        path: 'search',
                        element: <Search />,
                    },
                    {
                        path: 'users',
                        element: <Users />,
                    },
                    {
                        path: 'count',
                        element: <Count role={"user"} />,
                    },
                    ...commonRoutes,
                    {
                        path: '*',
                        element: <NotFound />,
                    }
                ]
            }
        ]
    },
    {
        path: '*',
        element: <NotFound />,
    }
]);
export default router;
