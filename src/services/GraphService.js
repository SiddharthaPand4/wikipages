import axios from "./axios";

class GraphService {
    static Instance() {
        return new GraphService()
    }

    fetchData(minYear, maxYear) {
        return axios.get("/api/getData?minYear=" + minYear + "&maxYear=" + maxYear)
    }

}

export default GraphService.Instance()