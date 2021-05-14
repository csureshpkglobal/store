import { Component, OnInit } from '@angular/core';
import { Collection } from '../collection.model';
import { MycollectionService } from '../mycollection.service';

@Component({
  selector: 'app-mycollection',
  templateUrl: './mycollection.component.html',
  styleUrls: ['./mycollection.component.css'],
})
export class MycollectionComponent implements OnInit {
  collections: Collection[] = [];

  constructor(private mycollectionService: MycollectionService) {}
  ngOnInit(): void {
    this.collections = this.mycollectionService.getCollections();
  }
}
