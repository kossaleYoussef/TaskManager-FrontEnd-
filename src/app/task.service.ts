// This is where we use the methods created in WebRequestService

import { Injectable } from '@angular/core';
import { WebRequestService } from './web-request.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private webReqService: WebRequestService) { }

  createList(title: string) {
    // send a web request to create a list
    return this.webReqService.post('lists', { title });
  }
}
