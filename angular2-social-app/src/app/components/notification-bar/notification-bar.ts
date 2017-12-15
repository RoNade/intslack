import { PostSocketService, NotificationService} from 'services';
import { NotificationsService } from 'angular2-notifications';
import { Component, OnInit} from '@angular/core';
import {LocationStrategy} from '@angular/common';
import { Notification } from 'models';

@Component({
    selector: 'notification-bar',
    templateUrl: 'notification-bar.html'
})
export class NotificationBarComponent implements OnInit {
    notifications: Notification[];

    options = {
        position: ['bottom', 'right'],
        clickToClose: true,
        timeOut: 5000,
        maxStack: 5
    };

    constructor(
        private url: LocationStrategy,
        private postSocket: PostSocketService,
        private notification: NotificationService,
        private chromeNotifications: NotificationsService
    ) {}

    ngOnInit() {
        this.notifications = this.notification.getAll().reverse();

        this.postSocket.onUserConnect(user => {
            // console.log("Activity", user);
            const message = `${user.username} is online`;
            this.chromeNotifications.info('connection', message);
            this.__addNotification(message);
        });

        this.postSocket.onNewChannel(channel => {
            // console.log("Activity", channel);
            const message = `a new channel named ${channel.name} has been created`;
            this.chromeNotifications.info('new channel', message);
            this.__addNotification(message)
        });

        this.postSocket.onPost(post => {
            // console.log("Activity", post);
            const {username} = post.user;
            const message = `${username} just made a new post`;
            this.chromeNotifications.info('new post', message);
            const link = `<a href="${this.url.path()}#${post.id}" >post</a>`;
            const messageWithLink = message.replace('post', link);
            this.__addNotification(messageWithLink);
        });

        this.postSocket.onComment(comment => {
            // console.log("Activity", comment);
            const {username} = comment.user;
            const message = `${username} just made a new comment`;
            this.chromeNotifications.info('new comment', message);
            const link = `<a href="${this.url.path()}#${comment.id}">comment</a>`;
            const messageWithLink = message.replace('comment', link);
            this.__addNotification(messageWithLink);
        });

        this.postSocket.onLike(like => {
            // console.log("Activity", like);
            const {username} = like.user;
            const message = `${username} just liked a post`;
            this.chromeNotifications.info('new like', message);
            const link = `<a href="${this.url.path()}#${like.post.id}">post</a>`;
            const messageWithLink = message.replace('post', link);
            this.__addNotification(messageWithLink);
        });
    }

    clean(): void{
        this.notification.clean();
        this.notifications = [];
    }

    __addNotification(message: string): void{
        const creationTime = Date.now();
        this.notifications = this.notification.add({message, creationTime}).reverse();
    }
}
