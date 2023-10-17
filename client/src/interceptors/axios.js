import axios from "axios";

axios.defaults.baseURL = "http://localhost:8000/api/v1/";

axios.interceptors.request.use(
    (config) => {
        if(!config.headers["Authorization"]) {
            const data = localStorage.getItem("auth"); 
            if(data){
                config.headers["Authorization"] = `Bearer ${data.token}`;
            }
            config.headers["Authorization"] = `Bearer `;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

axios.interceptors.response.use(
    (resp) => resp,
    async (error) => {
        const prevRequest = error?.config;
        if(error?.response?.status === 401 && !prevRequest?.sent) {
            prevRequest.sent = true;
            const response = await axios.post('/auth/refresh', {}, {withCredentials: true});

            if(response.status === 200) {
                
                localStorage.setItem("auth", {...loggedIn, token: response.data.accessToken});
                prevRequest.headers["Authorization"] = `Bearer ${response.data["accessToken"]}`;
                return axios(prevRequest);
            }
        }
        return Promise.reject(error);
    }
)