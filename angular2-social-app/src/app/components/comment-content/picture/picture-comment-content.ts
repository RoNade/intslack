import { Component, Input, Pipe } from '@angular/core';
import { CommentContent, PictureCommentContent } from 'models';

@Component({
    templateUrl: 'picture-comment-content.html',
    selector: 'picture-comment-content'
})
export class PictureCommentContentComponent {
    @Input() commentContent: PictureCommentContent;

    ngOnInit(){}
}