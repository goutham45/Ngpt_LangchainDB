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
  // chatHeaders:  any[] = [];
  chatHistory: any[] = [];
  assistantReplytb: string = '';
  assistantReplysql: string = '';
  assistantReply: string = '';
  // console.log("These are the stored messages: ",chatMessages);

  constructor(private openAiApiServiceService: DataService) {}

  sendMessage() {
    const userMessage = this.userMessage;
    console.log("THis is user message:", userMessage)
    this.chatMessages.push({ role: 'user', content: userMessage });
    this.chatHistory.push({ role: 'user', content: userMessage });
    const conversation = this.chatHistory.map(message => message.content).join('\n');
    console.log("This is conversation:",conversation)
    console.log("This is user message:",userMessage)
    
    // this.openAiApiServiceService.sendMessage(conversation)
    // .subscribe((response: any) => {
    //   if (Array.isArray(response.reply)) {
    //     // Handle the case when the response is a list (array) when we have the sql statements
    //     this.assistantReplytb = response.reply[0];
    //     this.assistantReplysql = response.reply[1];
    //     this.chatMessages.push({ role: 'assistant', content: this.assistantReplytb });
    //     this.chatHistory.push({ role: 'assistant', content: this.assistantReplysql });
    //     console.log("These are the stored list messages displayed in frontend: ", this.chatMessages);
    //     console.log("These are the message history sent to openAI: ", this.chatHistory);
    //     this.userMessage = '';
    //   } else {
    //     // Handle the case when the response is not a list means we dont have sql statements
    //     this.assistantReply = response.reply;
    //     this.chatMessages.push({ role: 'assistant', content: this.assistantReply });
    //     console.log("These are the stored messages of not list: ", this.chatMessages);
    //     this.userMessage = '';
    //   }
    // });

    this.openAiApiServiceService.sendMessage(conversation)
    .subscribe((response: any) => {
      if (Array.isArray(response.reply)) {
        // Handle the case when the response is a list (array) when we have the sql statements
        this.assistantReplytb = response.reply[0];
        this.assistantReplysql = response.reply[1];
              if (this.assistantReplytb){
                const tableData = this.assistantReplytb;
                // const thElements = tableData.querySelector('table tr').querySelectorAll('th');
                const tempDiv: HTMLDivElement = document.createElement('div');
                tempDiv.innerHTML = tableData;

                const headers: string[] = [];
                const headerRow: HTMLTableRowElement = tempDiv.getElementsByTagName('thead')[0].getElementsByTagName('tr')[0];
                const headerCells: HTMLCollectionOf<HTMLTableHeaderCellElement> = headerRow.getElementsByTagName('th');

                for (let i = 0; i < headerCells.length; i++) {
                    headers.push(headerCells[i].textContent || '');
                }

                // const headers = Object.keys(tableData[0]);
                console.log("this is the headers table: ", headers)

              this.chatMessages.push({ type: 'table', headers, content: tableData, role: 'assistant' });
              console.log("this messages stored : ", this.chatMessages)
            }
              this.chatHistory.push({ role: 'assistant', content: this.assistantReplysql });
              this.userMessage = '';
      } else {
        // Handle the case when the response is not a list means we dont have sql statements
        this.assistantReply = response.reply;
        this.chatMessages.push({ type: 'text', content: response.reply, role: 'assistant' });
        this.chatHistory.push({ role: 'assistant', content: this.assistantReply });
        console.log("These are the stored messages of not list: ", this.chatMessages);
        this.userMessage = '';
      }
    });



    // this.openAiApiServiceService.sendMessage(conversation)
    //   .subscribe((response: any) => {
    //     this.assistantReplytb = response.reply[0];
    //     this.assistantReplysql = response.reply[1];
    //     this.chatMessages.push({ role: 'assistant', content: this.assistantReplysql });
    //     console.log("These are the stored messages: ",this.chatMessages);
    //     this.userMessage = '';
    //   });
  }
}
