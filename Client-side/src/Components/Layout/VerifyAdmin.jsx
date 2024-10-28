import React, { useEffect } from 'react';
import Loader from '../Shared/Loader';
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';


const VerifyAdmin = ({ children }) => {
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.user);
    useEffect(() => {
        if (user) {
            if (user?.role !== "admin") {
                navigate(`/${user?.role}`)
            }
        }
    }, [user, navigate])
    if (!user) {
        return <Loader />
    }
    if (user?.role === "admin") {
        return children;
    }
};

export default VerifyAdmin;

export const VerifySC = ({ children }) => {
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.user);
    useEffect(() => {
        if (user) {
            if (user?.role !== "sc") {
                navigate(`/${user?.role}`)
            }
        }
    }, [user, navigate])
    if (!user) {
        return <Loader />
    }
    if (user?.role === "sc") {
        return children;
    }
}

export const VerifyConsultant = ({ children }) => {
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.user);
    useEffect(() => {
        if (user) {
            if (user?.role !== "consultant") {
                navigate(`/${user?.role}`)
            }
        }
    }, [user, navigate])
    if (!user) {
        return <Loader />
    }
    if (user?.role === "consultant") {
        return children;
    }
}

export const VerifyGroupLeader = ({ children }) => {
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.user);
    useEffect(() => {
        if (user) {
            if (user?.role !== "gl") {
                navigate(`/${user?.role}`)
            }
        }
    }, [user, navigate])
    if (!user) {
        return <Loader />
    }
    if (user?.role === "gl") {
        return children;
    }
}
export const VerifySeniorGroupLeader = ({ children }) => {
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.user);
    useEffect(() => {
        if (user) {
            if (user?.role !== "sgl") {
                navigate(`/${user?.role}`)
            }
        }
    }, [user, navigate])
    if (!user) {
        return <Loader />
    }
    if (user?.role === "sgl") {
        return children;
    }
}
export const VerifyTeacher = ({ children }) => {
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.user);
    useEffect(() => {
        if (user) {
            if (user?.role !== "teacher") {
                navigate(`/${user?.role}`)
            }
        }
    }, [user, navigate])
    if (!user) {
        return <Loader />
    }
    if (user?.role === "teacher") {
        return children;
    }
}
export const VerifyChecker = ({ children }) => {
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.user);
    useEffect(() => {
        if (user) {
            if (user?.role !== "checker") {
                navigate(`/${user?.role}`)
            }
        }
    }, [user, navigate])
    if (!user) {
        return <Loader />
    }
    if (user?.role === "checker") {
        return children;
    }
}
export const VerifyCM = ({ children }) => {
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.user);
    useEffect(() => {
        if (user) {
            if (user?.role !== "cm") {
                navigate(`/${user?.role}`)
            }
        }
    }, [user, navigate])
    if (!user) {
        return <Loader />
    }
    if (user?.role === "cm") {
        return children;
    }
}
export const VerifyTrainer = ({ children }) => {
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.user);
    useEffect(() => {
        if (user) {
            if (user?.role !== "trainer") {
                navigate(`/${user?.role}`)
            }
        }
    }, [user, navigate])
    if (!user) {
        return <Loader />
    }
    if (user?.role === "trainer") {
        return children;
    }
}
export const VerifyManager = ({ children }) => {
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.user);
    useEffect(() => {
        if (user) {
            if (user?.role !== "manager") {
                navigate(`/${user?.role}`)
            }
        }
    }, [user, navigate])
    if (!user) {
        return <Loader />
    }
    if (user?.role === "manager") {
        return children;
    }
}