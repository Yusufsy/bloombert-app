import axios from 'axios';

const API_URL = 'http://127.0.0.1:5000/';

const apiClient = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    }
});

const token = sessionStorage.getItem('token');
const config = {
    headers: {
        'Content-Type': 'application/json',
        'x-access-token': token
    }
};

apiClient.interceptors.request.use(
    (config) => {
      const token = sessionStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

export const loginUser = async (username, password) => {
    const response = await axios.post(`${API_URL}login`, { username, password });
    const { token } = response.data;
    console.log(token);
    sessionStorage.setItem('username', username);
    sessionStorage.setItem('token', token); // Save token to session storage
    return response;
  };

export const registerUser = async (username, email, password) => {
    const response = await axios.post(`${API_URL}register`, { username, email, password });
    const { token } = response.data;
    sessionStorage.setItem('username', username);
    sessionStorage.setItem('token', token); // Save token to session storage
    return response;
};

export const classifyQuestions = async (questions) => {
    // const token = sessionStorage.getItem('token');
    // if (!token) {
    //     // Handle token not found
    //     return;
    // }
    // const config = {
    //     headers: {
    //         'Content-Type': 'application/json',
    //         'x-access-token': token
    //     }
    // };
    try {
        const response = await apiClient.post('/classify', { questions: questions});
        return response;
    } catch (error) {
        // Handle error
        console.error('Error classifying questions:', error);
        throw error;
    }
};

export const createTest = async (title, questions) => {
    try {
        const response = await axios.post(`${API_URL}tests`, { title, questions }, config);
        return response.data;
    } catch (error) {
        throw error;
    }
};


export const fetchUserTests = async () => {
    try {
        const response = await apiClient.get('my-tests', config);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getTestById = async (id) => {
    try {
        const token = sessionStorage.getItem('token');
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': token
            }
        };
        const response = await axios.get(`${API_URL}my-tests/${id}`, config);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const deleteTest = async (testId) => {
    try {
        await apiClient.delete(`tests/${testId}`, config);
    } catch (error) {
        throw error;
    }
};

export const updateTest = async (testId, { title, questions }) => {
    try {
        const response = await axios.put(`${API_URL}tests/${testId}`, { title, questions }, config);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getInsights = async () => {
    try {
        const response = await axios.get(`${API_URL}insights`, config);
        console.log(response);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const submitFeedback = async (content) => {
    try {
      const response = await axios.post(`${API_URL}/feedback`, { content }, config);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

export const getFeedback = async () => {
    try {
        const response = await axios.get(`${API_URL}/feedback`, config);
        return response.data;
    } catch (error) {
        throw error;
    }
};