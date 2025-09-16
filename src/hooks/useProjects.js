import { useEffect, useState, useCallback } from "react"
import { apiMethods } from "../lib/apiClient"

const useProjects = () => {
    const [loading, setLoading] = useState(false);
    const [projects, setProjects] = useState([]);
    const [error, setError] = useState(null);
    const [retryCount, setRetryCount] = useState(0);

    const fetchProjects = useCallback(async (showLoading = true) => {
        if (showLoading) setLoading(true);
        setError(null);
        
        try {
            const response = await apiMethods.get("/projects", {
                useCache: true // Enable caching for projects
            });
            
            const projectsData = response.data?.projects || [];
            setProjects(projectsData);
            setRetryCount(0); // Reset retry count on success
            
            console.log(`📊 Loaded ${projectsData.length} projects`);
        } catch (error) {
            console.error('Failed to fetch projects:', error);
            setError({
                message: error.userMessage || 'Failed to load projects',
                canRetry: true,
                originalError: error
            });
        } finally {
            if (showLoading) setLoading(false);
        }
    }, []);

    // Initial fetch
    useEffect(() => {
        fetchProjects();
    }, [fetchProjects]);

    // Retry mechanism
    const retry = useCallback(() => {
        setRetryCount(prev => prev + 1);
        fetchProjects();
    }, [fetchProjects]);

    // Refresh projects (bypass cache)
    const refresh = useCallback(async () => {
        apiMethods.clearCache('/projects');
        await fetchProjects();
    }, [fetchProjects]);

    // Like project with optimistic updates
    const likeProject = useCallback(async (projectId) => {
        if (!projectId) {
            throw new Error('Project ID is required');
        }

        // Find the project to update optimistically
        const projectIndex = projects.findIndex(p => p._id === projectId);
        if (projectIndex === -1) {
            throw new Error('Project not found');
        }

        const originalProject = projects[projectIndex];
        const optimisticProject = {
            ...originalProject,
            statistics: {
                ...originalProject.statistics,
                likes: (originalProject.statistics?.likes || 0) + 1
            }
        };

        // Optimistic update
        const newProjects = [...projects];
        newProjects[projectIndex] = optimisticProject;
        setProjects(newProjects);

        try {
            await apiMethods.post(`/projects/${projectId}/like`);
            console.log(`👍 Liked project: ${projectId}`);
            
            // Clear cache to ensure fresh data on next fetch
            apiMethods.clearCache('/projects');
        } catch (error) {
            // Revert optimistic update on error
            setProjects(projects);
            console.error('Failed to like project:', error);
            throw new Error(error.userMessage || 'Failed to like project');
        }
    }, [projects]);

    // Add comment with optimistic updates
    const addComment = useCallback(async (projectId, commentText) => {
        if (!projectId || !commentText?.trim()) {
            throw new Error('Project ID and comment text are required');
        }

        const projectIndex = projects.findIndex(p => p._id === projectId);
        if (projectIndex === -1) {
            throw new Error('Project not found');
        }

        const newComment = {
            _id: `temp_${Date.now()}`,
            user: 'You',
            text: commentText.trim(),
            createdAt: new Date().toISOString(),
            avatar: 'https://ui-avatars.com/api/?name=You'
        };

        // Optimistic update
        const originalProject = projects[projectIndex];
        const optimisticProject = {
            ...originalProject,
            statistics: {
                ...originalProject.statistics,
                comments: [newComment, ...(originalProject.statistics?.comments || [])],
                comments_count: (originalProject.statistics?.comments_count || 0) + 1
            }
        };

        const newProjects = [...projects];
        newProjects[projectIndex] = optimisticProject;
        setProjects(newProjects);

        try {
            const response = await apiMethods.post(`/projects/${projectId}/comments`, {
                text: commentText.trim()
            });
            
            console.log(`💬 Added comment to project: ${projectId}`);
            
            // Update with real comment data
            const realComment = response.data?.comment || newComment;
            const updatedProject = {
                ...optimisticProject,
                statistics: {
                    ...optimisticProject.statistics,
                    comments: [realComment, ...(originalProject.statistics?.comments || [])]
                }
            };
            
            newProjects[projectIndex] = updatedProject;
            setProjects(newProjects);
            
            // Clear cache to ensure fresh data on next fetch
            apiMethods.clearCache('/projects');
        } catch (error) {
            // Revert optimistic update on error
            setProjects(projects);
            console.error('Failed to add comment:', error);
            throw new Error(error.userMessage || 'Failed to add comment');
        }
    }, [projects]);

    return {
        loading,
        error,
        projects,
        retryCount,
        likeProject,
        addComment,
        retry,
        refresh,
        hasProjects: projects.length > 0
    };
};

export default useProjects