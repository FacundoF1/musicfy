import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Issue } from "../models/issue";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";

@Injectable()
export class DataService {
  private readonly API_URL = "http://localhost:3000/albums";
  private readonly artistId = "art-xD5s23lPseQW=";

  dataChange: BehaviorSubject<Issue[]> = new BehaviorSubject<Issue[]>([]);
  // Temporarily stores data from dialogs
  dialogData: any;
  messageError: string;

  constructor(private httpClient: HttpClient) {}

  get data(): Issue[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

  /** CRUD METHODS */
  getAllIssues(): void {
    this.messageError = undefined;
    this.httpClient
      .get<Issue[]>(this.API_URL, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .subscribe(
        (data) => {
          this.dataChange.next(data);
        },
        (error: HttpErrorResponse) => {
          console.log(error.name + " " + error.message);
          this.messageError = error.message;
        }
      );
  }

  // DEMO ONLY, you can find working methods below
  addIssue(issue: Issue): void {
    const data = { ...issue, artistId: this.artistId };
    this.httpClient
      .post(this.API_URL, data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .subscribe(
        async () => {
          return await this.getAllIssues();
        },
        (error: HttpErrorResponse) => {
          this.messageError = error.error.message;
        }
      );
  }

  updateIssue(issue: Issue): void {
    this.httpClient
      .put<void>(this.API_URL, issue, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .subscribe(
        async () => {
          return await this.getAllIssues();
        },
        (error: HttpErrorResponse) => {
          this.messageError = error.error.message;
        }
      );
  }

  deleteIssue(_id: string): void {
    this.httpClient
      .delete<void>(`${this.API_URL}/${_id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .subscribe(
        async () => {
          return await this.getAllIssues();
        },
        (error: HttpErrorResponse) => {
          this.messageError = error.error.message;
        }
      );
  }
}
