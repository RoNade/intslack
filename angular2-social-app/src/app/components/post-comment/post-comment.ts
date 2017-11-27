import { PictureCommentContent, VideoCommentContent, YoutubeCommentContent, Comment } from 'models';
import { Component, Input } from '@angular/core';
import { MessageParser } from 'services';

/**
 * Display a post comment
 */
@Component({
    templateUrl: 'post-comment.html',
    selector: 'post-comment'
})
export class PostCommentComponent{
    @Input() comment: Comment;

    pictureCommentContents: PictureCommentContent[];
    youtubeCommentContents: YoutubeCommentContent[];
    videoCommentContents: VideoCommentContent[];

    constructor(
        private parser: MessageParser
    ) {}

    ngOnInit() {
        this.comment.content = this.parser.parse(this.comment);

        if(this.comment.content) {
            this.pictureCommentContents = this.comment.content
                .filter(commentContent => commentContent.type === 'picture');
            // console.log('PICTURECOMMENT', this.pictureCommentContents);

            this.youtubeCommentContents = this.comment.content
                .filter(commentContent => commentContent.type === 'youtube');
            // console.log('YOUTUBECOMMENT', this.youtubeCommentContents);

            this.videoCommentContents = this.comment.content
                .filter(commentContent => commentContent.type === 'video');
            console.log('VIDEOCOMMENT', this.videoCommentContents);
        }
    }
}