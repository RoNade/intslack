import { PostSocketService, NotificationService} from 'services';
import { Component, OnInit } from '@angular/core';
import { Notification } from 'models';

@Component({
    selector: 'notification-bar',
    templateUrl: 'notification-bar.html'
})
export class NotificationBarComponent implements OnInit {
    notifications: Notification[];

    constructor(
        private postSocket: PostSocketService,
        private notification: NotificationService
    ) {}

    ngOnInit() {
        this.notifications = this.notification.getAll();

        this.postSocket.onUserConnect(user => {
            const message = `${user.username} is online`;
            this.__addNotification(message);
        });

        this.postSocket.onNewChannel(channel => {
            const message = `a new channel named ${channel.name} has been created`;
            this.__addNotification(message)
        });

        this.postSocket.onPost(post => {
            const {username} = post.user;
            const message = `${username} just made a new post`;
            this.__addNotification(message);
        });

        this.postSocket.onComment(comment => {
            const {username} = comment.user;
            const message = `${username} just made a new comment`;
            this.__addNotification(message);
        });

        this.postSocket.onLike(like => {
            const {username} = like.user;
            const message = `${username} just liked a post`;
            this.__addNotification(message);
        });
    }

    __addNotification(message: string): void{
        const creationTime = Date.now();
        this.notifications = this.notification.add({message, creationTime});
    }
}
