import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { DataService } from "./services/data.service";
import { HttpClient } from "@angular/common/http";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { Issue } from "./models/issue";
import { DataSource } from "@angular/cdk/collections";
import { AddDialogComponent } from "./dialogs/add/add.dialog.component";
import { EditDialogComponent } from "./dialogs/edit/edit.dialog.component";
import { DeleteDialogComponent } from "./dialogs/delete/delete.dialog.component";
import { BehaviorSubject, fromEvent, merge, Observable } from "rxjs";
import { map } from "rxjs/operators";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  displayedColumns = ["name", "year", "url", "actions"];
  exampleDatabase: DataService | null;
  dataSource: ExampleDataSource | null;
  index: number;
  _id: string;
  messageError: string;

  constructor(
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public dataService: DataService
  ) {}

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild("filter", { static: true }) filter: ElementRef;

  ngOnInit() {
    this.loadData();
  }

  refresh() {
    this.loadData();
  }

  addNew() {
    const dialogRef = this.dialog.open(AddDialogComponent, {
      data: { issue: Issue },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.exampleDatabase.getAllIssues();
      this.messageError = this.dataService.messageError;
    });
  }

  startEdit(i: number, _id: string, name: string, year: number, url: string) {
    this._id = _id;
    // index row is used just for debugging proposes and can be removed
    this.index = i;
    const dialogRef = this.dialog.open(EditDialogComponent, {
      data: {
        _id: _id,
        year: year,
        name: name,
        url: url,
      },
    });

    dialogRef.afterClosed().subscribe(() => {
      this.exampleDatabase.getAllIssues();
      this.messageError = this.dataService.messageError;
    });
  }

  deleteItem(i: number, _id: string, year: string, name: string, url: string) {
    this.index = i;
    this._id = _id;
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: { _id, year, name, url: url },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.exampleDatabase.getAllIssues();
      this.messageError = this.dataService.messageError;
    });
  }

  private refreshTable() {
    // Refreshing table using paginator
    // Thanks yeager-j for tips
    // https://github.com/marinantonio/angular-mat-table-crud/issues/12
    this.paginator._changePageSize(this.paginator.pageSize);
  }

  /*   // If you don't need a filter or a pagination this can be simplified, you just use code from else block
    // OLD METHOD:
    // if there's a paginator active we're using it for refresh
    if (this.dataSource._paginator.hasNextPage()) {
      this.dataSource._paginator.nextPage();
      this.dataSource._paginator.previousPage();
      // in case we're on last page this if will tick
    } else if (this.dataSource._paginator.hasPreviousPage()) {
      this.dataSource._paginator.previousPage();
      this.dataSource._paginator.nextPage();
      // in all other cases including active filter we do it like this
    } else {
      this.dataSource.filter = '';
      this.dataSource.filter = this.filter.nativeElement.value;
    }*/

  public loadData() {
    this.exampleDatabase = new DataService(this.httpClient);
    this.dataSource = new ExampleDataSource(
      this.exampleDatabase,
      this.paginator,
      this.sort
    );
    fromEvent(this.filter.nativeElement, "keyup")
      // .debounceTime(150)
      // .distinctUntilChanged()
      .subscribe(() => {
        if (!this.dataSource) {
          return;
        }
        this.dataSource.filter = this.filter.nativeElement.value;
      });
  }
}

export class ExampleDataSource extends DataSource<Issue> {
  _filterChange = new BehaviorSubject("");

  get filter(): string {
    return this._filterChange.value;
  }

  set filter(filter: string) {
    this._filterChange.next(filter);
  }

  filteredData: Issue[] = [];
  renderedData: Issue[] = [];

  constructor(
    public _exampleDatabase: DataService,
    public _paginator: MatPaginator,
    public _sort: MatSort
  ) {
    super();
    // Reset to the first page when the user changes the filter.
    this._filterChange.subscribe(() => (this._paginator.pageIndex = 0));
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<Issue[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this._exampleDatabase.dataChange,
      this._sort.sortChange,
      this._filterChange,
      this._paginator.page,
    ];

    this._exampleDatabase.getAllIssues();

    return merge(...displayDataChanges).pipe(
      map(() => {
        // Filter data
        this.filteredData = this._exampleDatabase.data
          .slice()
          .filter((issue: Issue) => {
            const searchStr = (
              issue.name +
              issue.year +
              issue.url
            ).toLowerCase();
            return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
          });

        // Sort filtered data
        const sortedData = this.sortData(this.filteredData.slice());

        // Grab the page's slice of the filtered sorted data.
        const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
        this.renderedData = sortedData.splice(
          startIndex,
          this._paginator.pageSize
        );
        return this.renderedData;
      })
    );
  }

  disconnect() {}

  /** Returns a sorted copy of the database data. */
  sortData(data: Issue[]): Issue[] {
    if (!this._sort.active || this._sort.direction === "") {
      return data;
    }

    return data.sort((a, b) => {
      let propertyA: number | string = "";
      let propertyB: number | string = "";

      switch (this._sort.active) {
        case "id":
          [propertyA, propertyB] = [a._id, b._id];
          break;
        case "name":
          [propertyA, propertyB] = [a.name, b.name];
          break;
        case "year":
          [propertyA, propertyB] = [a.year, b.year];
          break;
        case "url":
          [propertyA, propertyB] = [a.url, b.url];
          break;
      }

      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (
        (valueA < valueB ? -1 : 1) * (this._sort.direction === "asc" ? 1 : -1)
      );
    });
  }
}
