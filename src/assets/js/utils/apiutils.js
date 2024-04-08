class ApiUtils {
    constructor(apiBaseUrl, token) {
        this.apiBaseUrl = apiBaseUrl;
        this.token = token
    }

    async getctk(path) {
        const request = await fetch(`${this.apiBaseUrl}${path}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': this.token
            }
        });
        const usuario = await request.json();
        return usuario;
    }

    async get(path) {
        const response = await fetch(`${this.apiBaseUrl}${path}`,{
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': this.token
            }
        });
        const data = await response.json();
        return data;
    }

    async post(path, body) {
        const response = await fetch(`${this.apiBaseUrl}${path}`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': this.token
            },
            body: JSON.stringify(body),
        });
        const data = await response.json();
        return data;
    }

    async poststk(path, body) {
        const response = await fetch(`${this.apiBaseUrl}${path}`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body),
        });
        const data = await response.json();
        return data;
    }
    
    async putwb(path) {
        const response = await fetch(`${this.apiBaseUrl}${path}`, {
          method: 'PUT',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': this.token
          },
        });
        const data = await response.json();
        return data;
      }

    async put(path, body) {
        const response = await fetch(`${this.apiBaseUrl}${path}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': this.token
            },
            body: JSON.stringify(body),
        });
        const data = await response.json();
        return data;
    }

    async delete(path) {
        const response = await fetch(`${this.apiBaseUrl}${path}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': this.token
            },
        });
        const data = await response.json();
        return data;
    }
}