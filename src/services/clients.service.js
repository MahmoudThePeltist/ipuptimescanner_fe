import axios from 'axios';

export class ClientsService {
    
    constructor() {
        this.url = 'http://localhost:3500/api';
        this.resource = 'clients';
    }
    
    getClients(){
        return axios.get(this.url + '/' + this.resource);
    }
    
    getSpecificClient(id){
        return axios.get(this.url + '/' + this.resource + '/' + id);
    }
    
    postClient(data){
        return axios.post(this.url + '/' + this.resource, data);
    }
    
    updateClient(data, id){
        return axios.put(this.url + '/' + this.resource + '/' + id, data);
    }

    deleteClient(id){
        return axios.delete(this.url + '/' + this.resource + '/' + id);
    }
}
