
import { UsuarioData } from '../data/usuarioData';

const usuarioData = new UsuarioData();

export class UsuarioController {
    getUsers() {

      return usuarioData.getUsers();
    };

    //async saveUser(user: User) {
    async saveUser(user: any){
      //const existingUser = await usuarioData.saveUser(user.email);
      //if (existingUser) throw new Error('User already exists');
      
      return usuarioData.saveUser(user);
    };


} 
