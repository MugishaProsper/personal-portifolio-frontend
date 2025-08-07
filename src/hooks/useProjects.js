import { useEffect, useState } from "react"
import api from "../lib/api"

const useProjects = () => {
    const [loading, setLoading] = useState(false);
    const [projects, setProjects] = useState([]);
    const [comments, setComments] = useState([]);
    const [likes, setLikes] = useState(0)
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchProjects = async () => {
            setLoading(true)
            try {
                const res = await api.get("/projects");
                const projects = res.data.projects;
                setProjects(projects)
            } catch (error) {
                setError(error);
                console.log(error)
            }finally{
                setLoading(false)
            }
        }
        fetchProjects()
    }, []);
    const likeProject = async (projectId) => {
        try {
            await api.post(`/projects/${projectId}`);
        } catch (error) {
            throw new Error(error)
        }
    }
    return { loading, error, projects, likeProject }
};

export default useProjects