import { Injectable } from '@angular/core';


export interface User {
  id: string;
  name: string;
  photo: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }
}
