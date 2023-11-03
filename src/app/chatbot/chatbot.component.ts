import { Component } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent {
  userMessage: string = '';
  chatMessages: any[] = [];
  assistantReply: string = '';

  constructor(private openAiApiServiceService: DataService) {}

  sendMessage() {
    const userMessage = this.userMessage;
    console.log("THis is user message:", userMessage)
    this.chatMessages.push({ role: 'user', content: userMessage });
    
    this.openAiApiServiceService.sendMessage(userMessage)
      .subscribe((response: any) => {
        this.assistantReply = response.reply;
        this.chatMessages.push({ role: 'assistant', content: this.assistantReply });
        this.userMessage = '';
      });
  }
}
