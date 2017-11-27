import { Component, Input } from '@angular/core';
import { CommentContent, VideoCommentContent } from 'models';

@Component({
    templateUrl: 'video-comment-content.html',
    selector: 'video-comment-content'
})
export class VideoCommentContentComponent {
    @Input() commentContent: VideoCommentContent;

    ngOnInit(){}
}